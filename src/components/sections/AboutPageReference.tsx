import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import {
  GraduationCap,
  BookOpen,
  Heart,
  Smile,
  type LucideIcon,
} from "lucide-react";
import type { ResolvedSiteContent } from "@/lib/site-content";

const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  book: BookOpen,
  heart: Heart,
  smile: Smile,
};

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-[var(--color-ink-900)]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="about-ref-heading font-display text-[1.65rem] sm:text-[1.85rem] font-bold text-[var(--color-ink-900)] tracking-tight">
      {children}
    </h2>
  );
}

type GalleryImage = { src: string; alt: string };

type Props = {
  content: ResolvedSiteContent["aboutPage"];
  portrait: ResolvedSiteContent["portrait"];
  galleryImages: GalleryImage[];
};

export function AboutPageReference({ content, portrait, galleryImages }: Props) {
  return (
    <article className="about-ref-page bg-white">
      <section className="about-ref-hero border-b border-[var(--color-ink-100)]/80">
        <Container className="py-10 sm:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1 space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                {content.heroEyebrow}
              </p>
              <h1 className="font-display text-[2rem] sm:text-[2.35rem] lg:text-[2.5rem] font-bold leading-[1.15] text-[var(--color-ink-900)]">
                {content.heroTitle}
              </h1>
              <p className="text-[15px] sm:text-base leading-[1.75] text-[var(--color-ink-700)] text-pretty">
                {content.heroLead}
              </p>
              {content.heroLead2 ? (
                <p className="text-[15px] sm:text-base leading-[1.75] text-[var(--color-ink-700)] text-pretty">
                  {content.heroLead2}
                </p>
              ) : null}
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[6px] overflow-hidden bg-[var(--color-cream-100)] shadow-[0_8px_32px_rgba(30,41,59,0.1)]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {galleryImages.length > 0 ? (
        <section className="border-b border-[var(--color-ink-100)]/60 bg-[var(--color-cream-50)]/40">
          <Container className="py-8 sm:py-10">
            <h2 className="about-ref-heading font-display text-[1.35rem] sm:text-[1.5rem] font-bold text-[var(--color-ink-900)] tracking-tight">
              {content.clinicGalleryTitle}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.slice(0, 3).map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[var(--color-cream-100)] shadow-[0_4px_18px_rgba(30,41,59,0.06)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-[var(--color-ink-100)]/60">
        <Container className="py-10 sm:py-14">
          <SectionHeading>{content.aboutSectionTitle}</SectionHeading>
          <p className="mt-5 max-w-4xl text-[15px] sm:text-base leading-[1.8] text-[var(--color-ink-700)] text-pretty">
            {content.aboutIntro}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="about-ref-card">
              <h3 className="font-display text-lg font-bold text-[var(--color-ink-900)]">
                {content.educationTitle}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-[var(--color-ink-700)]">
                {content.educationParagraphs.map((para, idx) => (
                  <p key={idx}>
                    <RichText text={para} />
                  </p>
                ))}
              </div>
            </div>
            <div className="about-ref-card">
              <h3 className="font-display text-lg font-bold text-[var(--color-ink-900)]">
                {content.experienceTitle}
              </h3>
              <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-[var(--color-ink-700)]">
                {content.experienceParagraphs.map((para, idx) => (
                  <p key={idx}>
                    <RichText text={para} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-ink-100)]/60 bg-[var(--color-cream-50)]/50">
        <Container className="py-10 sm:py-14">
          <SectionHeading>{content.clinicalTitle}</SectionHeading>
          <div className="mt-5 max-w-4xl space-y-4 text-[15px] sm:text-base leading-[1.8] text-[var(--color-ink-700)]">
            {content.clinicalParagraphs.map((para, idx) => (
              <p key={idx} className="text-pretty">
                <RichText text={para} />
              </p>
            ))}
          </div>
          {content.clinicalLinks.length > 0 ? (
            <div className="about-ref-link-box mt-8">
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {content.clinicalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="about-ref-pill-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="border-b border-[var(--color-ink-100)]/60">
        <Container className="py-10 sm:py-14">
          <SectionHeading>{content.familyTitle}</SectionHeading>
          <div className="mt-5 max-w-4xl space-y-4 text-[15px] sm:text-base leading-[1.8] text-[var(--color-ink-700)]">
            {content.familyParagraphs.map((para, idx) => (
              <p key={idx} className="text-pretty">
                {para}
              </p>
            ))}
          </div>
          <div className="about-ref-link-box mt-8">
            <Link
              href={content.familyCtaHref}
              className="about-ref-pill-link about-ref-pill-link--cta"
            >
              {content.familyCtaLabel}
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[var(--color-ink-100)]/60">
        <Container className="py-6 sm:py-8">
          <p className="text-center text-sm text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed">
            {content.disclaimer}
          </p>
        </Container>
      </section>

      <section className="about-ref-highlights relative overflow-hidden">
        <Container className="relative py-12 sm:py-16">
          <ul className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.highlights.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.icon] ?? Heart;
              return (
                <li key={item.id} className="flex flex-col items-center text-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-full text-[var(--color-primary)]">
                    <Icon className="size-9 stroke-[1.35]" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-sm sm:text-[0.95rem] font-bold uppercase tracking-wide text-[var(--color-ink-900)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed max-w-[220px]">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </article>
  );
}
