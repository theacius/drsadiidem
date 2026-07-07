import { fullServiceContentEn, fullServiceContentTr } from "@/content/service-page-bodies";

/**
 * Hizmet alanları — referans: dryesimcinaryakar.com
 * (Eskişehir · Uzm. Dr. Şadi İdem)
 */
export type SiteServiceDef = {
  slug: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  contentTr?: string;
  contentEn?: string;
  imageUrl: string;
  icon: string;
  order: number;
};

export const SITE_SERVICES: readonly SiteServiceDef[] = [
  {
    slug: "saglikli-cocuk-muayenesi-ve-izlemi",
    titleTr: "Sağlıklı Çocuk Muayenesi ve İzlemi",
    titleEn: "Well-Child Exams & Monitoring",
    descriptionTr:
      "Çocuğun büyüme ve gelişiminin, yaşına uygun aralıklarla değerlendirilmesini kapsayan koruyucu hekimlik yaklaşımı.",
    descriptionEn:
      "Preventive care with age-appropriate growth and development assessments.",
    contentTr: fullServiceContentTr("saglikli-cocuk-muayenesi-ve-izlemi"),
    contentEn: fullServiceContentEn("saglikli-cocuk-muayenesi-ve-izlemi"),
    imageUrl: "/carousel/yurutec.jpg",
    icon: "Activity",
    order: 0,
  },
  {
    slug: "yenidogan-takibi",
    titleTr: "Yenidoğan ve Prematüre Takibi",
    titleEn: "Newborn & Preterm Follow-up",
    descriptionTr:
      "Yenidoğan döneminde ve prematüre bebeklerde gelişimin düzenli hekim değerlendirmesi ile izlenmesi.",
    descriptionEn:
      "Regular physician-led follow-up for newborns and preterm infants.",
    contentTr: fullServiceContentTr("yenidogan-takibi"),
    contentEn: fullServiceContentEn("yenidogan-takibi"),
    imageUrl: "/carousel/anne-sutu-emzirme.jpg",
    icon: "Shield",
    order: 1,
  },
  {
    slug: "cocuk-hastaliklarinin-klinik-degerlendirilmesi",
    titleTr: "Çocuk Hastalıklarının Klinik Değerlendirilmesi",
    titleEn: "Clinical Assessment of Childhood Illness",
    descriptionTr:
      "Çocukluk döneminde karşılaşılan sağlık sorunlarının, hekim muayenesi ve klinik değerlendirme süreci ile ele alınması.",
    descriptionEn:
      "Examination and clinical assessment for common childhood health concerns.",
    contentTr: fullServiceContentTr("cocuk-hastaliklarinin-klinik-degerlendirilmesi"),
    contentEn: fullServiceContentEn("cocuk-hastaliklarinin-klinik-degerlendirilmesi"),
    imageUrl: "/carousel/atesli-cocuga-yaklasim.jpg",
    icon: "Stethoscope",
    order: 2,
  },
  {
    slug: "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi",
    titleTr: "Fonksiyonel Beslenme ve Fonksiyonel Tıp Yaklaşımı",
    titleEn: "Functional Nutrition & Medicine Approach",
    descriptionTr:
      "Beslenme düzeni ve günlük yaşam alışkanlıklarının, hekim değerlendirmesini destekleyen bütüncül bir bakış açısıyla ele alınması.",
    descriptionEn:
      "Holistic look at nutrition and daily habits alongside clinical care.",
    contentTr: fullServiceContentTr("fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi"),
    contentEn: fullServiceContentEn("fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi"),
    imageUrl: "/carousel/tamamlayici-beslenme.jpg",
    icon: "Leaf",
    order: 3,
  },
] as const;

export const SITE_SERVICE_SLUGS = SITE_SERVICES.map((s) => s.slug);

/** Mega menü öne çıkan metin — ilk hizmet kartı */
export const MEGA_MENU_FEATURED_BODY_TR =
  "Çocuğunuzun büyüme ve gelişiminin yaşa uygun aralıklarla değerlendirildiği, koruyucu hekimlik odaklı düzenli takip programı.";

export const MEGA_MENU_FEATURED_BODY_EN =
  "A preventive, well-child follow-up program with age-appropriate growth and development reviews.";

export function serviceHref(slug: string): `/hizmet-alanlarimiz/${string}` {
  return `/hizmet-alanlarimiz/${slug}`;
}

export function siteServiceBySlug(slug: string): SiteServiceDef | undefined {
  return SITE_SERVICES.find((s) => s.slug === slug);
}

/** Eski bilgilendirme konuları → blog */
export const TOPIC_SLUGS_MOVED_TO_BLOG = [
  "aile-ici-iliskiler-ve-cocuk-sagligi",
  "atesli-cocuga-yaklasim",
  "atesli-havale",
  "sik-hastalanan-cocuk",
  "tamamlayici-beslenmenin-ilkeleri",
  "yurutec-faydali-mi-zararli-mi",
  "anne-sutu-ve-emzirme",
  "istahsiz-cocuk-ve-yemek-secme",
  "cocugumuz-ne-kadar-su-tuketmeli",
  "bebeklerde-uyku-sorunu",
  "uyku-egitimi-nasil-verebilirim",
  "cocuga-asi-yaptirmali-miyim",
  "gelisim-degerlendirmesi",
  "hastalik-muayenesi",
  "alerji-astim",
  "asi-takvimi",
  "ebeveyn-atolyesi",
] as const;

export const LEGACY_REFERENCE_SERVICE_REDIRECTS: Record<string, string> = {
  "yenidogan-ve-premature-takibi": "yenidogan-takibi",
  "saglikli-cocuk-izlenimi": "saglikli-cocuk-muayenesi-ve-izlemi",
  "gelisim-degerlendirmesi": "saglikli-cocuk-muayenesi-ve-izlemi",
  "hastalik-muayenesi": "cocuk-hastaliklarinin-klinik-degerlendirilmesi",
  "fonksiyonel-beslenme": "fonksiyonel-beslenme-ve-fonksiyonel-tip-yaklasimi",
  "uyku-danismanligi": "bebeklerde-uyku-sorunu",
  "emzirme-danismanligi": "anne-sutu-ve-emzirme",
  "asi-takvimi": "cocuga-asi-yaptirmali-miyim",
  "ebeveyn-atolyesi": "aile-ici-iliskiler-ve-cocuk-sagligi",
  "alerji-astim": "sik-hastalanan-cocuk",
  ...Object.fromEntries(TOPIC_SLUGS_MOVED_TO_BLOG.map((s) => [s, s])),
};

/** @deprecated */
export type ReferenceServiceDef = SiteServiceDef;
export const REFERENCE_SERVICES = SITE_SERVICES;
export const REFERENCE_SERVICE_SLUGS = SITE_SERVICE_SLUGS;
export const referenceServiceHref = serviceHref;
