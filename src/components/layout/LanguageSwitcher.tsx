"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type MessagesShape = {
  langSwitcher?: { nativeNames?: Record<string, string>; label?: string };
};

const MENU_MIN_W = 160;
const MENU_GAP = 6;

export function LanguageSwitcher({
  compact,
  dense,
  topBar,
}: {
  compact?: boolean;
  dense?: boolean;
  /** Üst koyu ileti şeridi (`md+`) — dar satıra sığar */
  topBar?: boolean;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("langSwitcher");
  const messages = useMessages() as MessagesShape;
  const nativeNames = messages.langSwitcher?.nativeNames ?? {};
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [placement, setPlacement] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;

    function update() {
      const btn = triggerRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      if (compact) {
        setPlacement({
          top: r.bottom + MENU_GAP,
          left: r.left,
          width: r.width,
        });
      } else {
        const w = Math.max(MENU_MIN_W, r.width);
        const margin = 8;
        const idealLeft = r.right - w;
        const maxLeft = Math.max(margin, window.innerWidth - w - margin);
        setPlacement({
          top: r.bottom + MENU_GAP,
          left: Math.min(Math.max(margin, idealLeft), maxLeft),
          width: w,
        });
      }
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, compact]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const node = e.target as Node;
      if (rootRef.current?.contains(node) || menuRef.current?.contains(node)) {
        return;
      }
      setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const currentLabel = nativeNames[locale] ?? locale.toUpperCase();

  const spring = reduceMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 520, damping: 34 };

  const dropdown = (
    <AnimatePresence>
      {open && placement && (
        <motion.ul
          key="lang-switcher-menu"
          ref={menuRef}
          role="listbox"
          aria-label={t("label")}
          style={{
            position: "fixed",
            top: placement.top,
            left: placement.left,
            width: placement.width,
          }}
          initial={
            reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={spring}
          className={cn(
            "max-h-[min(22rem,calc(100vh-1rem))] overflow-y-auto rounded-xl border border-[var(--color-ink-100)] bg-white/95 backdrop-blur-md py-1 shadow-[var(--shadow-soft-lg)] ring-1 ring-black/[0.03] z-[260]",
          )}
        >
          {routing.locales.map((loc, i) => {
            const label = nativeNames[loc] ?? loc.toUpperCase();
            const selected = loc === locale;
            return (
              <motion.li
                key={loc}
                role="option"
                aria-selected={selected}
                initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : i * 0.025,
                  duration: reduceMotion ? 0 : 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={pathname}
                  locale={loc}
                  className={cn(
                    "block px-3 py-2 text-sm transition-colors duration-200",
                    selected
                      ? "bg-[var(--color-sky-50)] text-[var(--color-sky-700)] font-semibold"
                      : "text-[var(--color-ink-800)] hover:bg-[var(--color-cream-100)]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div ref={rootRef} className="relative">
        <motion.button
          ref={triggerRef}
          type="button"
          aria-label={`${t("label")}: ${currentLabel}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          data-lvpe-allow-click
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-ink-100)]/90 bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-[var(--color-ink-800)] shadow-[var(--shadow-soft)] hover:border-[var(--color-sky-300)] hover:text-[var(--color-ink-900)] transition-colors duration-200",
            compact && "w-full justify-between py-2.5 text-sm",
            dense &&
              !compact &&
              !topBar &&
              "md:gap-1 md:px-2 md:py-1 md:text-[0.68rem]",
            topBar &&
              "h-7 min-h-7 px-2 py-0 gap-1 text-[0.62rem] border-white/25 bg-white/[0.93] text-[var(--color-ink-900)] shadow-sm backdrop-blur-sm hover:border-white/45 hover:bg-white hover:text-[var(--color-ink-900)]",
          )}
        >
          <span className="inline-flex shrink-0" aria-hidden>
            <Globe
              className={cn(
                topBar
                  ? "size-3 text-[var(--color-sky-600)]"
                  : dense && !compact
                    ? "size-3 text-[var(--color-sky-500)]"
                    : "size-3.5 text-[var(--color-sky-500)]",
              )}
            />
          </span>
          <span className="truncate">{currentLabel}</span>
          <ChevronDown
            className={cn(
              "text-[var(--color-muted)] shrink-0 transition-transform duration-300",
              topBar ? "size-3" : dense && !compact ? "size-3" : "size-3.5",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </motion.button>
      </div>
      {mounted ? createPortal(dropdown, document.body) : null}
    </>
  );
}
