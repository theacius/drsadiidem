import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPageReference } from "@/components/sections/AboutPageReference";
import { getResolvedSiteContent } from "@/lib/site-content";
import { loadKlinikGalleryPhotos } from "@/lib/site-gallery";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const c = await getResolvedSiteContent(locale);
  return {
    title: `${t("hakkimda")} — ${c.aboutPage.heroTitle}`,
    description: c.aboutPage.heroLead,
  };
}

async function loadGalleryImages(locale: string) {
  const fallback = [
    { src: "/uploads/gallery/klinik-giris-tabela.png", alt: "Muayenehane girişi" },
    { src: "/uploads/gallery/klinik-resepsiyon-bekleme.png", alt: "Resepsiyon ve bekleme alanı" },
    { src: "/uploads/gallery/klinik-bekleme-alani.png", alt: "Bekleme alanı" },
  ];

  try {
    const photos = await loadKlinikGalleryPhotos();
    if (photos.length < 1) return fallback;
    return photos.slice(0, 3).map((p) => ({
      src: p.imageUrl,
      alt: (locale === "tr" ? p.altTr : p.altEn) ?? p.altTr ?? "Klinik",
    }));
  } catch {
    return fallback;
  }
}

export default async function HakkimdaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [content, galleryImages] = await Promise.all([
    getResolvedSiteContent(locale),
    loadGalleryImages(locale),
  ]);

  return (
    <AboutPageReference
      content={content.aboutPage}
      portrait={content.portrait}
      galleryImages={galleryImages}
    />
  );
}
