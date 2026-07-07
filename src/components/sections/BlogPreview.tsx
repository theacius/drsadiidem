"use client";

import { useTranslations, useMessages } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORY_META } from "@/content/articles";
import type { BlogCardData } from "@/lib/blog-posts-prisma";
import { ArrowRight, Clock } from "lucide-react";

const TONE_BG: Record<string, string> = {
  sky: "from-[var(--color-sky-100)] to-[var(--color-sky-200)]",
  mint: "from-[var(--color-mint-100)] to-[var(--color-mint-200)]",
  peach: "from-[var(--color-peach-100)] to-[var(--color-peach-200)]",
  cream: "from-[var(--color-cream-200)] to-[var(--color-cream-300)]",
};

type Props = {
  posts?: BlogCardData[] | null;
  blogBasePath?: string;
  /** Sağlık Köşesi gibi üst başlığı dışarıdan verilen yerleşimler */
  embedded?: boolean;
};

export function BlogPreview({ posts, blogBasePath = "/blog", embedded = false }: Props) {
  const list = posts ?? [];
  const t = useTranslations("blog");
  const tCat = useTranslations("topics.categories");
  const messages = useMessages() as {
    topics?: {
      articleTitles?: Record<string, string>;
      articleExcerpts?: Record<string, string>;
    };
  };
  const titles = messages.topics?.articleTitles;
  const excerpts = messages.topics?.articleExcerpts;

  const grid = (
    <>
        <div className={embedded ? "grid gap-6 md:grid-cols-3" : "mt-10 grid gap-6 md:grid-cols-3"}>
          {list.map((p, idx) => {
            const cat = CATEGORY_META[p.category];
            const title = titles?.[p.slug] ?? p.title;
            const excerpt = excerpts?.[p.slug] ?? p.excerpt;
            return (
              <Reveal key={p.slug} delay={idx * 0.08}>
                <Link
                  href={`${blogBasePath}/${p.slug}` as `/blog/${string}`}
                  className="group block rounded-3xl overflow-hidden bg-white border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`relative aspect-[16/10] bg-gradient-to-br ${TONE_BG[cat.tone]} overflow-hidden`}
                  >
                    {p.coverImage?.trim() ? (
                      p.coverImage.trim().startsWith("/") ? (
                        <Image
                          src={p.coverImage.trim()}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                          quality={88}
                          priority={idx === 0}
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.coverImage.trim()}
                          alt={title}
                          className="absolute inset-0 size-full object-cover"
                        />
                      )
                    ) : (
                      <PostIllustration tone={cat.tone} />
                    )}
                    <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-[var(--color-ink-800)]">
                      {tCat(p.category)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-[var(--color-sky-600)] transition-colors text-pretty">
                      {title}
                    </h3>
                    <p className="mt-2 text-[var(--color-ink-700)] text-sm leading-relaxed text-pretty line-clamp-3">
                      {excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {p.minRead} {t("minRead")}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[var(--color-primary)] font-medium">
                        {t("readMore")}
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href={blogBasePath as "/blog"}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
    </>
  );

  if (embedded) {
    return <Container className="pb-14 sm:pb-16">{grid}</Container>;
  }

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>{t("sectionEyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-3 text-[var(--color-ink-700)] text-lg text-pretty">
                {t("subtitle")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href={blogBasePath as "/blog"}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:gap-2.5 transition-all"
            >
              {t("viewAll")}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        {grid}
      </Container>
    </Section>
  );
}

function PostIllustration({ tone }: { tone: string }) {
  const fill =
    tone === "sky"
      ? "var(--color-sky-300)"
      : tone === "mint"
        ? "var(--color-mint-300)"
        : tone === "peach"
          ? "var(--color-peach-300)"
          : "var(--color-cream-300)";
  const accent =
    tone === "sky"
      ? "var(--color-peach-300)"
      : tone === "mint"
        ? "var(--color-sky-300)"
        : tone === "peach"
          ? "var(--color-mint-300)"
          : "var(--color-sky-300)";
  return (
    <svg
      viewBox="0 0 320 200"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <circle cx="60" cy="60" r="44" fill={fill} opacity="0.6" className="float-slow" />
      <circle cx="260" cy="140" r="58" fill={accent} opacity="0.5" className="float-slower" />
      <path d="M0 170 Q 80 120 160 150 T 320 140 L 320 200 L 0 200 Z" fill="white" opacity="0.45" />
      <circle cx="200" cy="70" r="10" fill="white" opacity="0.7" />
      <circle cx="220" cy="60" r="6" fill="white" opacity="0.5" />
    </svg>
  );
}
