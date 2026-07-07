import { getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HomeFaqAccordion } from "@/components/sections/home/HomeFaqAccordion";

export async function HomeFaq() {
  const t = await getTranslations("home.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <Section id="sss" className="bg-[#eef2f7]">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink-900)]">
              {t("title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">{t("subtitle")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <HomeFaqAccordion items={items} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            {t("disclaimer")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
