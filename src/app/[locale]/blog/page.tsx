import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  CATEGORY_META,
  ARTICLE_CATEGORY_ORDER,
  type ArticleCategory,
} from "@/content/articles";
import { getPublishedBlogPosts } from "@/lib/blog-posts-prisma";
import { ArrowRight, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const TONE_BG: Record<string, string> = {
  sky: "from-[var(--color-sky-100)] to-[var(--color-sky-200)]",
  mint: "from-[var(--color-mint-100)] to-[var(--color-mint-200)]",
  peach: "from-[var(--color-peach-100)] to-[var(--color-peach-200)]",
  cream: "from-[var(--color-cream-200)] to-[var(--color-cream-300)]",
};

function isArticleCategory(s: string): s is ArticleCategory {
  return (ARTICLE_CATEGORY_ORDER as readonly string[]).includes(s);
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.healthCorner");
  const posts = await getPublishedBlogPosts(locale);

  return (
    <>
      <PageHero eyebrow="Blog" title={t("title")} description={t("subtitle")} />

      <Section>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((p, idx) => {
              const cat = isArticleCategory(p.category)
                ? CATEGORY_META[p.category]
                : CATEGORY_META.saglik;
              return (
                <Reveal key={p.slug} delay={idx * 0.02}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-[var(--color-ink-100)] hover:border-[var(--color-primary)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all"
                  >
                    <div
                      className={`relative aspect-[16/10] bg-gradient-to-br ${TONE_BG[cat.tone]} overflow-hidden`}
                    >
                      {p.coverImage?.trim() ? (
                        p.coverImage.trim().startsWith("/") ? (
                          <Image
                            src={p.coverImage.trim()}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 33vw, 50vw"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.coverImage.trim()}
                            alt={p.title}
                            className="absolute inset-0 size-full object-cover"
                          />
                        )
                      ) : null}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="font-display text-base font-semibold leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-2 text-sm text-[var(--color-ink-700)] line-clamp-2 flex-1">
                        {p.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {p.minRead} dk
                        </span>
                        <ArrowRight className="size-3.5 text-[var(--color-primary)]" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
