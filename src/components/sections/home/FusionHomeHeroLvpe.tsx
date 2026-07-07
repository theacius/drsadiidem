"use client";

import { Link } from "@/i18n/navigation";
import { LvpeDomText, LvpeDomBtnLabel } from "@/live-visual-editor/LvpeDomManaged";
import { LVPE_KIND, lvpeKindTitle } from "@/live-visual-editor/lvpe-kinds";
import type { FusionHomeHeroCopy } from "@/lib/lvpe-merge-home";
import { cn } from "@/lib/utils";

/** Fusion hero — referans: klinik arka plan + sağ altta kesik portre. */
export function FusionHomeHeroLvpe({
  backgroundSrc,
  portraitSrc,
  portraitAlt,
  eyebrow,
  title,
  subtitle,
  ctaAbout,
  ctaServices,
}: FusionHomeHeroCopy) {
  return (
    <section
      className={cn(
        "fusion-home-hero fusion-home-hero--enter",
        "max-lg:flex max-lg:flex-col max-lg:min-h-0",
        "max-md:block max-md:min-h-[min(100svh,680px)] max-md:overflow-visible",
      )}
      aria-label={title}
    >
      <div className="fusion-home-hero__bg">
        <span
          className="fusion-home-hero__bg-editable"
          data-editable-id="home.hero.bannerImage"
          data-type="image"
          data-lvpe-kind={LVPE_KIND.HERO_BANNER_IMAGE}
          data-component-name={lvpeKindTitle(LVPE_KIND.HERO_BANNER_IMAGE)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={backgroundSrc}
            alt=""
            className="fusion-home-hero__bg-img"
            draggable={false}
          />
        </span>
        <div className="fusion-home-hero__overlay" aria-hidden />
      </div>

      <div
        className={cn(
          "container-x fusion-home-hero__inner",
          "max-lg:order-1 max-lg:!min-h-0 max-lg:items-center max-lg:pb-2 max-lg:pt-3",
          "max-md:!min-h-[min(100svh,680px)] max-md:pb-[13.5rem] max-md:pt-2 max-md:z-[3]",
        )}
      >
        <div
          className={cn(
            "fusion-home-hero__content fusion-home-hero__content--enter",
            "max-lg:mx-auto max-lg:text-center max-lg:max-w-[22rem]",
          )}
        >
          <LvpeDomText
            editableId="home.hero.eyebrow"
            lvpeKind={LVPE_KIND.HERO_EYEBROW}
            componentName={lvpeKindTitle(LVPE_KIND.HERO_EYEBROW)}
            className="fusion-home-hero__eyebrow block"
            serverText={eyebrow}
          />
          <LvpeDomText
            editableId="home.hero.titleLine1"
            lvpeKind={LVPE_KIND.HERO_TITLE_LINE1}
            componentName={lvpeKindTitle(LVPE_KIND.HERO_TITLE_LINE1)}
            className="fusion-home-hero__title block max-md:!text-[1.15rem] max-md:!leading-snug"
            serverText={title}
          />
          <LvpeDomText
            editableId="home.hero.description"
            lvpeKind={LVPE_KIND.HERO_LEAD}
            componentName={lvpeKindTitle(LVPE_KIND.HERO_LEAD)}
            className="fusion-home-hero__lead block max-md:!text-[0.82rem] max-md:!mt-2 max-md:line-clamp-2"
            serverText={subtitle}
          />
          <div className="fusion-home-hero__actions max-lg:justify-center max-lg:flex-col max-lg:items-stretch max-md:!mt-3">
            <span
              className="inline-flex"
              data-editable-id="home.hero.ctaPrimary"
              data-type="button"
              data-lvpe-kind={LVPE_KIND.HERO_CTA_PRIMARY}
              data-component-name={lvpeKindTitle(LVPE_KIND.HERO_CTA_PRIMARY)}
              data-lvpe-action="navigate"
            >
              <Link href="/hakkimda" className="btn-fusion">
                <LvpeDomBtnLabel serverText={ctaAbout} />
              </Link>
            </span>
            <span
              className="inline-flex"
              data-editable-id="home.hero.ctaSecondary"
              data-type="button"
              data-lvpe-kind={LVPE_KIND.HERO_CTA_SECONDARY}
              data-component-name={lvpeKindTitle(LVPE_KIND.HERO_CTA_SECONDARY)}
              data-lvpe-action="navigate"
            >
              <Link href="/hizmet-alanlarimiz" className="btn-fusion btn-fusion--bright">
                <LvpeDomBtnLabel serverText={ctaServices} />
              </Link>
            </span>
          </div>
        </div>
      </div>

      <span
        className="fusion-home-hero__portrait-wrap fusion-home-hero__portrait--enter"
        data-editable-id="home.hero.portraitImage"
        data-type="image"
        data-lvpe-kind={LVPE_KIND.HERO_PORTRAIT_IMAGE}
        data-component-name={lvpeKindTitle(LVPE_KIND.HERO_PORTRAIT_IMAGE)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitSrc}
          alt={portraitAlt}
          className="fusion-home-hero__portrait-img"
          draggable={false}
        />
      </span>
    </section>
  );
}
