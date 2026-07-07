import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { Accordion } from "@/components/ui/Accordion";

type Props = { params: Promise<{ locale: string }> };

export default async function SSSPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <>
      <PageHero
        eyebrow="S.S.S"
        title={t("title")}
        description={t("subtitle")}
      />

      <Section>
        <Container className="max-w-3xl">
          <Reveal>
            <Accordion items={items} />
          </Reveal>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
