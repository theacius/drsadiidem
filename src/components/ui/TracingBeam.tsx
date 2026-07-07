"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Sayfanın sol kenarında scroll ile dolan dikey ışıklı çizgi. */
export function TracingBeam({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.85], [50, height]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, height - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div ref={ref} className={cn("relative flex w-full md:gap-3", className)}>
      {/* Dar sol kolon: çizgi burada; gövdeye ml-4 vermiyoruz (tablo/metin Container ile hizalı kalır) */}
      <div className="relative hidden w-7 shrink-0 md:block" aria-hidden>
        <div className="absolute left-1 top-3">
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              boxShadow:
                scrollYProgress.get() > 0
                  ? "none"
                  : "0 0 0 6px rgba(91,168,214,0.18)",
            }}
            className="size-3 rounded-full border border-[var(--color-sky-400)] bg-white flex items-center justify-center"
          >
            <span className="size-1.5 rounded-full bg-[var(--color-sky-500)]" />
          </motion.div>

          <svg
            viewBox={`0 0 20 ${height}`}
            width="20"
            height={height}
            className="mt-1 ml-0.5 block"
            aria-hidden
          >
            <motion.path
              d={`M 1 0 V ${height}`}
              fill="none"
              stroke="var(--color-ink-100)"
              strokeWidth="1.25"
              transition={{ duration: 10 }}
            />
            <motion.path
              d={`M 1 0 V ${height}`}
              fill="none"
              stroke="url(#beamGradient)"
              strokeWidth="1.25"
            />
            <defs>
              <motion.linearGradient
                id="beamGradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#5BA8D6" stopOpacity="0" />
                <stop stopColor="#5BA8D6" />
                <stop offset="0.4" stopColor="#A8D8B9" />
                <stop offset="1" stopColor="#FFB89A" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
