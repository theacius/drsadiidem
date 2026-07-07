"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import type { PressMarqueeDTO } from "@/lib/press-marquee";

type Props = { items: PressMarqueeDTO[] };

export function PressMarquee({ items }: Props) {
  const t = useTranslations("press");

  if (!items.length) {
    return (
      <Section spacing="md" className="bg-white border-y border-[var(--color-ink-100)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto py-8">
            <Eyebrow className="bg-[var(--color-peach-100)] text-[var(--color-peach-400)]">
              {t("eyebrow")}
            </Eyebrow>
            <h2 className="mt-4 font-display text-2xl font-semibold">{t("title")}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Bu alanda henüz görüntülenecek basın kaydı yok.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  const doubled = [...items, ...items];

  return (
    <Section spacing="md" className="bg-white border-y border-[var(--color-ink-100)]">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal>
            <Eyebrow className="bg-[var(--color-peach-100)] text-[var(--color-peach-400)]">
              {t("eyebrow")}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-balance">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-2 text-[var(--color-muted)] text-pretty">{t("subtitle")}</p>
          </Reveal>
        </div>
      </Container>

      <Marquee speed={28} fadeEdges>
        {doubled.map((item, idx) => (
          <figure
            key={`${item.id}-${idx}`}
            className="relative h-[11rem] w-[min(85vw,17rem)] shrink-0 overflow-hidden rounded-2xl border border-[var(--color-ink-100)] bg-[var(--color-cream-50)] shadow-[var(--shadow-soft)] sm:h-[12.5rem] sm:w-[18.5rem]"
          >
            <CoverFigure src={item.imageUrl} label={item.label} />
            <figcaption className="pointer-events-none absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-8 text-center text-[0.65rem] font-semibold uppercase tracking-wide text-white">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </Section>
  );
}

function CoverFigure({ src, label }: { src: string; label: string }) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={label} fill className="object-contain object-center p-2" sizes="300px" />;
  }
  return (
    // Harici URL — panelden yapıştırılan adresler
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label} className="absolute inset-0 size-full object-contain object-center p-2" />
  );
}
