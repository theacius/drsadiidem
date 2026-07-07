import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { Link } from "@/i18n/navigation";
import {
  Baby,
  CalendarCheck,
  Shield,
  Sparkles,
  HeartHandshake,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const FEATURE_ICONS: LucideIcon[] = [Baby, CalendarCheck, Shield, Sparkles, HeartHandshake, Stethoscope];

export default async function SaglikliCocukIzlenimiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("childMonitoring");
  const features = t.raw("features") as Array<{ title: string; body: string }>;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("lead")} />

      <Section>
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? Baby;
              return (
                <Reveal key={f.title} delay={0.04 * i}>
                  <div className="rounded-2xl border border-[var(--color-ink-100)] bg-white p-6 shadow-[var(--shadow-soft)] h-full">
                    <Icon className="size-6 text-[var(--color-primary)] mb-3" aria-hidden />
                    <h2 className="font-display text-lg font-semibold">{f.title}</h2>
                    <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-cream-100)]">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">{t("ctaTitle")}</h2>
            <p className="mt-4 text-[var(--color-ink-700)]">{t("ctaBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/iletisim"
                className="inline-flex rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white"
              >
                {t("ctaAppointment")}
              </Link>
              <Link
                href="/hizmet-alanlarimiz/saglikli-cocuk-muayenesi-ve-izlemi"
                className="inline-flex rounded-full border border-[var(--color-ink-200)] bg-white px-6 py-3 text-sm font-semibold"
              >
                {t("ctaService")}
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
