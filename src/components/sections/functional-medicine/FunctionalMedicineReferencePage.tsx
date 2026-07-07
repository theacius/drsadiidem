import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import type { FunctionalMedicinePageContent } from "@/content/functional-medicine-reference";
import { FunctionalMedicineTabs } from "@/components/sections/functional-medicine/FunctionalMedicineTabs";

type Props = {
  content: FunctionalMedicinePageContent;
  initialSectionId?: string;
};

export function FunctionalMedicineReferencePage({ content, initialSectionId }: Props) {
  return (
    <article className="bg-white">
      <section className="border-b border-[var(--color-ink-100)] bg-[var(--color-cream-50)]">
        <Container className="py-10 sm:py-12 max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[2rem] sm:text-[2.35rem] font-bold leading-[1.15] text-[var(--color-ink-900)]">
            {content.title}
          </h1>
          <p className="mt-4 text-[15px] sm:text-base leading-[1.75] text-[var(--color-ink-700)] max-w-3xl">
            {content.lead}
          </p>
        </Container>
      </section>

      <Container className="py-10 sm:py-14 lg:py-16 max-w-5xl">
        <Suspense fallback={<div className="fm-tabs-layout min-h-[24rem] animate-pulse rounded-lg bg-[var(--color-cream-50)]" />}>
          <FunctionalMedicineTabs
            sections={content.sections}
            initialSectionId={initialSectionId}
          />
        </Suspense>
      </Container>
    </article>
  );
}
