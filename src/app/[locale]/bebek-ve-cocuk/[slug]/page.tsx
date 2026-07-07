import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  ARTICLE_CATEGORY_ORDER,
  CATEGORY_META,
  type ArticleCategory,
} from "@/content/articles";
import {
  getDbPostBySlug,
  getRelatedPublishedPosts,
} from "@/lib/blog-posts-prisma";
import { prisma } from "@/lib/db";
import { sanitizePostHtml } from "@/lib/post-html";
import { ArrowLeft, ArrowRight, Clock, ArrowUpRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    const unique = [...new Set(rows.map((r) => r.slug))];
    return unique.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const dbPost = await getDbPostBySlug(locale, slug);
  if (!dbPost?.published) {
    return { title: "Yazı bulunamadı" };
  }
  const title = dbPost.title;
  const description = dbPost.excerpt ?? "";
  return { title, description };
}

function isArticleCategory(s: string): s is ArticleCategory {
  return (ARTICLE_CATEGORY_ORDER as readonly string[]).includes(s);
}

const TONE_BADGE: Record<string, string> = {
  sky: "bg-[var(--color-sky-100)] text-[var(--color-sky-500)]",
  mint: "bg-[var(--color-mint-100)] text-[var(--color-mint-400)]",
  peach: "bg-[var(--color-peach-100)] text-[var(--color-peach-400)]",
  cream: "bg-[var(--color-cream-200)] text-[var(--color-ink-700)]",
};

const TONE_GRADIENT: Record<string, string> = {
  sky: "from-[var(--color-sky-100)] to-[var(--color-sky-200)]",
  mint: "from-[var(--color-mint-100)] to-[var(--color-mint-200)]",
  peach: "from-[var(--color-peach-100)] to-[var(--color-peach-200)]",
  cream: "from-[var(--color-cream-200)] to-[var(--color-cream-300)]",
};

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const dbPost = await getDbPostBySlug(locale, slug);

  if (!dbPost?.published) notFound();

  const t = await getTranslations("blog");

  const title = dbPost.title;
  const excerpt = dbPost.excerpt ?? "";
  const categoryKey: ArticleCategory =
    dbPost.category?.slug && isArticleCategory(dbPost.category.slug)
      ? dbPost.category.slug
      : "saglik";
  const cat = CATEGORY_META[categoryKey];
  const minRead = dbPost.readMinutes ?? 5;
  const related = await getRelatedPublishedPosts(locale, slug, 3);

  const showDbBody = !!dbPost.content?.trim();

  return (
    <article>
      <section className={`relative overflow-hidden bg-gradient-to-br ${TONE_GRADIENT[cat.tone]}`}>
        <Container className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-3xl">
          <Reveal>
            <Link
              href="/bebek-ve-cocuk"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] transition-colors"
            >
              <ArrowLeft className="size-4" />
              Bebek ve Çocuk
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <span
              className={`mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${TONE_BADGE[cat.tone]}`}
            >
              {cat.label}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] text-balance">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg text-[var(--color-ink-700)] text-pretty">{excerpt}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex items-center gap-4 text-sm text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {minRead} {t("minRead")}
              </span>
              <span>·</span>
              <span>Dr. Şadi İdem</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl">
          <TracingBeam>
            {showDbBody ? (
              <Reveal>
                <div
                  className="prose-content text-[var(--color-ink-800)] leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{
                    __html: sanitizePostHtml(dbPost.content),
                  }}
                />
              </Reveal>
            ) : (
              <Reveal>
                <div className="prose-content text-[var(--color-ink-800)] leading-relaxed text-lg space-y-4">
                  {excerpt ? <p className="text-pretty">{excerpt}</p> : null}
                  <p className="text-sm text-[var(--color-muted)] text-pretty">
                    Tam makale gövdesini yönetim panelinden ekleyebilir veya güncelleyebilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/iletisim">
                      <Button size="md">
                        Sorunuz mu var?
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                    <Link href="/bebek-ve-cocuk">
                      <Button variant="outline" size="md">
                        Tüm konular
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}
          </TracingBeam>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section className="bg-[var(--color-cream-50)]">
          <Container className="max-w-5xl">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">İlgili Yazılar</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {related.map((r, idx) => {
                const rcat = CATEGORY_META[r.category];
                return (
                  <Reveal key={r.slug} delay={idx * 0.06}>
                    <Link
                      href={`/bebek-ve-cocuk/${r.slug}`}
                      className="group flex flex-col h-full rounded-2xl bg-white p-5 border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] hover:shadow-[var(--shadow-soft)] transition-all"
                    >
                      <span
                        className={`inline-flex self-start items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider ${TONE_BADGE[rcat.tone]}`}
                      >
                        {rcat.label}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-pretty group-hover:text-[var(--color-sky-600)] transition-colors">
                        {r.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]">
                        Detay
                        <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      <CTABanner />
    </article>
  );
}
