import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CTABanner } from "@/components/sections/CTABanner";
import { FunctionalMedicineReferencePage } from "@/components/sections/functional-medicine/FunctionalMedicineReferencePage";
import { getFunctionalMedicineReferenceContent } from "@/content/functional-medicine-reference";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = getFunctionalMedicineReferenceContent(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
  };
}

export default async function FonksiyonelTipPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tab } = await searchParams;
  setRequestLocale(locale);
  const content = getFunctionalMedicineReferenceContent(locale);

  return (
    <>
      <FunctionalMedicineReferencePage content={content} initialSectionId={tab} />
      <CTABanner />
    </>
  );
}
