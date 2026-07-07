"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export type FunctionalPillarItem = {
  id: string;
  title: string;
  body: string;
};

type Props = {
  sectionTitle: string;
  sectionSubtitle: string;
  pillars: FunctionalPillarItem[];
};

export function FunctionalPillars({
  sectionTitle,
  sectionSubtitle,
  pillars,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(pillars[0]?.id ?? null);

  return (
    <Section spacing="lg" className="bg-[var(--color-cream-50)]">
      <Container>
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-balance text-[var(--color-ink-900)]">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-700)] max-w-3xl text-pretty leading-relaxed">
            {sectionSubtitle}
          </p>
        </Reveal>

        <div className="mt-10 divide-y divide-[var(--color-ink-100)] rounded-[28px] border border-[var(--color-ink-100)] bg-white overflow-hidden shadow-[var(--shadow-soft)]">
          {pillars.map((p) => {
            const open = openId === p.id;
            const paras = p.body
              .split(/\n\n+/)
              .map((x) => x.trim())
              .filter(Boolean);
            return (
              <div key={p.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="w-full flex items-start justify-between gap-4 px-5 sm:px-7 py-5 text-left hover:bg-[var(--color-cream-50)] transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-[var(--color-ink-900)] text-pretty">
                    {p.title}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-[var(--color-cream-200)] text-[var(--color-ink-700)] transition-transform mt-0.5",
                      open && "rotate-180 bg-[var(--color-sky-100)] text-[var(--color-sky-600)]",
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-6 space-y-4 text-[var(--color-ink-700)] leading-relaxed text-pretty">
                      {paras.map((chunk, i) => (
                        <p key={i}>{chunk}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
