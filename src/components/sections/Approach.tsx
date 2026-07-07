import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Quote } from "lucide-react";

export function Approach() {
  const t = useTranslations("approach");

  return (
    <Section spacing="lg">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <Reveal from="left">
              <div className="relative aspect-[4/5] max-w-md rounded-[28px] overflow-hidden bg-gradient-to-br from-[var(--color-sky-100)] to-[var(--color-mint-100)]">
                <svg viewBox="0 0 320 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="docCoat" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#eff8fd" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="160" cy="380" rx="120" ry="14" fill="#000" opacity="0.06" />
                  <rect x="80" y="220" width="160" height="180" rx="20" fill="url(#docCoat)" />
                  <circle cx="160" cy="170" r="60" fill="#FFD1BA" />
                  <path
                    d="M100 170 Q 100 110 160 110 Q 220 110 220 170 L 220 130 Q 200 100 160 100 Q 120 100 100 130 Z"
                    fill="#3E5366"
                  />
                  <circle cx="142" cy="170" r="3" fill="#1F2D3D" />
                  <circle cx="178" cy="170" r="3" fill="#1F2D3D" />
                  <path
                    d="M148 188 Q 160 196 172 188"
                    stroke="#1F2D3D"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="160" cy="260" r="14" fill="#5BA8D6" />
                  <path
                    d="M160 274 L 160 320 L 140 340"
                    stroke="#5BA8D6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute top-4 right-4 size-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-[var(--shadow-soft)] float-slow">
                  <Quote className="size-5 text-[var(--color-primary)]" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 backdrop-blur p-4 shadow-[var(--shadow-soft)]">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-[var(--color-mint-300)] to-[var(--color-sky-300)] flex items-center justify-center text-white font-bold">
                      Ş
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-ink-900)] text-sm">
                        Dr. Şadi İdem
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">
                        Çocuk Sağlığı ve Hastalıkları Uzmanı
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg text-[var(--color-ink-700)] text-pretty max-w-xl">
                {t("body")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Link href="/hakkinda">
                  <Button variant="outline" size="lg">
                    {t("cta")}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
