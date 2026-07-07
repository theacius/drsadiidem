"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { FunctionalPillarItem } from "@/components/sections/FunctionalPillars";
import { getPillarAccent } from "./pillar-accents";

type Props = {
  sectionTitle: string;
  sectionSubtitle: string;
  pillars: FunctionalPillarItem[];
};

function shortNavLabel(title: string) {
  const i = title.indexOf("·");
  return (i >= 0 ? title.slice(i + 1) : title).trim();
}

const easeOut = [0.22, 1, 0.36, 1] as const;

const SIDEBAR_SPRING = { type: "spring" as const, stiffness: 420, damping: 34 };

/** Üst yapışkan başlık + güvenli alan için yaklaşık offset */
const SCROLL_MARGIN_TOP =
  "scroll-mt-[calc(env(safe-area-inset-top,0px)+7rem)]";

type SidebarNode = {
  id: string;
  anchor: string;
  navLabel: string;
  accent: ReturnType<typeof getPillarAccent>;
};

function FunctionalMedicineSidebar({
  nodes,
  activeAnchor,
  scrollToSection,
  sidebarTitle,
  navAria,
  reduceMotion,
}: {
  nodes: SidebarNode[];
  activeAnchor: string;
  scrollToSection: (anchor: string) => void;
  sidebarTitle: string;
  navAria: string;
  reduceMotion: boolean;
}) {
  const highlightTransition = reduceMotion
    ? { duration: 0.2 }
    : SIDEBAR_SPRING;
  const staggerBase = reduceMotion ? 0 : 0.08;

  return (
    <motion.nav
      aria-label={navAria}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: easeOut }}
      className={cn(
        "relative overflow-visible rounded-[1.35rem]",
        "border border-[var(--color-ink-100)]/80",
        "bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)]",
        "shadow-[0_20px_50px_-28px_rgba(31,45,61,0.22),var(--shadow-soft)]",
        "backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-surface)_78%,transparent)]",
        "ring-1 ring-white/70",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem]"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            background:
              "linear-gradient(145deg, rgba(91,168,214,0.07) 0%, transparent 42%, rgba(168,216,185,0.06) 100%)",
          }}
        />
      </div>
      <motion.div
        aria-hidden
        className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-sky-300)]/55 to-transparent"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.55,
          delay: reduceMotion ? 0 : 0.12,
          ease: easeOut,
        }}
      />

      <div className="relative px-3 pb-3 pt-5 sm:px-3.5 sm:pb-3.5 sm:pt-5">
        <motion.div
          className="mb-3 flex items-center gap-2 px-2"
          initial={reduceMotion ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.4,
            delay: reduceMotion ? 0 : 0.06,
            ease: easeOut,
          }}
        >
          <motion.span
            className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-sky-400)] to-[var(--color-mint-400)] text-white shadow-[var(--shadow-soft)]"
            aria-hidden
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 8px 22px rgba(91,168,214,0.25)",
                      "0 10px 28px rgba(91,168,214,0.32)",
                      "0 8px 22px rgba(91,168,214,0.25)",
                    ],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="size-3.5 opacity-95" />
          </motion.span>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {sidebarTitle}
          </p>
        </motion.div>

        <ul className="relative flex flex-col gap-1">
          {nodes.map((p, index) => {
            const isActive = activeAnchor === p.anchor;
            const Icon = p.accent.Icon;
            return (
              <motion.li
                key={p.id}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.42,
                  delay: reduceMotion ? 0 : staggerBase + index * 0.055,
                  ease: easeOut,
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => scrollToSection(p.anchor)}
                  whileHover={
                    reduceMotion ? undefined : { x: 4, transition: { duration: 0.22 } }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={cn(
                    "relative z-0 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-sky-400)] focus-visible:ring-offset-2",
                  )}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="fm-sidebar-active-bg"
                      className={cn(
                        "absolute inset-0 z-0 rounded-xl",
                        "bg-gradient-to-br from-white via-white to-[var(--color-sky-50)]/90",
                        "shadow-[0_12px_34px_-22px_rgba(91,168,214,0.55)]",
                        "ring-1 ring-[var(--color-sky-200)]/65",
                      )}
                      transition={highlightTransition}
                    />
                  ) : null}

                  <motion.span
                    layout
                    className={cn(
                      "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl",
                      isActive
                        ? cn(
                            "bg-gradient-to-br text-white shadow-inner",
                            p.accent.iconGradient,
                          )
                        : "border border-[var(--color-ink-100)]/70 bg-[var(--color-cream-50)]/90 text-[var(--color-ink-500)]",
                    )}
                    transition={highlightTransition}
                  >
                    <Icon className="size-[1.05rem]" aria-hidden />
                  </motion.span>

                  <span
                    className={cn(
                      "relative z-10 min-w-0 flex-1 text-[0.8125rem] leading-snug text-pretty",
                      isActive
                        ? "font-semibold text-[var(--color-ink-900)]"
                        : "font-medium text-[var(--color-ink-600)]",
                    )}
                  >
                    {p.navLabel}
                  </span>

                  <motion.span
                    className="relative z-10 shrink-0 text-[var(--color-sky-600)]"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.35,
                      x: isActive ? 0 : -4,
                    }}
                    transition={highlightTransition}
                  >
                    <ChevronRight
                      className={cn(
                        "size-4",
                        !isActive && "text-[var(--color-ink-400)]",
                      )}
                      aria-hidden
                    />
                  </motion.span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}

export function FunctionalMedicineInteractive({
  sectionTitle,
  sectionSubtitle,
  pillars,
}: Props) {
  const reduceMotion = useReducedMotion();
  const tVis = useTranslations("functionalMedicinePage.visual");
  const [activeAnchor, setActiveAnchor] = useState<string>("");
  const scrollLockRef = useRef(false);

  const nodes = useMemo(
    () =>
      pillars.map((p) => ({
        ...p,
        anchor: `fm-${p.id}`,
        navLabel: shortNavLabel(p.title),
        accent: getPillarAccent(p.id),
      })),
    [pillars],
  );

  const scrollToSection = useCallback(
    (anchor: string) => {
      const el = document.getElementById(anchor);
      if (!el) return;
      scrollLockRef.current = true;
      setActiveAnchor(anchor);
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${anchor}`);
      window.setTimeout(
        () => {
          scrollLockRef.current = false;
        },
        reduceMotion ? 0 : 700,
      );
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (!nodes.length) return;
    let scrollTimer: number | undefined;

    const syncFromHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw && nodes.some((n) => n.anchor === raw)) {
        setActiveAnchor(raw);
        return raw;
      }
      setActiveAnchor(nodes[0].anchor);
      return null;
    };

    const initial = syncFromHash();
    if (initial) {
      scrollTimer = window.setTimeout(() => scrollToSection(initial), 80);
    }

    const onHashChange = () => {
      const h = window.location.hash.replace(/^#/, "");
      if (h && nodes.some((n) => n.anchor === h)) {
        scrollToSection(h);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      if (scrollTimer !== undefined) window.clearTimeout(scrollTimer);
    };
  }, [nodes, scrollToSection]);

  /** Görünür bölüme göre aktif satır — üst şerit navigasyonu yok, yan panel senkron */
  useEffect(() => {
    if (!nodes.length) return;
    const ids = nodes.map((n) => n.anchor);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((x): x is HTMLElement => !!x);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) {
          setActiveAnchor(top.target.id);
          window.history.replaceState(null, "", `#${top.target.id}`);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.08, 0.2, 0.35, 0.55],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [nodes]);

  return (
    <Section
      spacing="lg"
      className="relative bg-gradient-to-b from-white via-[var(--color-cream-50)] to-[color-mix(in_srgb,var(--color-sky-50)_55%,var(--color-cream-50))]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 100% 0%, rgba(91,168,214,0.15), transparent), radial-gradient(ellipse 50% 35% at 0% 80%, rgba(168,216,185,0.14), transparent)",
        }}
      />

      <Container className="relative">
        <Reveal>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-sky-200)] bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-sky-700)] shadow-[var(--shadow-soft)] backdrop-blur-md">
              <Sparkles className="size-3.5 text-amber-500" aria-hidden />
              {tVis("introEyebrow")}
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--color-ink-900)] sm:text-4xl lg:text-[2.6rem] text-balance">
              {sectionTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-700)] text-pretty">
              {sectionSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start lg:gap-12 xl:gap-14">
          <aside
            className={cn(
              "z-10 shrink-0 self-start w-full lg:w-[min(100%,18rem)] xl:w-[19rem]",
              "sticky top-[calc(env(safe-area-inset-top,0px)+4.625rem)] md:top-[calc(env(safe-area-inset-top,0px)+6.75rem)]",
              "max-h-[calc(100vh-env(safe-area-inset-top,0px)-5.5rem)] md:max-h-[calc(100vh-env(safe-area-inset-top,0px)-7.25rem)]",
              "overflow-y-auto overscroll-contain [scrollbar-gutter:stable]",
            )}
          >
            <FunctionalMedicineSidebar
              nodes={nodes}
              activeAnchor={activeAnchor}
              scrollToSection={scrollToSection}
              sidebarTitle={tVis("sidebarTitle")}
              navAria={tVis("navAria")}
              reduceMotion={!!reduceMotion}
            />
          </aside>

          <div className="min-w-0 flex-1 flex flex-col gap-8 lg:gap-10">
            {nodes.map((p, idx) => {
              const paras = p.body
                .split(/\n\n+/)
                .map((x) => x.trim())
                .filter(Boolean);
              const { accent } = p;
              const CardIcon = accent.Icon;

              return (
                <motion.article
                  key={p.id}
                  id={p.anchor}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.45,
                    delay: reduceMotion ? 0 : idx * 0.04,
                    ease: easeOut,
                  }}
                  className={cn(
                    SCROLL_MARGIN_TOP,
                    "relative overflow-hidden rounded-2xl border border-[var(--color-ink-100)]/80 shadow-[var(--shadow-soft)] sm:rounded-[1.75rem]",
                    accent.cardTint,
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-0 top-6 bottom-6 w-1.5 rounded-full bg-gradient-to-b sm:top-8 sm:bottom-8",
                      accent.barGradient,
                    )}
                    aria-hidden
                  />

                  <div className="relative pl-5 pr-5 py-7 sm:pl-8 sm:pr-9 sm:py-9 lg:pl-10">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                      <div className="flex shrink-0 flex-col items-start gap-3 sm:w-[200px]">
                        <div
                          className={cn(
                            "flex size-[4.25rem] items-center justify-center rounded-2xl bg-gradient-to-br text-white sm:size-[4.75rem]",
                            accent.iconGradient,
                            accent.iconShadow,
                          )}
                        >
                          <CardIcon className="size-[1.65rem] sm:size-[1.85rem]" aria-hidden />
                        </div>
                        <span className="rounded-full bg-[var(--color-ink-900)]/5 px-2.5 py-0.5 text-[0.65rem] font-bold tabular-nums text-[var(--color-ink-600)]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-semibold leading-snug text-[var(--color-ink-900)] sm:text-2xl text-pretty">
                          {p.title}
                        </h3>
                        <div className="mt-5 space-y-4 text-[var(--color-ink-700)] leading-relaxed text-pretty">
                          {paras.map((chunk, i) => (
                            <p key={i}>{chunk}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-[var(--color-sky-200)]/70 bg-gradient-to-br from-sky-50 via-white to-mint-50 px-6 py-8 shadow-[var(--shadow-soft)] sm:rounded-[1.75rem] sm:px-10 sm:py-10"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: easeOut }}
            >
              <div
                className="pointer-events-none absolute -right-16 top-1/2 size-56 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,184,154,0.35),transparent_68%)] blur-2xl"
                aria-hidden
              />
              <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-sky-600)]">
                    {tVis("ctaEyebrow")}
                  </p>
                  <p className="mt-2 max-w-xl font-display text-xl font-semibold text-[var(--color-ink-900)] sm:text-2xl text-pretty">
                    {tVis("ctaTitle")}
                  </p>
                </div>
                <Link
                  href="/iletisim"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft-lg)] transition-[transform,box-shadow] duration-200",
                    "hover:brightness-[1.05] active:scale-[0.98]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-sky-400)]",
                  )}
                >
                  {tVis("ctaButton")}
                  <ArrowRight className="size-4 opacity-90" aria-hidden />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
