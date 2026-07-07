import { getPublishedBlogPosts } from "@/lib/blog-posts-prisma";
import { Topics } from "@/components/sections/Topics";

export async function TopicsSection({ locale }: { locale: string }) {
  const posts = await getPublishedBlogPosts(locale);
  return <Topics posts={posts.slice(0, 6)} />;
}
