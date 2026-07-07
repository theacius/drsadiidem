import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_SERVICES } from "@/content/site-services";
import { resolveServiceIcon } from "@/components/sections/home/service-icons";
import { ArrowUpRight } from "lucide-react";
import { siteServiceBySlug } from "@/content/site-services";

type Props = {
  locale: string;
  currentSlug: string;
};

export async function ServiceRelatedCards({ locale, currentSlug }: Props) {
  const t = await getTranslations("home.services");
  const others = SITE_SERVICES.filter((s) => s.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <Section className="bg-[var(--color-cream-50)] border-t border-[var(--color-ink-100)]">
      <Container className="max-w-5xl">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-ink-900)]">
            {locale === "tr" ? "Diğer Hizmet Alanları" : "Other services"}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((svc, idx) => {
            const def = siteServiceBySlug(svc.slug)!;
            const Icon = resolveServiceIcon(def.icon);
            const title = locale === "tr" ? def.titleTr : def.titleEn;
            const desc = locale === "tr" ? def.descriptionTr : def.descriptionEn;
            return (
              <Reveal key={svc.slug} delay={idx * 0.05}>
                <Link
                  href={`/hizmet-alanlarimiz/${svc.slug}`}
                  className="group tap-press flex flex-col h-full rounded-2xl bg-white p-5 border border-[var(--color-ink-100)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-soft-lg)] transition-all"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-mint-100)] text-[var(--color-primary)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold leading-snug text-[var(--color-ink-900)] group-hover:text-[var(--color-primary)] transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-2 flex-1">
                    {desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">
                    {t("detail")}
                    <ArrowUpRight className="size-3.5" />
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
