import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  Baby,
  Syringe,
  Wind,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

const KEYS = ["newborn", "vaccine", "allergy", "growth", "parenting", "sick"] as const;

const ICONS: Record<(typeof KEYS)[number], React.ComponentType<{ className?: string }>> = {
  newborn: Baby,
  vaccine: Syringe,
  allergy: Wind,
  growth: Sparkles,
  parenting: HeartHandshake,
  sick: Stethoscope,
};

const TONES: Record<(typeof KEYS)[number], { bg: string; ring: string; iconColor: string }> = {
  newborn:   { bg: "bg-[var(--color-peach-100)]", ring: "ring-[var(--color-peach-200)]", iconColor: "text-[var(--color-peach-400)]" },
  vaccine:   { bg: "bg-[var(--color-sky-100)]",   ring: "ring-[var(--color-sky-200)]",   iconColor: "text-[var(--color-sky-500)]" },
  allergy:   { bg: "bg-[var(--color-mint-100)]",  ring: "ring-[var(--color-mint-200)]",  iconColor: "text-[var(--color-mint-400)]" },
  growth:    { bg: "bg-[var(--color-sky-100)]",   ring: "ring-[var(--color-sky-200)]",   iconColor: "text-[var(--color-sky-500)]" },
  parenting: { bg: "bg-[var(--color-peach-100)]", ring: "ring-[var(--color-peach-200)]", iconColor: "text-[var(--color-peach-400)]" },
  sick:      { bg: "bg-[var(--color-mint-100)]",  ring: "ring-[var(--color-mint-200)]",  iconColor: "text-[var(--color-mint-400)]" },
};

export function Services() {
  const t = useTranslations("services");

  return (
    <Section spacing="lg" className="relative">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Hizmetler</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[var(--color-ink-700)] text-lg text-pretty">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((key, idx) => {
            const Icon = ICONS[key];
            const tone = TONES[key];
            return (
              <Reveal key={key} delay={idx * 0.06}>
                <Link
                  href="/hizmetler"
                  className="group relative flex flex-col h-full rounded-3xl bg-white p-7 border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all duration-300 hover:-translate-y-1"
                >
                  <span
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${tone.bg} ring-1 ${tone.ring}`}
                  >
                    <Icon className={`size-7 ${tone.iconColor}`} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-[var(--color-ink-700)] text-pretty">
                    {t(`items.${key}.description`)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Detay
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
