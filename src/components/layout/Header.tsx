"use client";

import type { CSSProperties } from "react";
import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Mail,
  MapPin,
  Menu,
  X,
  Phone,
  ChevronDown,
  ChevronRight,
  Instagram,
  Youtube,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { cn, telLink, SITE_EMAIL, normalizeCssLength } from "@/lib/utils";
import { applyHeaderLogoResponsiveCaps } from "@/lib/header-logo-responsive";
import { Button } from "@/components/ui/Button";
import type { ResolvedNavItem } from "@/lib/site-navigation";
import {
  buildServicesMegaMenuData,
  type MegaMenuServiceCover,
} from "@/lib/nav-mega-menu";
import type { ServicesMegaMenuData } from "@/lib/nav-mega-menu";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { NavStyledLink, NavStyledButton } from "@/components/layout/NavStyledLink";
import type { HeaderNavSettings } from "@/lib/header-nav-settings";
import { LVPE_KIND, lvpeKindTitle } from "@/live-visual-editor/lvpe-kinds";
import { LVPE_QUERY_PARAM, LVPE_QUERY_VALUE } from "@/live-visual-editor/messages";
import { useIsLvpeEditing } from "@/live-visual-editor/useIsLvpeEditing";
import type { ImageProps } from "@/live-visual-editor/types";

const easeSoft = [0.22, 1, 0.36, 1] as const;

function useNarrowHeader() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1279px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return narrow;
}

/** LVPE üst logo — kayıtlı görsel stilleri React `style` ile uygulanır (yeniden render sonrası kaybolmaz). */
function headerLogoVisualStyle(
  lvpe: Partial<ImageProps> | undefined,
  narrowHeader: boolean,
): CSSProperties {
  const width = normalizeCssLength(lvpe?.width);
  const height = normalizeCssLength(lvpe?.height);
  const hasCustomSize = !!(width || height);

  const s: CSSProperties = {
    objectPosition: "left center",
  };

  if (!narrowHeader) {
    s.width = width ?? "auto";
    s.height = height ?? "auto";
  }

  if (hasCustomSize) {
    if (!narrowHeader) {
      s.maxWidth = "none";
      s.maxHeight = "none";
      s.objectFit = (lvpe?.objectFit?.trim() as CSSProperties["objectFit"]) || "fill";
    } else {
      s.objectFit = "contain";
    }
  } else {
    s.objectFit = "contain";
  }

  if (lvpe?.objectFit?.trim()) {
    s.objectFit = lvpe.objectFit.trim() as CSSProperties["objectFit"];
  }
  if (lvpe?.objectPosition?.trim()) s.objectPosition = lvpe.objectPosition.trim();
  if (lvpe?.opacity?.trim()) {
    const n = Number(lvpe.opacity.trim());
    s.opacity = Number.isFinite(n) ? n : lvpe.opacity.trim();
  }
  if (lvpe?.filter?.trim()) s.filter = lvpe.filter.trim();
  if (lvpe?.borderRadius?.trim()) s.borderRadius = lvpe.borderRadius.trim();
  if (lvpe?.boxShadow?.trim()) s.boxShadow = lvpe.boxShadow.trim();

  return s;
}

type HeaderBrandBlockProps = {
  logoUrl?: string | null;
  logoAlt?: string;
  logoImageLvpe?: Partial<ImageProps>;
};

function HeaderBrandContent({
  logoUrl,
  logoAlt,
  logoImageLvpe,
}: HeaderBrandBlockProps) {
  const tSite = useTranslations("site");
  const canvas = useIsLvpeEditing();
  const narrowHeader = useNarrowHeader();
  const logoSrc =
    typeof logoUrl === "string" && logoUrl.trim().length > 0
      ? logoUrl.trim()
      : "/brand/dr-sadi-logo-full.png";

  const height = normalizeCssLength(logoImageLvpe?.height);
  const width = normalizeCssLength(logoImageLvpe?.width);
  const hasCustomSize = !!(width || height);
  const logoVisualStyle = headerLogoVisualStyle(logoImageLvpe, narrowHeader);

  return (
    <div className="min-w-0 flex-1 max-w-[calc(100%-3rem)]">
      <Link
        href="/"
        className="inline-flex items-center max-w-full group outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-[var(--color-sky-400)] focus-visible:ring-offset-2"
      >
        <span
          data-editable-id="layout.header.logo"
          data-type="image"
          data-lvpe-kind={LVPE_KIND.LAYOUT_HEADER_LOGO}
          data-component-name={lvpeKindTitle(LVPE_KIND.LAYOUT_HEADER_LOGO)}
          className="inline-flex shrink min-w-0 max-w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- CMS ve LVPE URL’leri harici olabilir */}
          <img
            ref={(node) => {
              if (node && !canvas) applyHeaderLogoResponsiveCaps(node);
            }}
            src={logoSrc}
            alt={logoAlt ?? tSite("name")}
            className={cn(
              "header-brand-logo shrink-0",
              hasCustomSize && "header-brand-logo--custom",
            )}
            style={canvas ? undefined : logoVisualStyle}
          />
        </span>
      </Link>
    </div>
  );
}

function HeaderBrand(props: HeaderBrandBlockProps) {
  return <HeaderBrandContent {...props} />;
}

const topbarYoutubeUrl =
  typeof process.env.NEXT_PUBLIC_YOUTUBE_URL === "string"
    ? process.env.NEXT_PUBLIC_YOUTUBE_URL.trim()
    : "";
const topbarInstagramUrl =
  typeof process.env.NEXT_PUBLIC_INSTAGRAM_URL === "string"
    ? process.env.NEXT_PUBLIC_INSTAGRAM_URL.trim()
    : "";

export function Header({
  resolvedNav,
  headerNav,
  logoUrl,
  logoAlt,
  logoImageLvpe,
  megaMenuPortrait,
  megaMenuServiceCovers = {},
}: {
  resolvedNav: ResolvedNavItem[];
  headerNav: HeaderNavSettings;
  megaMenuPortrait: { src: string; alt: string };
  megaMenuServiceCovers?: Record<string, MegaMenuServiceCover>;
  logoUrl?: string | null;
  logoAlt?: string;
  logoImageLvpe?: Partial<ImageProps>;
}) {
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tMega = useTranslations("nav.megaMenu");
  const tTop = useTranslations("topbar");
  const pathname = usePathname();
  const servicesItem = useMemo(
    () => resolvedNav.find((i) => i.id === "nav_services"),
    [resolvedNav],
  );
  const servicesMegaData = useMemo(
    () =>
      buildServicesMegaMenuData(
        locale,
        servicesItem,
        headerNav,
        tMega("viewAllServices"),
        megaMenuPortrait,
        megaMenuServiceCovers,
      ),
    [locale, servicesItem, headerNav, tMega, megaMenuPortrait, megaMenuServiceCovers],
  );
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /** Tek seferde yalnızca bir masaüstü açılır menü — üst üste binmeyi önler. */
  const [openNavDropdownId, setOpenNavDropdownId] = useState<string | null>(null);
  const navDropdownCloseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(y > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenNavDropdownId(null);
  }, [pathname]);

  useEffect(
    () => () => {
      if (navDropdownCloseTimerRef.current !== null) {
        window.clearTimeout(navDropdownCloseTimerRef.current);
      }
    },
    [],
  );

  function clearNavDropdownCloseTimer() {
    if (navDropdownCloseTimerRef.current !== null) {
      window.clearTimeout(navDropdownCloseTimerRef.current);
      navDropdownCloseTimerRef.current = null;
    }
  }

  function openNavDropdown(id: string) {
    clearNavDropdownCloseTimer();
    setOpenNavDropdownId(id);
  }

  function scheduleNavDropdownClose() {
    clearNavDropdownCloseTimer();
    navDropdownCloseTimerRef.current = window.setTimeout(() => {
      setOpenNavDropdownId(null);
      navDropdownCloseTimerRef.current = null;
    }, 160);
  }

  function closeNavDropdownNow() {
    clearNavDropdownCloseTimer();
    setOpenNavDropdownId(null);
  }

  return (
    <>
      <motion.div
        className="header-top-bar hidden md:block overflow-hidden"
        initial={false}
        animate={{
          height: scrolled ? 0 : 40,
          opacity: scrolled ? 0 : 1,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.32, ease: easeSoft }
        }
        aria-hidden={scrolled}
      >
        <div className="container-x-header relative z-[1] flex h-10 min-h-10 items-center justify-between">
          <motion.div
            className="flex min-w-0 items-center gap-2.5 text-[0.8125rem] font-medium text-white/92"
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeSoft }}
          >
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <MapPin className="size-3.5 shrink-0 opacity-90" aria-hidden />
              <span className="truncate">{tTop("hours")}</span>
            </span>
            <span className="header-topbar-divider shrink-0" aria-hidden />
            <span className="truncate">{tTop("saturday")}</span>
          </motion.div>
          <motion.div
            className="flex shrink-0 items-center gap-2 sm:gap-3"
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeSoft }}
          >
            <a href={telLink} className="header-topbar-link">
              <Phone className="size-3.5 shrink-0" aria-hidden />
              <span>{tTop("phone")}</span>
            </a>
            <span className="header-topbar-divider" aria-hidden />
            <a href={`mailto:${SITE_EMAIL}`} className="header-topbar-link hidden lg:inline-flex">
              <Mail className="size-3.5 shrink-0" aria-hidden />
              <span>{SITE_EMAIL}</span>
            </a>
            <span className="header-topbar-divider hidden lg:block" aria-hidden />
            <Link href="/iletisim" className="header-topbar-link">
              {tTop("contact")}
            </Link>
            {topbarYoutubeUrl ? (
              <>
                <span className="header-topbar-divider" aria-hidden />
                <a
                  href={topbarYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-topbar-link header-topbar-link--icon"
                  aria-label="YouTube"
                >
                  <Youtube className="size-3.5" />
                </a>
              </>
            ) : null}
            {topbarInstagramUrl ? (
              <a
                href={topbarInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header-topbar-link header-topbar-link--icon"
                aria-label="Instagram"
              >
                <Instagram className="size-3.5" />
              </a>
            ) : null}
          </motion.div>
        </div>
      </motion.div>

      <div className="sticky top-0 z-50 w-full">
      <motion.header
        className={cn(
          "header-main-bar w-full overflow-x-clip overflow-y-visible transition-[box-shadow,background-color,border-color] duration-300",
          scrolled && "header-main-bar--scrolled",
        )}
        animate={{
          boxShadow: scrolled
            ? "0 10px 36px rgba(26, 74, 68, 0.1)"
            : "0 1px 0 rgba(30, 72, 66, 0.06)",
        }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.4, ease: easeSoft }
        }
      >
        {/* Dekoratif alt gradient çizgi — kaydırmada belirir */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-sky-300)]/50 to-transparent"
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0.35,
            scaleX: scrolled ? 1 : 0.65,
          }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.45, ease: easeSoft }
          }
        />

        {/* Mobil / tablet */}
        <div
          className={cn(
            "header-mobile-row container-x-header relative z-[70] min-h-0 py-2",
            "flex xl:hidden w-full items-center justify-between gap-x-2 gap-y-1",
          )}
        >
          <HeaderBrand
            logoUrl={logoUrl}
            logoAlt={logoAlt}
            logoImageLvpe={logoImageLvpe}
          />
          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              aria-label={tNav("openMenu")}
              aria-expanded={mobileOpen}
              data-lvpe-allow-click
              className="header-mobile-toggle"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                    className="inline-flex"
                  >
                    <X className="size-5 text-[var(--color-ink-700)]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                    className="inline-flex"
                  >
                    <Menu className="size-5 text-[var(--color-ink-700)]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Masaüstü — Randevu menünün bitişinde; dil üst koyu şeritte */}
        <div
          className={cn(
            "container-x-header relative hidden xl:grid min-h-[4.5rem] py-3 w-full",
            "xl:grid-cols-[auto_1fr] xl:items-center xl:gap-x-6 2xl:gap-x-10",
          )}
        >
          <div className="justify-self-start min-w-0">
            <HeaderBrand
              logoUrl={logoUrl}
              logoAlt={logoAlt}
              logoImageLvpe={logoImageLvpe}
            />
          </div>

          <nav
            className="relative z-30 flex w-full min-w-0 overflow-visible items-center min-h-11 justify-self-stretch pr-1 xl:pr-2"
            aria-label={tNav("mainNavigation")}
            data-lvpe-skip
          >
            <motion.div
              className="header-nav-list inline-flex flex-nowrap items-center justify-end gap-0.5 w-full"
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.48,
                ease: easeSoft,
                delay: reduceMotion ? 0 : 0.06,
              }}
            >
              {resolvedNav.map((item, navIdx) => (
                <motion.span
                  key={item.id}
                  className="inline-flex shrink-0"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.36,
                    ease: easeSoft,
                    delay: reduceMotion ? 0 : 0.08 + navIdx * 0.038,
                  }}
                >
                  <DesktopNavItem
                    item={item}
                    pathname={pathname}
                    tNav={tNav}
                    servicesMegaData={servicesMegaData}
                    reduceMotion={!!reduceMotion}
                    isDropdownOpen={openNavDropdownId === item.id}
                    onDropdownTriggerEnter={() => openNavDropdown(item.id)}
                    onDropdownTriggerLeave={scheduleNavDropdownClose}
                    onDropdownPanelPointerEnter={clearNavDropdownCloseTimer}
                    onDropdownPanelPointerLeave={scheduleNavDropdownClose}
                    onDropdownCloseNow={closeNavDropdownNow}
                  />
                </motion.span>
              ))}
              <Link href="/iletisim" className="header-nav-cta shrink-0">
                {tTop("appointment")}
              </Link>
            </motion.div>
          </nav>
        </div>

        {portalReady &&
          createPortal(
            <AnimatePresence initial={false}>
              {mobileOpen ? (
                <MobileMenu
                  key="mobile-menu"
                  items={resolvedNav}
                  servicesMegaData={servicesMegaData}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                  onClose={() => setMobileOpen(false)}
                  reduceMotion={!!reduceMotion}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )}
      </motion.header>
      </div>
    </>
  );
}

function DropdownDesc({ text }: { text?: string | null }) {
  if (!text?.trim()) return null;
  return (
    <div className="mt-0.5 pl-1 text-xs text-[var(--color-muted)] line-clamp-2">{text}</div>
  );
}

function DesktopNavItem({
  item,
  pathname,
  tNav,
  servicesMegaData,
  reduceMotion,
  isDropdownOpen,
  onDropdownTriggerEnter,
  onDropdownTriggerLeave,
  onDropdownPanelPointerEnter,
  onDropdownPanelPointerLeave,
  onDropdownCloseNow,
}: {
  item: ResolvedNavItem;
  pathname: string;
  tNav: ReturnType<typeof useTranslations<"nav">>;
  servicesMegaData: ServicesMegaMenuData;
  reduceMotion: boolean;
  isDropdownOpen: boolean;
  onDropdownTriggerEnter: () => void;
  onDropdownTriggerLeave: () => void;
  onDropdownPanelPointerEnter: () => void;
  onDropdownPanelPointerLeave: () => void;
  onDropdownCloseNow: () => void;
}) {
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [portalReady, setPortalReady] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const isServicesMega = item.id === "nav_services";
  const megaMenu = isServicesMega;

  const active =
    item.href !== "/" &&
    (item.href === pathname ||
      (item.href && item.href !== "/" && pathname.startsWith(item.href)) ||
      item.children?.some((c) => c.href === pathname));

  useLayoutEffect(() => {
    if (!isDropdownOpen || !triggerRef.current) {
      setMenuPos(null);
      return;
    }
    const update = () => {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const margin = 12;
      const megaMax =
        parseFloat(String(servicesMegaData.panelMaxWidth).replace(/px$/i, "")) || 1140;
      const panelW = megaMenu ? Math.min(vw - margin * 2, megaMax) : Math.min(vw - margin * 2, 320);
      const centerX = r.left + r.width / 2;
      let leftEdge = centerX - panelW / 2;
      leftEdge = Math.max(margin, Math.min(leftEdge, vw - panelW - margin));
      setMenuPos({ top: r.bottom + 10, left: leftEdge });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isDropdownOpen, megaMenu, servicesMegaData.panelMaxWidth]);

  const label = item.label;
  const dropdownSpring: Transition = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring", stiffness: 420, damping: 32 };

  if (!item.children) {
    if (!item.href) return null;
    return (
      <NavStyledLink
        href={item.href}
        active={!!active}
        style={item.labelStyle}
        className="shrink-0 min-w-max"
      >
        {label}
      </NavStyledLink>
    );
  }

  return (
    <div className="relative flex shrink-0">
      <NavStyledButton
        ref={triggerRef}
        onMouseEnter={onDropdownTriggerEnter}
        onMouseLeave={onDropdownTriggerLeave}
        onClick={() => {
          if (isServicesMega && item.href) {
            onDropdownCloseNow();
            router.push(item.href as Parameters<typeof router.push>[0]);
            return;
          }
          if (isDropdownOpen) onDropdownCloseNow();
          else onDropdownTriggerEnter();
        }}
        active={isDropdownOpen || !!active}
        style={item.labelStyle}
        className="inline-flex items-center gap-0.5 cursor-pointer bg-transparent border-0 ring-0 shrink-0 min-w-max tap-press"
        data-lvpe-allow-click
        aria-expanded={isDropdownOpen}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-300",
            isDropdownOpen && "rotate-180",
          )}
          aria-hidden
        />
      </NavStyledButton>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {isDropdownOpen && menuPos ? (
              <motion.div
                key={`nav-dd-${item.id}`}
                className={cn(
                  "fixed z-[500]",
                  megaMenu ? "fusion-megamenu-dropdown" : "min-w-[288px] max-w-[min(100vw-1.5rem,320px)]",
                )}
                style={{
                  top: menuPos.top,
                  left: menuPos.left,
                }}
                onMouseEnter={onDropdownPanelPointerEnter}
                onMouseLeave={onDropdownPanelPointerLeave}
                initial={
                  reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={dropdownSpring}
              >
                <div
                  className={cn(
                    megaMenu
                      ? "fusion-megamenu-panel"
                      : "overflow-hidden rounded-2xl border border-[var(--color-ink-100)] bg-[var(--color-surface)] shadow-[var(--shadow-soft-lg)] ring-1 ring-black/[0.04]",
                    megaMenu ? "max-h-[min(80vh,640px)] overflow-y-auto" : "",
                  )}
                  style={
                    megaMenu
                      ? { width: "100%", maxWidth: servicesMegaData.panelMaxWidth }
                      : undefined
                  }
                >
                  {isServicesMega ? (
                    <ServicesMegaMenu
                      data={servicesMegaData}
                      pathname={pathname}
                      onNavigate={onDropdownCloseNow}
                    />
                  ) : (
                    <div className="flex flex-col gap-0.5 p-1.5">
                      {item.children?.map((child, i) => (
                        <motion.div
                          key={child.href}
                          initial={
                            reduceMotion ? false : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: reduceMotion ? 0 : i * 0.03,
                            duration: reduceMotion ? 0 : 0.22,
                            ease: easeSoft,
                          }}
                        >
                          <Link
                            href={child.href as Parameters<typeof Link>[0]["href"]}
                            onClick={onDropdownCloseNow}
                            className={cn(
                              "group/link relative flex flex-col rounded-xl px-3 py-2 transition-colors duration-200",
                              child.href === pathname
                                ? "bg-[var(--color-sky-50)] text-[var(--color-sky-700)]"
                                : "hover:bg-[var(--color-cream-100)]",
                            )}
                          >
                            <div className="font-semibold text-sm text-[var(--color-ink-900)]">
                              {child.label}
                            </div>
                            <DropdownDesc text={child.description} />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function MobileMenu({
  items,
  servicesMegaData,
  pathname,
  onNavigate,
  onClose,
  reduceMotion,
}: {
  items: ResolvedNavItem[];
  servicesMegaData: ServicesMegaMenuData;
  pathname: string;
  onNavigate: () => void;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const tNav = useTranslations("nav");
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-[9998] xl:hidden"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={tNav("mainNavigation")}
    >
      <button
        type="button"
        className="absolute inset-0 bg-[var(--color-ink-900)]/45 backdrop-blur-[2px]"
        aria-label={tNav("closeMenu")}
        onClick={onClose}
      />
      <motion.nav
        initial={reduceMotion ? false : { x: "100%" }}
        animate={{ x: 0 }}
        exit={reduceMotion ? undefined : { x: "100%" }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeSoft }}
        className="absolute inset-y-0 right-0 flex w-full max-w-[min(100vw,24rem)] flex-col bg-[var(--color-surface)] shadow-2xl border-l border-[var(--color-ink-100)]"
        data-lvpe-skip
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--color-ink-100)] shrink-0">
          <span className="text-sm font-semibold text-[var(--color-ink-800)]">
            {tNav("mainNavigation")}
          </span>
          <button
            type="button"
            onClick={onClose}
            data-lvpe-allow-click
            className="header-mobile-toggle"
            aria-label={tNav("closeMenu")}
          >
            <X className="size-5 text-[var(--color-ink-700)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain max-h-[calc(100dvh-4rem)]">
          <div className="px-4 py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1 rounded-2xl border border-[var(--color-ink-100)]/80 bg-[var(--color-surface)]/90 p-1 shadow-[var(--shadow-soft)]">
            {items.map((item, idx) => {
              const label = item.label;

              if (!item.children) {
                if (!item.href) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.07 + idx * 0.045,
                      duration: reduceMotion ? 0 : 0.32,
                      ease: easeSoft,
                    }}
                  >
                    <Link
                      href={item.href as Parameters<typeof Link>[0]["href"]}
                      onClick={onNavigate}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium text-[var(--color-ink-800)] hover:bg-[var(--color-cream-100)] transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              }

              const expanded = openIdx === idx;
              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.07 + idx * 0.045,
                    duration: reduceMotion ? 0 : 0.32,
                    ease: easeSoft,
                  }}
                  className="rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.id === "nav_services" && item.href) {
                        onNavigate();
                        router.push(item.href as Parameters<typeof router.push>[0]);
                        return;
                      }
                      setOpenIdx(expanded ? null : idx);
                    }}
                    data-lvpe-allow-click
                    className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium text-[var(--color-ink-800)] hover:bg-[var(--color-cream-100)] transition-colors tap-press"
                    aria-expanded={expanded}
                  >
                    {label}
                    <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
                      <ChevronRight className="size-4 text-[var(--color-muted)]" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <div className="overflow-hidden border-t border-[var(--color-ink-100)]/60 bg-[var(--color-cream-50)]/80">
                        <div className="pb-2 pt-1">
                          {item.id === "nav_services" ? (
                            <ServicesMegaMenu
                              data={servicesMegaData}
                              pathname={pathname}
                              onNavigate={onNavigate}
                              className="rounded-lg overflow-hidden"
                            />
                          ) : (
                        <div className="pl-2 flex flex-col gap-0.5">
                          {item.href && (
                            <Link
                              href={
                                item.href as Parameters<typeof Link>[0]["href"]
                              }
                              onClick={onNavigate}
                              className="rounded-lg px-4 py-2 text-sm font-semibold text-[var(--color-primary)]"
                            >
                              {tNav("viewAll")}
                            </Link>
                          )}
                          {item.children?.map((child, ci) => (
                            <motion.div
                              key={child.href}
                              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: reduceMotion ? 0 : ci * 0.04,
                              }}
                            >
                              <Link
                                href={
                                  child.href as Parameters<
                                    typeof Link
                                  >[0]["href"]
                                }
                                onClick={onNavigate}
                                className="block rounded-lg px-4 py-2 text-sm text-[var(--color-ink-700)] hover:bg-[var(--color-cream-100)]"
                              >
                                <span className="font-medium">{child.label}</span>
                                {child.description ? (
                                  <span className="mt-0.5 block text-xs text-[var(--color-muted)] line-clamp-2">
                                    {child.description}
                                  </span>
                                ) : null}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="pt-1">
            <Link href="/iletisim" className="block w-full" onClick={onNavigate}>
              <Button size="md" className="w-full shadow-[var(--shadow-soft)]">
                {tNav("iletisim")}
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}

