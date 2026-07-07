"use client";

import Image from "next/image";
import { useTranslations, useMessages } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { CATEGORY_META } from "@/content/articles";
import type { BlogCardData } from "@/lib/blog-posts-prisma";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

const TONE_RING: Record<string, string> = {
  sky: "bg-[var(--color-sky-100)] text-[var(--color-sky-500)]",
  mint: "bg-[var(--color-mint-100)] text-[var(--color-mint-400)]",
  peach: "bg-[var(--color-peach-100)] text-[var(--color-peach-400)]",
  cream: "bg-[var(--color-cream-200)] text-[var(--color-ink-700)]",
};
const TONE_GRADIENT: Record<string, string> = {
  sky: "from-[var(--color-sky-100)] to-[var(--color-sky-200)]",
  mint: "from-[var(--color-mint-100)] to-[var(--color-mint-200)]",
  peach: "from-[var(--color-peach-100)] to-[var(--color-peach-200)]",
  cream: "from-[var(--color-cream-100)] to-[var(--color-cream-200)]",
};

type Props = { posts?: BlogCardData[] | null };

export function Topics({ posts }: Props) {
  const list = posts ?? [];
  const t = useTranslations("topics");
  const tCat = useTranslations("topics.categories");
  const messages = useMessages() as {
    topics?: {
      articleTitles?: Record<string, string>;
      articleExcerpts?: Record<string, string>;
    };
  };
  const titles = messages.topics?.articleTitles;
  const excerpts = messages.topics?.articleExcerpts;

  return (
    <Section spacing="lg" className="bg-[var(--color-cream-50)]">
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
              href="/haberler"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] link-underline"
            >
              {t("viewAll")}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, idx) => {
            const cat = CATEGORY_META[a.category];
            const title = titles?.[a.slug] ?? a.title;
            const excerpt = excerpts?.[a.slug] ?? a.excerpt;
            return (
              <Reveal key={a.slug} delay={idx * 0.05}>
                <TiltCard className="h-full rounded-3xl">
                  <Link
                    href={`/bebek-ve-cocuk/${a.slug}`}
                    className="group flex flex-col h-full rounded-3xl bg-white border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`relative h-32 bg-gradient-to-br ${TONE_GRADIENT[cat.tone]} overflow-hidden`}
                    >
                      {a.coverImage?.trim() ? (
                        a.coverImage.trim().startsWith("/") ? (
                          <Image
                            src={a.coverImage.trim()}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                            quality={88}
                            priority={idx < 3}
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.coverImage.trim()}
                            alt=""
                            className="absolute inset-0 size-full object-cover"
                          />
                        )
                      ) : (
                        <TopicGlyph tone={cat.tone} index={idx} />
                      )}
                      <span
                        className={`absolute top-3 left-3 inline-flex items-center rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider bg-white/80 backdrop-blur ${TONE_RING[cat.tone]}`}
                      >
                        {tCat(a.category)}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-semibold leading-snug text-pretty group-hover:text-[var(--color-sky-600)] transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-700)] leading-relaxed text-pretty line-clamp-3 flex-1">
                        {excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between pt-4 border-t border-[var(--color-ink-100)]">
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted)]">
                          <Clock className="size-3" />
                          {a.minRead} {t("minutesSuffix")}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-1.5 transition-all">
                          {t("cardDetail")}
                          <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/haberler"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

const SHAPES = [
  (
    <g key="0">
      <rect x="80" y="40" width="40" height="80" rx="10" fill="white" opacity="0.7" />
      <rect x="86" y="48" width="28" height="14" rx="3" fill="white" />
      <circle cx="100" cy="32" r="8" fill="white" opacity="0.8" />
    </g>
  ),
  (
    <g key="1">
      <path
        d="M100 132 C 60 100 40 70 70 50 C 90 40 100 60 100 60 C 100 60 110 40 130 50 C 160 70 140 100 100 132 Z"
        fill="white"
        opacity="0.85"
      />
    </g>
  ),
  (
    <g key="2">
      <rect x="92" y="20" width="16" height="80" rx="8" fill="white" opacity="0.85" />
      <circle cx="100" cy="108" r="14" fill="white" />
      <circle cx="100" cy="108" r="8" fill="var(--color-peach-300)" />
    </g>
  ),
  (
    <g key="3">
      <path
        d="M100 30 L 116 70 L 158 74 L 126 102 L 136 144 L 100 122 L 64 144 L 74 102 L 42 74 L 84 70 Z"
        fill="white"
        opacity="0.85"
      />
    </g>
  ),
  (
    <g key="4">
      <path
        d="M120 30 A 50 50 0 1 0 120 130 A 40 40 0 1 1 120 30 Z"
        fill="white"
        opacity="0.85"
      />
    </g>
  ),
  (
    <g key="5">
      <rect x="50" y="40" width="100" height="80" rx="6" fill="white" opacity="0.85" />
      <line x1="100" y1="40" x2="100" y2="120" stroke="var(--color-ink-200)" strokeWidth="2" />
      <line x1="60" y1="60" x2="92" y2="60" stroke="var(--color-ink-200)" strokeWidth="2" />
      <line x1="60" y1="74" x2="86" y2="74" stroke="var(--color-ink-200)" strokeWidth="2" />
      <line x1="108" y1="60" x2="140" y2="60" stroke="var(--color-ink-200)" strokeWidth="2" />
      <line x1="108" y1="74" x2="134" y2="74" stroke="var(--color-ink-200)" strokeWidth="2" />
    </g>
  ),
];

function TopicGlyph({ tone, index }: { tone: string; index: number }) {
  void tone;
  return (
    <svg
      viewBox="0 0 200 150"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <circle cx="170" cy="20" r="40" fill="white" opacity="0.25" />
      <circle cx="20" cy="130" r="32" fill="white" opacity="0.18" />
      {SHAPES[index % SHAPES.length]}
    </svg>
  );
}
