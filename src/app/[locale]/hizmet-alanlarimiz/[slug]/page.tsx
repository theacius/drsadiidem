import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { ServiceRelatedCards } from "@/components/sections/ServiceRelatedCards";
import { ServiceDetailIcon } from "@/components/sections/ServiceDetailIcon";
import { Link } from "@/i18n/navigation";
import { getServiceBySlug } from "@/lib/services-catalog";
import { SITE_SERVICES, siteServiceBySlug } from "@/content/site-services";
import { serviceLocationHeading } from "@/content/service-page-bodies";
import {
  SERVICE_BADGE,
  SERVICE_HERO_GRADIENT,
  SERVICE_ICON_RING,
  serviceToneForSlug,
} from "@/lib/service-detail-theme";
import { sanitizePostHtml } from "@/lib/post-html";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return SITE_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const row = await getServiceBySlug(slug);
  const def = siteServiceBySlug(slug);
  const title =
    locale === "tr"
      ? row?.titleTr ?? def?.titleTr
      : row?.titleEn?.trim() || row?.titleTr || def?.titleEn;
  if (!title) return { title: "Hizmet" };
  const locationHeading = serviceLocationHeading(slug, locale);
  return {
    title: locationHeading ? `${locationHeading} | ${title}` : title,
    description:
      locale === "tr"
        ? row?.descriptionTr ?? def?.descriptionTr
        : row?.descriptionEn?.trim() || row?.descriptionTr || def?.descriptionEn,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const row = await getServiceBySlug(slug);
  const def = siteServiceBySlug(slug);
  if (!row && !def) notFound();

  const title =
    locale === "tr"
      ? row?.titleTr ?? def!.titleTr
      : row?.titleEn?.trim() || row?.titleTr || def!.titleEn;
  const description =
    locale === "tr"
      ? row?.descriptionTr ?? def!.descriptionTr
      : row?.descriptionEn?.trim() || row?.descriptionTr || def!.descriptionEn;
  const content =
    locale === "tr"
      ? row?.contentTr?.trim() || def?.contentTr?.trim()
      : row?.contentEn?.trim() || row?.contentTr?.trim() || def?.contentEn?.trim() || def?.contentTr?.trim();
  const icon = row?.icon?.trim() || def?.icon || "Stethoscope";
  const tone = serviceToneForSlug(slug);
  const locationHeading = serviceLocationHeading(slug, locale);

  return (
    <article>
      <section
        className={cn(
          "relative overflow-hidden bg-gradient-to-br",
          SERVICE_HERO_GRADIENT[tone],
        )}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[var(--color-primary)]/5 blur-3xl"
          aria-hidden
        />
        <Container className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 max-w-3xl">
          <Reveal>
            <Link
              href="/hizmet-alanlarimiz"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] transition-colors"
            >
              <ArrowLeft className="size-4" />
              {locale === "tr" ? "Tüm hizmet alanları" : "All services"}
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]",
                  SERVICE_BADGE[tone],
                )}
              >
                {locale === "tr" ? "Hizmet Alanları" : "Services"}
              </span>
              {locationHeading ? (
                <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted)]">
                  <MapPin className="size-3.5" aria-hidden />
                  Eskişehir
                </span>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 flex items-start gap-4">
              <span
                className={cn(
                  "inline-flex size-14 shrink-0 items-center justify-center rounded-2xl ring-1 shadow-[var(--shadow-soft)]",
                  SERVICE_ICON_RING[tone],
                )}
              >
                <ServiceDetailIcon icon={icon} className="size-7" />
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-balance text-[var(--color-ink-900)] pt-1">
                {title}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-lg text-[var(--color-ink-700)] leading-relaxed text-pretty max-w-2xl">
              {description}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="bg-white pb-4">
        <Container className="max-w-3xl">
          {content ? (
            <Reveal>
              <div
                className="service-prose prose-content text-[var(--color-ink-800)]"
                dangerouslySetInnerHTML={{ __html: sanitizePostHtml(content) }}
              />
            </Reveal>
          ) : null}

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap gap-3 pt-2 border-t border-[var(--color-ink-100)]">
              <Link href="/iletisim">
                <Button size="md" className="tap-press">
                  {locale === "tr" ? "Randevu Al" : "Book appointment"}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/hizmet-alanlarimiz">
                <Button variant="outline" size="md" className="tap-press">
                  {locale === "tr" ? "Tüm hizmetler" : "All services"}
                </Button>
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ServiceRelatedCards locale={locale} currentSlug={slug} />
      <CTABanner />
    </article>
  );
}
