import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { CTABanner } from "@/components/sections/CTABanner";
import { Image as ImageIcon, Video, ArrowRight } from "lucide-react";
import { loadGalleryHubPage, parseGalleryHubExtra } from "@/lib/site-gallery";

type Props = { params: Promise<{ locale: string }> };

export default async function GaleriPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await loadGalleryHubPage();
  const preferEn = locale !== "tr";
  const eyebrow = preferEn ? page.eyebrowEn?.trim() || page.eyebrowTr : page.eyebrowTr;
  const title = preferEn ? page.titleEn?.trim() || page.titleTr : page.titleTr;
  const description = preferEn
    ? page.descriptionEn?.trim() || page.descriptionTr
    : page.descriptionTr;

  const { cards } = parseGalleryHubExtra(page.extra);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card, i) => {
              const cTitle = preferEn ? card.titleEn?.trim() || card.titleTr : card.titleTr;
              const cDesc = preferEn ? card.descEn?.trim() || card.descTr : card.descTr;
              const grad =
                card.tone === "peach"
                  ? "from-[var(--color-peach-100)] to-[var(--color-peach-200)]"
                  : "from-[var(--color-sky-100)] to-[var(--color-sky-200)]";
              const Icon = card.tone === "peach" ? Video : ImageIcon;
              const iconColor =
                card.tone === "peach"
                  ? "text-[var(--color-peach-400)]"
                  : "text-[var(--color-sky-500)]";

              return (
                <Reveal key={card.href} delay={i * 0.08}>
                  <Link
                    href={card.href as Parameters<typeof Link>[0]["href"]}
                    className={`group block rounded-3xl overflow-hidden bg-gradient-to-br ${grad} aspect-[4/3] relative border border-[var(--color-ink-100)] hover:shadow-[var(--shadow-soft-lg)] transition-all`}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <Icon className={`size-16 mb-4 ${iconColor}`} strokeWidth={1.4} />
                      <h2 className="font-display text-2xl sm:text-3xl font-semibold">{cTitle}</h2>
                      <p className="mt-2 text-[var(--color-ink-700)] max-w-sm">{cDesc}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2.5 transition-all">
                        {preferEn ? "Open" : "İncele"}
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
