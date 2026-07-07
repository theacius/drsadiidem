import { setRequestLocale } from "next-intl/server";
import { findHomeBuilder } from "@/lib/builder-prisma";
import { BuilderRendered } from "@/components/visual-builder/BuilderRendered";
import { FusionHomeHero } from "@/components/sections/home/FusionHomeHero";
import { IntroHero } from "@/components/sections/home/IntroHero";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { DoctorNote } from "@/components/sections/home/DoctorNote";
import { DoctorApproach } from "@/components/sections/home/DoctorApproach";
import { ClinicPreview } from "@/components/sections/home/ClinicPreview";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { HealthCorner } from "@/components/sections/home/HealthCorner";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const builder = await findHomeBuilder(locale);

  if (builder?.published && builder.htmlBody.trim()) {
    return <BuilderRendered html={builder.htmlBody} css={builder.cssBody} />;
  }

  return (
    <>
      <FusionHomeHero locale={locale} />
      <IntroHero locale={locale} />
      <ServicesGrid locale={locale} />
      <DoctorNote locale={locale} />
      <DoctorApproach locale={locale} />
      <ClinicPreview />
      <SectionDivider fill="#eef2f7" />
      <HomeFaq />
      <HealthCorner locale={locale} />
    </>
  );
}
