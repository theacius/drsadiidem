"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { navLabelStyleToCss } from "@/lib/nav-label-style";
import type { ServicesMegaMenuData } from "@/lib/nav-mega-menu";

type Props = {
  data: ServicesMegaMenuData;
  pathname: string;
  onNavigate: () => void;
  className?: string;
};

export function ServicesMegaMenu({ data, pathname, onNavigate, className }: Props) {
  return (
    <div className={cn("fusion-megamenu fusion-megamenu--ref", className)}>
      <div className="fusion-megamenu-ref-grid">
        <aside className="fusion-megamenu-sidebar">
          <div className="fusion-megamenu-sidebar-inner">
            <span className="fusion-megamenu-badge">{data.badgeLabel}</span>

            <Link
              href={data.featuredHref as Parameters<typeof Link>[0]["href"]}
              onClick={onNavigate}
              className="fusion-megamenu-featured block group"
            >
              <h3
                className="fusion-megamenu-featured-title"
                style={navLabelStyleToCss(data.introTitleStyle)}
              >
                {data.featuredTitle}
              </h3>
              <p
                className="fusion-megamenu-featured-body"
                style={navLabelStyleToCss(data.introBodyStyle)}
              >
                {data.featuredBody}
              </p>
            </Link>

            <nav className="fusion-megamenu-sidebar-nav" aria-label={data.badgeLabel}>
              <ul className="fusion-megamenu-sidebar-list">
                {data.sidebarLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href as Parameters<typeof Link>[0]["href"]}
                      onClick={onNavigate}
                      className={cn(
                        "fusion-megamenu-sidebar-link",
                        pathname === link.href && "is-active",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href={data.hubHref}
              onClick={onNavigate}
              className="fusion-megamenu-view-all fusion-megamenu-view-all--sidebar"
            >
              {data.viewAllLabel}
            </Link>
          </div>
        </aside>

        <div className="fusion-megamenu-tiles" aria-label={data.viewAllLabel}>
          {data.gridTiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href as Parameters<typeof Link>[0]["href"]}
              onClick={onNavigate}
              className={cn(
                "fusion-megamenu-tile tap-press",
                pathname === tile.href && "is-active",
              )}
            >
              <div className="fusion-megamenu-tile-media">
                <Image
                  src={tile.imageSrc ?? "/carousel/yurutec.jpg"}
                  alt={tile.imageAlt ?? tile.label}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 220px, 45vw"
                  unoptimized={
                    (tile.imageSrc ?? "").startsWith("/uploads/") ||
                    (tile.imageSrc ?? "").startsWith("http")
                  }
                />
              </div>
              <span
                className="fusion-megamenu-tile-label"
                style={navLabelStyleToCss(data.tileLabelStyle)}
              >
                {tile.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="fusion-megamenu-portrait-wrap">
          <Image
            src={data.portraitSrc}
            alt={data.portraitAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 320px, 40vw"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
