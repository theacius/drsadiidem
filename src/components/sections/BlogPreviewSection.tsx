import { getPublishedBlogPosts } from "@/lib/blog-posts-prisma";
import { BlogPreview } from "@/components/sections/BlogPreview";

const PROMOTED_SLUGS = [
  "sik-hastalanan-cocuk",
  "yurutec-faydali-mi-zararli-mi",
  "aile-ici-iliskiler-ve-cocuk-sagligi",
];

export async function BlogPreviewSection({
  locale,
  blogBasePath = "/blog",
  embedded = false,
}: {
  locale: string;
  blogBasePath?: string;
  embedded?: boolean;
}) {
  const merged = await getPublishedBlogPosts(locale);
  const promoted = PROMOTED_SLUGS.map((slug) => merged.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => p != null,
  );
  const posts = promoted.length > 0 ? promoted : merged.slice(0, 3);
  return <BlogPreview posts={posts} blogBasePath={blogBasePath} embedded={embedded} />;
}
