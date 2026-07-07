/**
 * Geçmiş site ile uyum için sabitler. Kapak ve basın görselleri artık panelden yüklenir;
 * burada yalnızca varsayılan portre kaynağı tutulur.
 */
export const LEGACY_SITE_ORIGIN = "https://sadiidem.com.tr";

/** Hakkımızda / portre — varsayılan görsel kaynağı (panelden değiştirilebilir) */
export const LEGACY_PORTRAIT_SRC =
  `${LEGACY_SITE_ORIGIN}/tema/genel/uploads/sayfalar/hakkimda.png`;

/** Artık kullanılmıyor — geriye dönük import uyumu için boş dizi. */
export const LEGACY_PRESS_CLIPPINGS: { src: string; label: string }[] = [];

/** Artık kullanılmıyor — kapaklar veritabanında `coverImage` alanından gelir. */
export const LEGACY_BLOG_COVER_BY_SLUG: Record<string, string> = {};
