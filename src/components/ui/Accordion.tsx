"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-ink-100)] rounded-3xl border border-[var(--color-ink-100)] bg-white overflow-hidden shadow-[var(--shadow-soft)]">
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[var(--color-cream-50)] transition-colors"
              aria-expanded={open}
            >
              <span className="font-display text-base sm:text-lg font-semibold text-[var(--color-ink-900)]">
                {item.q}
              </span>
              <span
                className={cn(
                  "shrink-0 inline-flex items-center justify-center size-8 rounded-full bg-[var(--color-cream-200)] text-[var(--color-ink-700)] transition-transform",
                  open && "rotate-180 bg-[var(--color-sky-100)] text-[var(--color-sky-500)]",
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
                <p className="px-6 pb-5 text-[var(--color-ink-700)] leading-relaxed text-pretty">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
