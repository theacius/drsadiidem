"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsLvpeEditing } from "@/live-visual-editor/useIsLvpeEditing";

type Slide = {
  src: string;
  alt?: string;
};

type Props = {
  slides: Slide[];
  /** ms cinsinden otomatik geçiş süresi */
  interval?: number;
  /** Aspect ratio (Tailwind sınıfı) */
  aspect?: string;
  className?: string;
  /** Hover'da otomatik geçişi durdur */
  pauseOnHover?: boolean;
  /** Ok navigasyonu */
  arrows?: boolean;
  /** Nokta göstergesi */
  dots?: boolean;
  /** İlerleme çubuğu */
  progress?: boolean;
};

export function PhotoSlider({
  slides,
  interval = 5500,
  aspect = "aspect-[4/5]",
  className,
  pauseOnHover = true,
  arrows = true,
  dots = true,
  progress = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  /** In the live visual editor, freezing auto-advance lets each slide be
   *  selected and edited without disappearing mid-edit. */
  const isLvpe = useIsLvpeEditing();

  const go = useCallback(
    (next: number) => {
      const safe = ((next % total) + total) % total;
      setDirection(safe > index || (index === total - 1 && safe === 0) ? 1 : -1);
      setIndex(safe);
    },
    [index, total],
  );

  useEffect(() => {
    if (hovering || total < 2 || isLvpe) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => window.clearInterval(id);
  }, [hovering, interval, total, isLvpe]);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.04, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, scale: 1.0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && setHovering(true)}
      onMouseLeave={() => pauseOnHover && setHovering(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[var(--color-cream-50)] border border-[var(--color-ink-100)] shadow-[var(--shadow-soft-lg)]",
        aspect,
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.7 },
            x: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            priority={index === 0}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {arrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Önceki fotoğraf"
            data-lvpe-allow-click
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-10 rounded-full bg-white/85 backdrop-blur text-[var(--color-ink-800)] hover:bg-white shadow-[var(--shadow-soft)] opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Sonraki fotoğraf"
            data-lvpe-allow-click
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-10 rounded-full bg-white/85 backdrop-blur text-[var(--color-ink-800)] hover:bg-white shadow-[var(--shadow-soft)] opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {dots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slayt ${i + 1}`}
              data-lvpe-allow-click
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-7 bg-white"
                  : "w-1.5 bg-white/55 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}

      {progress && total > 1 && !hovering && (
        <motion.div
          key={`p-${index}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: interval / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[3px] bg-white/85"
        />
      )}
    </div>
  );
}
