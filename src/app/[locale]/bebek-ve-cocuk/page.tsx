import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  ARTICLE_CATEGORY_ORDER,
  CATEGORY_META,
} from "@/content/articles";
import { getPublishedBlogPosts } from "@/lib/blog-posts-prisma";
import { ArrowUpRight, Clock } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const TONE_BADGE: Record<string, string> = {
  sky: "bg-[var(--color-sky-100)] text-[var(--color-sky-500)]",
  mint: "bg-[var(--color-mint-100)] text-[var(--color-mint-400)]",
  peach: "bg-[var(--color-peach-100)] text-[var(--color-peach-400)]",
  cream: "bg-[var(--color-cream-200)] text-[var(--color-ink-700)]",
};

const TONE_HOVER: Record<string, string> = {
  sky: "hover:bg-[var(--color-sky-50)]",
  mint: "hover:bg-[var(--color-mint-100)]",
  peach: "hover:bg-[var(--color-peach-100)]",
  cream: "hover:bg-[var(--color-cream-100)]",
};

const TONE_GRAD: Record<string, string> = {
  sky: "from-[var(--color-sky-100)] to-[var(--color-sky-200)]",
  mint: "from-[var(--color-mint-100)] to-[var(--color-mint-200)]",
  peach: "from-[var(--color-peach-100)] to-[var(--color-peach-200)]",
  cream: "from-[var(--color-cream-100)] to-[var(--color-cream-200)]",
};

function CardThumb({
  coverImage,
  title,
  tone,
}: {
  coverImage: string | null | undefined;
  title: string;
  tone: string;
}) {
  const grad = `relative h-28 shrink-0 bg-gradient-to-br ${TONE_GRAD[tone]} overflow-hidden`;
  if (coverImage?.trim()) {
    const s = coverImage.trim();
    if (s.startsWith("/")) {
      return (
        <div className={grad}>
          <Image
            src={s}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
            quality={88}
          />
        </div>
      );
    }
    return (
      <div className={grad}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s} alt={title} className="absolute inset-0 size-full object-cover" />
      </div>
    );
  }
  return <div className={grad} aria-hidden />;
}

export default async function BebekVeCocukPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCat = await getTranslations({ locale, namespace: "topics.categories" });

  const posts = await getPublishedBlogPosts(locale);

  const grouped: Record<string, typeof posts> = {};
  for (const cat of ARTICLE_CATEGORY_ORDER) {
    grouped[cat] = posts.filter((p) => p.category === cat);
  }

  return (
    <>
      <PageHero
        eyebrow="Bebek ve Çocuk"
        title="Çocuğunuzla ilgili merak ettiğiniz her şey"
        description="Konular yalnızca yönetim panelinde yayınladığınız yazılardan oluşur; başlık, özet, kapak ve metin tamamen panelden yönetilir."
      />

      <Section>
        <Container>
          <div className="flex flex-wrap justify-end gap-4 mb-8">
            <Link
              href="/haberler"
              className="text-sm font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              Tüm haberler →
            </Link>
          </div>

          {ARTICLE_CATEGORY_ORDER.map((cat) => {
            const list = grouped[cat];
            if (!list?.length) return null;
            const meta = CATEGORY_META[cat];
            const catTitle = tCat(cat);
            return (
              <div
                key={cat}
                id={`kategori-${cat}`}
                className="mb-14 scroll-mt-[7.5rem] last:mb-0 md:scroll-mt-[8.25rem]"
              >
                <Reveal>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${TONE_BADGE[meta.tone]}`}
                      >
                        {catTitle}
                      </span>
                      <h2 className="font-display text-2xl font-semibold">{catTitle}</h2>
                    </div>
                    <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[var(--color-muted)]">
                      {locale === "tr" ? meta.descriptionTr : meta.descriptionEn}
                    </p>
                  </div>
                </Reveal>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((a, idx) => (
                    <Reveal key={a.slug} delay={idx * 0.03}>
                      <Link
                        href={`/bebek-ve-cocuk/${a.slug}`}
                        className={`group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] hover:shadow-[var(--shadow-soft)] transition-all ${TONE_HOVER[meta.tone]}`}
                      >
                        <CardThumb coverImage={a.coverImage} title={a.title} tone={meta.tone} />
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-display text-base font-semibold leading-snug text-pretty group-hover:text-[var(--color-sky-600)] transition-colors line-clamp-2">
                            {a.title}
                          </h3>
                          <p className="mt-2 text-sm text-[var(--color-ink-700)] leading-relaxed text-pretty line-clamp-2 flex-1">
                            {a.excerpt}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted)]">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="size-3.5" />
                              {a.minRead} dk
                            </span>
                            <ArrowUpRight className="size-4 text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}

        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
