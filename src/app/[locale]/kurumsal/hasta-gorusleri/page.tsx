import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { getHomeTestimonials } from "@/lib/cms-public";
import { Star, Quote } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function HastaGorusleriPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const list = await getHomeTestimonials();

  return (
    <>
      <PageHero
        eyebrow="Hasta Görüşleri"
        title="Sizin Görüşleriniz"
        description="Aileler ve çocuklarımızın bizimle paylaştığı görüşler. Geri bildirimleriniz bizim için en değerli yol göstericidir."
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {list.map((t, idx) => (
              <Reveal key={`${t.name}-${idx}`} delay={idx * 0.06}>
                <figure className="relative h-full rounded-3xl bg-white border border-[var(--color-ink-100)] p-7 shadow-[var(--shadow-soft)]">
                  <Quote className="absolute top-6 right-6 size-8 text-[var(--color-sky-100)]" />
                  <div className="flex gap-0.5 text-[var(--color-peach-400)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[var(--color-ink-800)] leading-relaxed text-pretty">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-[var(--color-ink-100)]">
                    <span className="size-10 rounded-full bg-gradient-to-br from-[var(--color-sky-300)] to-[var(--color-mint-300)] flex items-center justify-center text-white font-semibold">
                      {t.initial}
                    </span>
                    <span>
                      <span className="block font-semibold text-[var(--color-ink-900)] text-sm">
                        {t.name}
                      </span>
                      <span className="block text-xs text-[var(--color-muted)]">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 rounded-3xl bg-[var(--color-cream-100)] border border-[var(--color-cream-300)] p-7 text-center">
              <h3 className="font-display text-xl font-semibold">
                Siz de görüşünüzü paylaşmak ister misiniz?
              </h3>
              <p className="mt-2 text-[var(--color-ink-700)] max-w-xl mx-auto text-pretty">
                Yorumlarınız bizim için çok değerli. İletişim formundan veya
                WhatsApp üzerinden bizimle paylaşabilirsiniz.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
