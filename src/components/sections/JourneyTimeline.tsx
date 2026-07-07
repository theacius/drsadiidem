"use client";

import { useTranslations } from "next-intl";

import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Timeline } from "@/components/ui/Timeline";

type RawEntry = { title: string; body: string };

export function JourneyTimeline() {
  const t = useTranslations("journeyTimeline");
  const raw = t.raw("entries");
  const entries = Array.isArray(raw) ? (raw as RawEntry[]) : [];

  if (entries.length === 0) return null;

  const data = entries.map((e) => ({
    title: e.title,
    content: <p className="text-pretty">{e.body}</p>,
  }));

  return (
    <Section
      spacing="lg"
      className="relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-cream-50)] to-transparent"
      />
      <Container className="relative">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-[var(--color-ink-900)] sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--color-ink-700)]">
          {t("subtitle")}
        </p>
        <div className="mt-14 md:mt-20">
          <Timeline data={data} />
        </div>
      </Container>
    </Section>
  );
}
