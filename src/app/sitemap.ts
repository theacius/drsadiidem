import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { SITE_SERVICE_SLUGS } from "@/content/site-services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadiidem.com.tr";

const TR_STATIC = [
  "",
  "/hakkimda",
  "/hizmet-alanlarimiz",
  "/fonksiyonel-tip",
  "/saglikli-cocuk-izlenimi",
  "/galeri",
  "/galeri/foto",
  "/galeri/video",
  "/blog",
  "/iletisim",
  ...SITE_SERVICE_SLUGS.map((s) => `/hizmet-alanlarimiz/${s}`),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, locale: true, updatedAt: true },
    });
    articleEntries = posts
      .filter((p) => p.locale === "tr")
      .map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      }));
  } catch {
    /* DB yok */
  }

  return [
    ...TR_STATIC.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : p.startsWith("/hizmet-alanlarimiz/") ? 0.7 : 0.8,
    })),
    ...articleEntries,
  ];
}
