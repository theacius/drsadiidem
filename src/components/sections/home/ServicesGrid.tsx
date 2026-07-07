import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import { getPublishedServiceCards } from "@/lib/services-catalog";
import { resolveServiceIcon } from "@/components/sections/home/service-icons";

type Props = {
  locale: string;
  showViewAll?: boolean;
  /** Hizmet alanları sayfası — referans 2×2 ikon kartları */
  variant?: "image" | "icon";
};

export async function ServicesGrid({
  locale,
  showViewAll = true,
  variant = "image",
}: Props) {
  const t = await getTranslations("home.services");
  const services = await getPublishedServiceCards(locale);
  const isIcon = variant === "icon";

  return (
    <Section
      id="hizmetler"
      className={isIcon ? "bg-[var(--color-cream-100)] pt-0" : "bg-white"}
    >
      <Container>
        {!isIcon ? (
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--color-ink-900)]">
                {t("title")}
              </h2>
              <p className="mt-4 text-[var(--color-ink-700)] text-pretty">{t("subtitle")}</p>
            </div>
          </Reveal>
        ) : null}

        <div
          className={`grid gap-4 sm:gap-5 ${
            isIcon ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {services.map((svc, i) => {
            const Icon = resolveServiceIcon(svc.icon);
            return (
              <Reveal key={svc.slug} delay={0.04 * (i % 6)}>
                <Link
                  href={svc.href}
                  className="group service-card-tap tap-press flex flex-col h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-ink-100)] bg-white shadow-[var(--shadow-soft)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-soft-lg)] transition-all duration-300"
                >
                  {isIcon ? (
                    <div className="flex flex-col flex-1 p-5 sm:p-7">
                      <span className="service-card-icon inline-flex size-12 items-center justify-center rounded-xl bg-[var(--color-mint-100)] text-[var(--color-primary)] transition-transform duration-200">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--color-ink-900)]">
                        {svc.title}
                      </h3>
                      <p className="mt-3 text-sm text-[var(--color-muted)] flex-1 leading-relaxed">
                        {svc.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                        {t("detail")}
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="relative aspect-[16/10] bg-[var(--color-cream-200)] overflow-hidden">
                        <Image
                          src={svc.imageUrl}
                          alt={svc.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          unoptimized={
                            svc.imageUrl.startsWith("/uploads/") ||
                            svc.imageUrl.startsWith("http")
                          }
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5 sm:p-6">
                        <h3 className="font-display text-lg font-semibold text-[var(--color-ink-900)] line-clamp-2">
                          {svc.title}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--color-muted)] flex-1 leading-relaxed line-clamp-3">
                          {svc.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                          {t("detail")}
                          <ArrowRight className="size-4" aria-hidden />
                        </span>
                      </div>
                    </>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>

        {showViewAll ? (
          <Reveal delay={0.15}>
            <div className="mt-10 text-center">
              <Link
                href="/hizmet-alanlarimiz"
                className="tap-press inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-mint-100)] transition-colors"
              >
                {t("viewAll")}
              </Link>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
