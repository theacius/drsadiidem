"use client";

import { useMemo, useState } from "react";
import type { GalleryVideo } from "@prisma/client";
import { resolveGalleryVideoPlayback } from "@/lib/media/youtube";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

type Props = {
  videos: GalleryVideo[];
  locale: string;
};

export function VideoGalleryExperience({ videos, locale }: Props) {
  const preferEn = locale !== "tr";
  const [activeId, setActiveId] = useState<string | null>(videos[0]?.id ?? null);

  const active = useMemo(
    () => videos.find((v) => v.id === activeId) ?? videos[0],
    [videos, activeId],
  );

  const playback = active ? resolveGalleryVideoPlayback(active.videoUrl, active.embedSrc) : null;

  const title = active
    ? preferEn
      ? active.titleEn?.trim() || active.titleTr
      : active.titleTr
    : "";

  const description = active
    ? preferEn
      ? active.descriptionEn?.trim() || active.descriptionTr
      : active.descriptionTr
    : "";

  if (!videos.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[var(--color-ink-200)] bg-[var(--color-cream-50)] px-6 py-16 text-center">
        <p className="text-[var(--color-ink-700)] font-medium">Henüz video eklenmemiş.</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Yönetim panelinden «Galeri» bölümünde video ekleyebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <div className="min-w-0 flex-1 space-y-5">
        <div className="aspect-video overflow-hidden rounded-2xl border border-[var(--color-ink-100)] bg-black shadow-[var(--shadow-soft-lg)] sm:rounded-3xl">
          {playback?.mode === "video" ? (
            <video
              key={playback.src}
              title={title}
              src={playback.src}
              controls
              playsInline
              className="size-full bg-black"
              preload="metadata"
            />
          ) : playback?.mode === "iframe" ? (
            <iframe
              title={title}
              src={
                playback.src.includes("?") ? `${playback.src}&rel=0` : `${playback.src}?rel=0`
              }
              className="size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-2 bg-[var(--color-ink-900)] p-6 text-center text-white">
              <p className="text-sm font-semibold">Geçerli bir video kaynağı yok</p>
              <p className="text-xs text-white/75">
                YouTube bağlantısı, embed adresi veya yüklenmiş MP4/WebM dosyası ekleyin.
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => {
            const selected = v.id === active?.id;
            const thumb = v.thumbnailUrl?.trim();
            const vTitle = preferEn ? v.titleEn?.trim() || v.titleTr : v.titleTr;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveId(v.id)}
                className={cn(
                  "group flex gap-3 rounded-2xl border bg-white p-3 text-left transition-all",
                  selected
                    ? "border-[var(--color-sky-400)] shadow-[var(--shadow-soft)] ring-2 ring-[var(--color-sky-200)]"
                    : "border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] hover:shadow-[var(--shadow-soft)]",
                )}
              >
                <div className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-sky-200)] to-[var(--color-mint-200)]">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="flex size-full items-center justify-center">
                      <Play className="size-7 text-white drop-shadow" fill="currentColor" />
                    </span>
                  )}
                  {v.durationLabel ? (
                    <span className="absolute bottom-1 right-1 rounded bg-black/65 px-1.5 py-0.5 text-[0.65rem] font-mono text-white">
                      {v.durationLabel}
                    </span>
                  ) : null}
                </div>
                <div className="min-w-0 py-0.5">
                  <p className="font-display text-sm font-semibold leading-snug text-pretty text-[var(--color-ink-900)]">
                    {vTitle}
                  </p>
                  {v.durationLabel && !thumb ? (
                    <p className="mt-1 text-xs text-[var(--color-muted)]">{v.durationLabel}</p>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="w-full shrink-0 rounded-2xl border border-[var(--color-ink-100)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] lg:sticky lg:top-28 lg:max-w-[22rem] xl:max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-sky-600)]">
          {preferEn ? "About this video" : "Video hakkında"}
        </p>
        <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-pretty text-[var(--color-ink-900)]">
          {title}
        </h2>
        <div className="mt-4 max-h-[min(60vh,28rem)] overflow-y-auto text-sm leading-relaxed text-[var(--color-ink-700)] whitespace-pre-wrap text-pretty">
          {description}
        </div>
      </aside>
    </div>
  );
}
