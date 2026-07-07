import {
  MEGA_MENU_GRID_ITEMS,
  megaMenuGridItemByKey,
  referenceMenuServiceBySlug,
} from "@/content/reference-menu-services";
import { siteServiceBySlug } from "@/content/site-services";

export const MEGA_MENU_PRIMARY_SERVICE_SLUGS = MEGA_MENU_GRID_ITEMS.map((i) => i.key);

export type MegaMenuImageDef = {
  src: string;
  altTr: string;
  altEn: string;
};

export const MEGA_MENU_SERVICE_IMAGES: Record<string, MegaMenuImageDef> =
  Object.fromEntries(
    MEGA_MENU_GRID_ITEMS.map((item) => [
      item.key,
      {
        src: item.imageSrc,
        altTr: item.imageAltTr,
        altEn: item.imageAltEn,
      },
    ]),
  );

export type MegaMenuSidebarLinkDef = {
  href: string;
  labelTr: string;
  labelEn: string;
};

/** Referans mega menü sol sütun — Uzm. Dr. Şadi İdem / Eskişehir */
export const MEGA_MENU_SIDEBAR_LINKS: readonly MegaMenuSidebarLinkDef[] = [
  {
    href: "/hakkimda",
    labelTr: "Uzm. Dr. Şadi İdem",
    labelEn: "Dr. Şadi İdem",
  },
  {
    href: "/hizmet-alanlarimiz/saglikli-cocuk-muayenesi-ve-izlemi",
    labelTr: "Sağlıklı Çocuk Muayenesi ve İzlemi",
    labelEn: "Well-Child Exams",
  },
  {
    href: "/hizmet-alanlarimiz/yenidogan-takibi",
    labelTr: "Yenidoğan ve Prematüre Takibi",
    labelEn: "Newborn & Preterm Follow-up",
  },
  {
    href: "/fonksiyonel-tip",
    labelTr: "Fonksiyonel Tıp",
    labelEn: "Functional Medicine",
  },
  {
    href: "/fonksiyonel-tip?tab=beslenme",
    labelTr: "Fonksiyonel Beslenme",
    labelEn: "Functional Nutrition",
  },
];

export function megaMenuImageForSlug(slug: string, _locale: string): MegaMenuImageDef {
  const def = MEGA_MENU_SERVICE_IMAGES[slug];
  if (def) return def;
  const item = megaMenuGridItemByKey(slug);
  const svc = siteServiceBySlug(slug) ?? referenceMenuServiceBySlug(slug);
  const altTr =
    item?.imageAltTr ??
    (svc && "labelTr" in svc ? svc.labelTr : svc?.titleTr) ??
    "Hizmet";
  const altEn =
    item?.imageAltEn ??
    (svc && "labelEn" in svc ? svc.labelEn : svc?.titleEn) ??
    "Service";
  return {
    src: item?.imageSrc ?? siteServiceBySlug(slug)?.imageUrl ?? "/carousel/yurutec.jpg",
    altTr,
    altEn,
  };
}

export function megaMenuImageAlt(def: MegaMenuImageDef, locale: string): string {
  return locale === "tr" ? def.altTr : def.altEn;
}
