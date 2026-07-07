"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/utils";
import type { ResolvedSiteContent } from "@/lib/site-content";
import { LVPE_KIND } from "@/live-visual-editor/lvpe-kinds";

/** Layout kutusu `public/hero/hero-banner.webp` (örn. 3840×1701 — `npm run hero:webp`). */
const HERO_ASPECT_W = 3840;
const HERO_ASPECT_H = 1701;

type Props = {
  content: ResolvedSiteContent["hero"];
};

function hasSecondTitleLine(content: ResolvedSiteContent["hero"]) {
  const parts = [
    content.titleLine2Prefix?.trim(),
    content.titleAccent?.trim(),
    content.titleLine2Suffix?.trim(),
  ].filter(Boolean);
  return parts.length > 0;
}

/**
 * Tam genişlik kahraman — `hero-banner.webp` kenardan kenara; oran kutusu export’a göre alan ayırır.
 */
const panelEase = [0.22, 1, 0.36, 1] as const;

export function Hero({ content }: Props) {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const showTitleLine2 = hasSecondTitleLine(content);

  const panelStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.095,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const panelItem = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
      scale: reduceMotion ? 1 : 0.98,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.58, ease: panelEase },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-white" aria-label={content.titleLine1}>
      <div className="relative w-full bg-[var(--color-cream-50)] leading-[0]">
        <motion.div
          className="relative w-full"
          style={{ aspectRatio: `${HERO_ASPECT_W} / ${HERO_ASPECT_H}` }}
          initial={reduceMotion ? false : { scale: 1.04, opacity: 0.92 }}
          animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.42, ease: panelEase }}
        >
          <Image
            fill
            src="/hero/hero-banner.webp"
            alt={content.titleLine1}
            sizes="100vw"
            priority
            quality={100}
            /** Dev: hero dosyası değişince `/_next/image` önbelleğini baypas etmek için. */
            unoptimized={process.env.NODE_ENV === "development"}
            className="object-contain object-top"
            draggable={false}
          />
        </motion.div>

        {/* Softer wide gradient — backs the glass panel without killing the art */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,46rem)] bg-gradient-to-r from-white/95 via-white/55 to-transparent sm:w-[min(100%,52rem)] lg:w-[min(100%,56rem)]"
        />

        <Container className="pointer-events-none absolute inset-x-0 inset-y-0 z-[2] mx-auto flex items-start pb-10 pt-8 sm:pt-12 lg:pt-14">
          <div className="pointer-events-auto max-w-xl">
            <motion.div
              className="rounded-[1.75rem] border border-white/90 bg-white/80 p-6 shadow-[0_28px_90px_-35px_rgba(15,23,42,0.35)] ring-1 ring-[var(--color-ink-900)]/[0.06] backdrop-blur-xl supports-[backdrop-filter]:bg-white/65 sm:p-8"
              variants={panelStagger}
              initial={reduceMotion ? "show" : "hidden"}
              animate="show"
            >
              <motion.span
                variants={panelItem}
                className="inline-flex max-w-full items-center gap-2 rounded-full bg-[var(--color-sky-50)] px-3.5 py-1.5 text-[0.72rem] font-semibold leading-snug tracking-wide text-[var(--color-sky-800)] ring-1 ring-[var(--color-sky-200)] sm:text-[0.75rem]"
              >
                <span className="pulse-soft size-1.5 shrink-0 rounded-full bg-[var(--color-sky-500)]" />
                <span data-editable-id="home.hero.eyebrow" data-type="text" data-lvpe-kind={LVPE_KIND.HERO_EYEBROW}>
                  {content.eyebrow}
                </span>
              </motion.span>

              <motion.h1
                variants={panelItem}
                className="mt-4 font-display text-[1.95rem] font-bold leading-[1.12] tracking-tight text-balance text-[var(--color-ink-900)] sm:text-[2.55rem] lg:text-[3rem]"
              >
                <span className="block" data-editable-id="home.hero.titleLine1" data-type="text" data-lvpe-kind={LVPE_KIND.HERO_TITLE_LINE1}>
                  {content.titleLine1}
                </span>
                {showTitleLine2 ? (
                  <span className="mt-2 block font-semibold text-[var(--color-ink-900)] sm:mt-3">
                    <span data-editable-id="home.hero.titleLine2Prefix" data-type="text" data-lvpe-kind={LVPE_KIND.HERO_TITLE_PREFIX}>
                      {content.titleLine2Prefix}
                    </span>
                    <span
                      className="text-[var(--color-primary)]"
                      data-editable-id="home.hero.titleAccent"
                      data-type="text"
                      data-lvpe-kind={LVPE_KIND.HERO_TITLE_ACCENT}
                    >
                      {content.titleAccent}
                    </span>
                    <span data-editable-id="home.hero.titleLine2Suffix" data-type="text" data-lvpe-kind={LVPE_KIND.HERO_TITLE_SUFFIX}>
                      {content.titleLine2Suffix}
                    </span>
                  </span>
                ) : null}
              </motion.h1>

              <motion.p
                variants={panelItem}
                className="mt-4 max-w-xl text-pretty text-[1.0625rem] font-medium leading-relaxed text-[var(--color-ink-800)] sm:text-lg"
              >
                <span data-editable-id="home.hero.description" data-type="text" data-lvpe-kind={LVPE_KIND.HERO_LEAD}>
                  {content.description}
                </span>
              </motion.p>

              <motion.div variants={panelItem} className="mt-7 flex flex-wrap items-center gap-3">
                <motion.span
                  className="inline-block"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  data-editable-id="home.hero.ctaPrimary"
                  data-type="button"
                  data-lvpe-kind={LVPE_KIND.HERO_CTA_PRIMARY}
                  data-lvpe-action="navigate"
                >
                  <Link
                    href="/iletisim"
                    className="shine-on-hover group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft-lg)] transition hover:bg-[var(--color-primary-hover)]"
                  >
                    <span data-lvpe-btn-label>{t("ctaPrimary")}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.span>
                <motion.span
                  className="inline-block"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  data-editable-id="home.hero.ctaSecondary"
                  data-type="button"
                  data-lvpe-kind={LVPE_KIND.HERO_CTA_SECONDARY}
                  data-lvpe-action="navigate"
                >
                  <a
                    href={waLink("Merhaba, randevu hakkında bilgi almak istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink-200)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink-800)] shadow-[var(--shadow-soft)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    <MessageCircle className="size-4" />
                    <span data-lvpe-btn-label>{t("ctaSecondary")}</span>
                  </a>
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        <WaveDivider tone="light" bottomColor="#ffffff" />
      </div>
    </section>
  );
}
