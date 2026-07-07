"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { ServiceCardData } from "@/lib/services-catalog";
import { cn } from "@/lib/utils";

export function ServicesCarousel({ services }: { services: ServiceCardData[] }) {
  const t = useTranslations("home.carousel");
  const [idx, setIdx] = useState(0);

  if (services.length === 0) return null;

  const current = services[idx]!;

  const goPrev = () => setIdx((i) => (i - 1 + services.length) % services.length);
  const goNext = () => setIdx((i) => (i + 1) % services.length);

  return (
    <Section className="bg-[var(--color-cream-50)] overflow-hidden">
      <Container>
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-ink-900)]">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)] max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="relative rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-ink-100)] bg-white shadow-[var(--shadow-soft-lg)]">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[300px] bg-[var(--color-cream-200)]">
              <Image
                key={current.imageUrl}
                src={current.imageUrl}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={idx === 0}
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-sky-600)]">
                {t("eyebrow")}
              </p>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[var(--color-ink-900)]">
                {current.title}
              </h3>
              <p className="mt-3 text-[var(--color-muted)] text-sm leading-relaxed">
                {current.description}
              </p>
              <Link
                href={current.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all"
              >
                {t("explore")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          {services.length > 1 ? (
            <>
              <button
                type="button"
                aria-label={t("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white"
                onClick={goPrev}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label={t("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white"
                onClick={goNext}
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex max-w-[90%] flex-wrap items-center justify-center gap-1.5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                {services.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    aria-label={`${i + 1} / ${services.length}`}
                    aria-current={i === idx ? "true" : undefined}
                    className={cn(
                      "size-2 rounded-full transition-all shrink-0",
                      i === idx
                        ? "w-6 bg-[var(--color-primary)]"
                        : "bg-[var(--color-ink-200)] hover:bg-[var(--color-sky-300)]",
                    )}
                    onClick={() => setIdx(i)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <p className="mt-4 text-center">
          <Link
            href="/hizmet-alanlarimiz"
            className="text-sm font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
          >
            {t("viewAll")}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
