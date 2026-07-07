import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { CTABanner } from "@/components/sections/CTABanner";

type Props = { params: Promise<{ locale: string }> };

export default async function HizmetAlanlarimizPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.services");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("subtitle")}
      />
      <ServicesGrid locale={locale} showViewAll={false} variant="icon" />
      <CTABanner />
    </>
  );
}
