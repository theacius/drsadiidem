"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { X } from "lucide-react";

export type PhotoSectionPayload = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  isOther?: boolean;
  photos: Array<{
    id: string;
    imageUrl: string;
    caption: string | null;
    alt: string;
  }>;
};

type Props = {
  sections: PhotoSectionPayload[];
};

export function PhotoGallerySections({ sections }: Props) {
  const t = useTranslations("gallery.foto");
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
    caption: string | null;
  } | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close]);

  if (!sections.length) {
    return (
      <p className="text-center text-sm text-[var(--color-muted)]">{t("empty")}</p>
    );
  }

  return (
    <>
      <div className="space-y-14">
        {sections.map((section, sIdx) => (
          <section key={section.id} aria-labelledby={`album-${section.id}`}>
            <Reveal delay={sIdx * 0.04}>
              <div className="mb-6 border-b border-[var(--color-ink-100)]/80 pb-4">
                <h2
                  id={`album-${section.id}`}
                  className="font-display text-2xl font-semibold text-[var(--color-ink-900)]"
                >
                  {section.isOther ? t("otherAlbumTitle") : section.title}
                </h2>
                {section.description ? (
                  <p className="mt-2 max-w-3xl text-[var(--color-ink-700)] text-pretty leading-relaxed">
                    {section.description}
                  </p>
                ) : null}
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {section.photos.map((p, idx) => (
                <Reveal key={p.id} delay={(idx % 4) * 0.05}>
                  <figure className="group overflow-hidden rounded-2xl border border-[var(--color-ink-100)] bg-[var(--color-cream-50)] shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-soft-lg)]">
                    <button
                      type="button"
                      className="relative aspect-square w-full overflow-hidden bg-[var(--color-ink-100)] cursor-zoom-in text-left"
                      onClick={() =>
                        setLightbox({
                          src: p.imageUrl,
                          alt: p.alt || p.caption || "",
                          caption: p.caption,
                        })
                      }
                      aria-label={t("openFullSize")}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl}
                        alt={p.alt || ""}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </button>
                    {p.caption ? (
                      <figcaption className="border-t border-[var(--color-ink-100)]/80 px-3 py-2 text-center text-xs font-medium text-[var(--color-ink-700)]">
                        {p.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("lightboxTitle")}
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={close}
            aria-label={t("close")}
          >
            <X className="size-6" />
          </button>
          <div
            className="relative max-h-[90vh] max-w-[min(96vw,1200px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            {lightbox.caption ? (
              <p className="mt-4 text-center text-sm text-white/90">{lightbox.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
