import { SITE_SERVICES, serviceHref, siteServiceBySlug, type SiteServiceDef } from "@/content/site-services";

export type ReferenceMenuService = {
  stableKey: string;
  slug: string;
  labelTr: string;
  labelEn: string;
  descriptionTr: string;
  descriptionEn: string;
  href: string;
};

/** Mega menü 2×2 görsel kart — özel başlık / bağlantı destekler */
export type MegaMenuGridItemDef = {
  key: string;
  href: string;
  labelTr: string;
  labelEn: string;
  descriptionTr: string;
  descriptionEn: string;
  imageSrc: string;
  imageAltTr: string;
  imageAltEn: string;
  /** Veritabanı kapak görseli için hizmet slug (varsa) */
  serviceSlug?: string;
};

function toMenuItem(s: SiteServiceDef): ReferenceMenuService {
  return {
    stableKey: `nav_ref_${s.slug}`,
    slug: s.slug,
    labelTr: s.titleTr,
    labelEn: s.titleEn,
    descriptionTr: s.descriptionTr,
    descriptionEn: s.descriptionEn,
    href: serviceHref(s.slug),
  };
}

function gridFromService(slug: string): MegaMenuGridItemDef {
  const s = siteServiceBySlug(slug)!;
  return {
    key: slug,
    href: serviceHref(slug),
    labelTr: s.titleTr,
    labelEn: s.titleEn,
    descriptionTr: s.descriptionTr,
    descriptionEn: s.descriptionEn,
    imageSrc: s.imageUrl,
    imageAltTr: s.titleTr,
    imageAltEn: s.titleEn,
    serviceSlug: slug,
  };
}

/** Üst menü Hizmet Alanları alt bağlantıları */
export const REFERENCE_MENU_SERVICES: readonly ReferenceMenuService[] =
  SITE_SERVICES.map(toMenuItem);

/** Mega menü 2×2 ızgara */
export const MEGA_MENU_GRID_ITEMS: readonly MegaMenuGridItemDef[] = [
  gridFromService("saglikli-cocuk-muayenesi-ve-izlemi"),
  gridFromService("yenidogan-takibi"),
  {
    key: "fonksiyonel-tip",
    href: "/fonksiyonel-tip",
    labelTr: "Fonksiyonel Tıp",
    labelEn: "Functional Medicine",
    descriptionTr:
      "Çocuklarda fonksiyonel tıp ve bütüncül pediatri yaklaşımı.",
    descriptionEn: "Functional medicine and holistic pediatric care.",
    imageSrc: "/carousel/atesli-cocuga-yaklasim.jpg",
    imageAltTr: "Fonksiyonel Tıp",
    imageAltEn: "Functional Medicine",
    serviceSlug: "cocuk-hastaliklarinin-klinik-degerlendirilmesi",
  },
  {
    key: "fonksiyonel-beslenme",
    href: "/fonksiyonel-tip?tab=beslenme",
    labelTr: "Fonksiyonel Beslenme",
    labelEn: "Functional Nutrition",
    descriptionTr:
      "Beslenme düzeni ve günlük yaşam alışkanlıklarının bütüncül değerlendirilmesi.",
    descriptionEn: "Holistic assessment of nutrition and daily habits.",
    imageSrc: "/carousel/tamamlayici-beslenme.jpg",
    imageAltTr: "Fonksiyonel Beslenme",
    imageAltEn: "Functional Nutrition",
    serviceSlug: "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi",
  },
];

/** @deprecated — MEGA_MENU_GRID_ITEMS[].key kullanın */
export const REFERENCE_MEGA_GRID_SLUGS = MEGA_MENU_GRID_ITEMS.map((i) => i.key);

export function referenceMenuServiceBySlug(slug: string): ReferenceMenuService | undefined {
  const def = SITE_SERVICES.find((s) => s.slug === slug);
  return def ? toMenuItem(def) : undefined;
}

export function megaMenuGridItemByKey(key: string): MegaMenuGridItemDef | undefined {
  return MEGA_MENU_GRID_ITEMS.find((i) => i.key === key);
}
