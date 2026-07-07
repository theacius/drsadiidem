"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

export type TimelineEntry = {
  title: string;
  content: ReactNode;
};

type TimelineProps = {
  data: TimelineEntry[];
  className?: string;
};

/**
 * Dikey zaman çizelgesi: sol rail + yapışkan başlıklar,
 * kaydırma ile dolan gradient “ışın” (Aceternity Timeline benzeri).
 */
export function Timeline({ data, className }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const beamOpacity = useTransform(scrollYProgress, [0, 0.06], [0.4, 1]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <div className="relative">
        {/* Arka çizgi */}
        <div
          className="pointer-events-none absolute bottom-4 left-[19px] top-4 w-px bg-[var(--color-ink-200)]"
          aria-hidden
        />
        {/* Kaydırmayla büyüyen gradient çekirdek */}
        {reduce ? (
          <div
            className="pointer-events-none absolute bottom-4 left-[19px] top-4 w-[3px] -translate-x-px rounded-full bg-gradient-to-b from-[var(--color-sky-400)] via-[var(--color-primary)] to-[var(--color-peach-300)]"
            aria-hidden
          />
        ) : (
          <motion.div
            style={{
              scaleY: scrollYProgress,
              opacity: beamOpacity,
              transformOrigin: "top",
            }}
            className="pointer-events-none absolute left-[19px] top-4 h-[calc(100%-2rem)] w-[3px] -translate-x-px rounded-full bg-gradient-to-b from-[var(--color-sky-400)] via-[var(--color-primary)] to-[var(--color-peach-300)]"
            aria-hidden
          />
        )}

        <div className="space-y-16 md:space-y-24">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative flex gap-5 md:gap-8 lg:gap-12"
            >
              {/* Nokta sütunu */}
              <div className="flex w-10 shrink-0 flex-col items-center md:w-11">
                <span className="relative z-[1] mt-1.5 flex size-8 items-center justify-center rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-sky-50)] shadow-[var(--shadow-soft)] ring-2 ring-[var(--color-sky-200)]/60 md:mt-2 md:size-9">
                  <span className="size-2.5 rounded-full bg-[var(--color-primary)] md:size-3" />
                </span>
              </div>

              <div className="grid min-w-0 flex-1 gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <h3 className="font-display text-lg font-semibold leading-snug text-[var(--color-ink-900)] md:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="md:col-span-8 md:pt-0.5">
                  <div className="text-sm leading-relaxed text-[var(--color-ink-700)] md:text-[15px]">
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
