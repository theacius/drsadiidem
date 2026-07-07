/**
 * Bebek ve Çocuk kategorileri — etiket tonları ve yerelleştirme.
 * Konu başlıkları ve liste içeriği yalnızca veritabanındaki Post kayıtlarından gelir.
 */

export type ArticleCategory =
  | "saglik"
  | "beslenme"
  | "uyku"
  | "gelisim"
  | "asi"
  | "davranis";

/** Üst gezinme ve Bebek ve Çocuk sayfası blok sırası — tek kaynak. */
export const ARTICLE_CATEGORY_ORDER: ArticleCategory[] = [
  "saglik",
  "beslenme",
  "uyku",
  "gelisim",
  "asi",
  "davranis",
];

export const CATEGORY_META: Record<
  ArticleCategory,
  {
    label: string;
    /** İngilizce menü / yerelleştirme */
    labelEn: string;
    /** Üst menü açılır liste alt satırı (kısa) */
    descriptionTr: string;
    descriptionEn: string;
    tone: "sky" | "mint" | "peach" | "cream";
  }
> = {
  saglik: {
    label: "Sağlık",
    labelEn: "Health",
    descriptionTr: "Ateş, enfeksiyonlar ve günlük çocuk sağlığı rehberleri.",
    descriptionEn: "Fever, infections, and everyday child health guides.",
    tone: "sky",
  },
  beslenme: {
    label: "Beslenme",
    labelEn: "Nutrition",
    descriptionTr: "Ek gıda, emzirme, sıvı ihtiyacı ve seçici yeme.",
    descriptionEn: "Solids, breastfeeding, fluids, and picky eating.",
    tone: "peach",
  },
  uyku: {
    label: "Uyku",
    labelEn: "Sleep",
    descriptionTr: "Uyku düzeni, gece uyanmaları ve güvenli alışkanlıklar.",
    descriptionEn: "Sleep routines, night waking, and safe habits.",
    tone: "mint",
  },
  gelisim: {
    label: "Gelişim",
    labelEn: "Development",
    descriptionTr: "Büyüme, gelişim dönemleri ve gelişimsel konular.",
    descriptionEn: "Growth, developmental stages, and milestones.",
    tone: "sky",
  },
  asi: {
    label: "Aşı",
    labelEn: "Immunization",
    descriptionTr: "Aşı takvimi, güvenlik ve bağışıklama hakkında bilgiler.",
    descriptionEn: "Schedule, safety, and what to expect.",
    tone: "mint",
  },
  davranis: {
    label: "Davranış",
    labelEn: "Behavior",
    descriptionTr: "Aile içi ilişkiler, davranış ve duygusal gelişim.",
    descriptionEn: "Family dynamics, behavior, and emotional development.",
    tone: "cream",
  },
};
