"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Award, MapPin, Clock, Heart } from "lucide-react";
import type { ResolvedSiteContent } from "@/lib/site-content";
import { LVPE_KIND } from "@/live-visual-editor/lvpe-kinds";

type Props = {
  trust: ResolvedSiteContent["trustBar"];
};

export function TrustBar({ trust }: Props) {
  const reduceMotion = useReducedMotion();
  const items: Array<{
    icon: typeof Award;
    label: string;
    color: string;
    bg: string;
    counter?: { to: number; suffix: string; duration: number };
    word?: string;
    /** Ana metin (konum, saat vb.) için LVPE kimliği — sayaçlı ilk kutuda alt satır */
    labelEditableId?: string;
  }> = [
    {
      icon: Award,
      counter: {
        to: trust.experienceYears,
        suffix: "+",
        duration: trust.experienceCounterDurationMs ?? 1400,
      },
      word: trust.experienceSuffix,
      label: trust.experienceDetail,
      labelEditableId: "home.trust.experienceDetail",
      color: "text-[var(--color-sky-500)]",
      bg: "bg-[var(--color-sky-100)]",
    },
    {
      icon: MapPin,
      label: trust.location,
      labelEditableId: "home.trust.location",
      color: "text-[var(--color-peach-400)]",
      bg: "bg-[var(--color-peach-100)]",
    },
    {
      icon: Clock,
      label: trust.hours,
      labelEditableId: "home.trust.hours",
      color: "text-[var(--color-mint-400)]",
      bg: "bg-[var(--color-mint-100)]",
    },
    {
      icon: Heart,
      label: trust.approach,
      labelEditableId: "home.trust.approach",
      color: "text-[var(--color-sky-400)]",
      bg: "bg-[var(--color-cream-200)]",
    },
  ];

  return (
    <section
      className="relative py-10 sm:py-12 border-y border-[var(--color-ink-100)] bg-white"
      aria-label="Güven şeridi"
    >
      <Container>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label, color, bg, counter, word, labelEditableId }, idx) => (
            <Reveal key={idx} delay={idx * 0.06}>
              <motion.li
                className="group flex items-center gap-3 rounded-2xl p-3 hover:bg-[var(--color-cream-50)] transition-colors"
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              >
                <span
                  className={`shrink-0 inline-flex items-center justify-center size-11 rounded-2xl ${bg} ${color} group-hover:scale-105 transition-transform`}
                  data-lvpe-skip
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  {counter ? (
                    <>
                      <div className={`font-display text-lg font-semibold leading-tight ${color}`}>
                        <span
                          data-editable-id="home.trust.experienceCounter"
                          data-type="stat"
                          data-lvpe-kind={LVPE_KIND.TRUST_STAT_COUNTER}
                          data-lvpe-stat-to={String(counter.to)}
                          data-lvpe-stat-suffix={counter.suffix}
                          data-lvpe-stat-duration={String(counter.duration)}
                          className="inline-block align-baseline"
                        >
                          <Counter
                            to={counter.to}
                            suffix={counter.suffix}
                            duration={counter.duration}
                            className="tabular-nums font-bold"
                          />
                        </span>{" "}
                        <span
                          data-editable-id="home.trust.experienceSuffixWord"
                          data-type="text"
                          data-lvpe-kind={LVPE_KIND.TRUST_SUFFIX_WORD}
                          className="font-semibold text-[var(--color-ink-900)]"
                        >
                          {word}
                        </span>
                      </div>
                      {labelEditableId ? (
                        <span
                          data-editable-id={labelEditableId}
                          data-type="text"
                          data-lvpe-kind={
                            labelEditableId === "home.trust.experienceDetail"
                              ? LVPE_KIND.TRUST_DETAIL
                              : labelEditableId === "home.trust.location"
                                ? LVPE_KIND.TRUST_LOCATION
                                : labelEditableId === "home.trust.hours"
                                  ? LVPE_KIND.TRUST_HOURS
                                  : LVPE_KIND.TRUST_APPROACH
                          }
                          className="mt-0.5 block text-sm font-medium text-[var(--color-ink-800)] leading-snug"
                        >
                          {label}
                        </span>
                      ) : (
                        <span className="mt-0.5 block text-sm font-medium text-[var(--color-ink-800)] leading-snug">
                          {label}
                        </span>
                      )}
                    </>
                  ) : labelEditableId ? (
                    <span
                      data-editable-id={labelEditableId}
                      data-type="text"
                      data-lvpe-kind={
                        labelEditableId === "home.trust.location"
                          ? LVPE_KIND.TRUST_LOCATION
                          : labelEditableId === "home.trust.hours"
                            ? LVPE_KIND.TRUST_HOURS
                            : LVPE_KIND.TRUST_APPROACH
                      }
                      className="block text-sm font-medium text-[var(--color-ink-800)] leading-snug"
                    >
                      {label}
                    </span>
                  ) : (
                    <span className="block text-sm font-medium text-[var(--color-ink-800)] leading-snug">
                      {label}
                    </span>
                  )}
                </div>
              </motion.li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
