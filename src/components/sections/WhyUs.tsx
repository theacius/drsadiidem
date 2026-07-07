"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { LVPE_KIND } from "@/live-visual-editor/lvpe-kinds";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Smile,
  ShieldCheck,
  Sparkles as SparkleIcon,
  Stethoscope,
  HeartHandshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
  experienceYears?: number;
  counterDurationMs?: number;
};

type Tone = {
  shell: string;
  iconRing: string;
  iconBg: string;
  iconClass: string;
  decorative: string;
};

const TONES: Tone[] = [
  {
    shell:
      "from-[var(--color-sky-50)] via-white to-[var(--color-sky-100)]/70 border-sky-200/35",
    iconRing: "ring-sky-200/60",
    iconBg: "bg-white",
    iconClass: "text-[var(--color-sky-600)]",
    decorative: "bg-sky-300/20",
  },
  {
    shell:
      "from-[var(--color-peach-50)] via-white to-[var(--color-peach-100)]/75 border-[var(--color-peach-200)]/45",
    iconRing: "ring-[var(--color-peach-200)]/55",
    iconBg: "bg-white",
    iconClass: "text-[var(--color-peach-400)]",
    decorative: "bg-[var(--color-peach-300)]/25",
  },
  {
    shell:
      "from-[var(--color-mint-50)] via-white to-[var(--color-mint-100)]/65 border-[var(--color-mint-200)]/45",
    iconRing: "ring-[var(--color-mint-200)]/55",
    iconBg: "bg-white",
    iconClass: "text-[var(--color-mint-500)]",
    decorative: "bg-[var(--color-mint-300)]/22",
  },
  {
    shell:
      "from-[var(--color-cream-50)] via-[var(--color-mint-50)]/60 to-[var(--color-sky-50)]/80 border-[var(--color-ink-100)]/50",
    iconRing: "ring-[var(--color-mint-200)]/40",
    iconBg: "bg-white",
    iconClass: "text-[var(--color-mint-600)]",
    decorative: "bg-[var(--color-sky-200)]/25",
  },
];

export function WhyUs({ experienceYears = 25, counterDurationMs }: Props) {
  const t = useTranslations("whyUs");
  const reduceMotion = useReducedMotion();
  const locale = useLocale();
  const duration = counterDurationMs ?? 1400;
  const loc = locale === "tr" ? "tr-TR" : "en-US";

  const cards: Array<{
    key: "professional" | "friendly" | "trusted" | "clean";
    icon: LucideIcon;
    tone: Tone;
    stats?: boolean;
  }> = [
    { key: "professional", icon: Stethoscope, tone: TONES[0]!, stats: true },
    { key: "friendly", icon: Smile, tone: TONES[1]! },
    { key: "trusted", icon: ShieldCheck, tone: TONES[2]! },
    { key: "clean", icon: HeartHandshake, tone: TONES[3]! },
  ];

  return (
    <Section spacing="lg" className="bg-white relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-cream-50)] to-transparent"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance text-[var(--color-ink-900)]">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ key, icon: Icon, tone, stats }, i) => (
            <Reveal key={key} delay={0.05 * i}>
              <motion.article
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className={cn(
                  "group relative flex h-full min-h-[248px] flex-col rounded-[26px] border bg-gradient-to-br p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-soft-lg)] overflow-hidden",
                  tone.shell,
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl opacity-90 transition-opacity group-hover:opacity-100",
                    tone.decorative,
                  )}
                />

                <span
                  className={cn(
                    "relative inline-flex size-12 items-center justify-center rounded-2xl shadow-[var(--shadow-soft)] ring-2 ring-offset-2 ring-offset-transparent",
                    tone.iconBg,
                    tone.iconRing,
                  )}
                >
                  <Icon className={cn("size-6", tone.iconClass)} />
                </span>

                <h3 className="relative mt-5 font-display text-lg font-semibold leading-snug text-[var(--color-ink-900)]">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="relative mt-2 flex-1 text-sm text-[var(--color-ink-700)] leading-relaxed text-pretty">
                  {t(`items.${key}.description`)}
                </p>

                {stats ? (
                  <div className="relative mt-6 flex flex-wrap items-end gap-x-8 gap-y-3 border-t border-[var(--color-ink-100)]/60 pt-5">
                    <div>
                      <div className="font-display text-2xl font-semibold tabular-nums text-[var(--color-sky-600)]">
                        <span
                          data-editable-id="whyUs.counter.years"
                          data-type="stat"
                          data-lvpe-kind={LVPE_KIND.WHYUS_COUNTER_YEARS}
                          data-lvpe-stat-to={String(experienceYears)}
                          data-lvpe-stat-suffix="+"
                          data-lvpe-stat-duration={String(duration)}
                          className="inline-block align-baseline"
                        >
                          <Counter
                            to={experienceYears}
                            suffix="+"
                            duration={duration}
                            format={(n) => n.toLocaleString(loc)}
                          />
                        </span>
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">{t("stats.yearsLabel")}</div>
                    </div>
                    <div className="hidden sm:block h-9 w-px shrink-0 bg-[var(--color-ink-100)]/70 self-end mb-0.5" />
                    <div>
                      <div className="font-display text-2xl font-semibold tabular-nums text-[var(--color-sky-600)]">
                        <span
                          data-editable-id="whyUs.counter.patients"
                          data-type="stat"
                          data-lvpe-kind={LVPE_KIND.WHYUS_COUNTER_PATIENTS}
                          data-lvpe-stat-to="10"
                          data-lvpe-stat-suffix="K+"
                          data-lvpe-stat-duration={String(duration)}
                          className="inline-block align-baseline"
                        >
                          <Counter
                            to={10}
                            suffix="K+"
                            duration={duration}
                            format={(n) => n.toLocaleString(loc)}
                          />
                        </span>
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">{t("stats.patientsLabel")}</div>
                    </div>
                  </div>
                ) : key === "clean" ? (
                  <div className="relative mt-5 flex items-center gap-2 text-xs text-[var(--color-ink-600)]">
                    <BadgeCheck className="size-4 shrink-0 text-[var(--color-mint-500)]" />
                    <span>{t("items.clean.badge")}</span>
                    <SparkleIcon className="size-3.5 ml-auto text-[var(--color-peach-400)] opacity-80" />
                  </div>
                ) : null}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
