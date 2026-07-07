"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function HomeFaqAccordion({ items }: { items: Item[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
      {items.map((item, idx) => {
        const open = openIdx === idx;
        return (
          <details
            key={item.q}
            open={open}
            className="group rounded-2xl border border-[var(--color-ink-100)] bg-white shadow-[var(--shadow-soft)] overflow-hidden"
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) setOpenIdx(idx);
              else if (openIdx === idx) setOpenIdx(null);
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-sm sm:text-base font-semibold text-[var(--color-ink-900)] hover:bg-[var(--color-cream-50)] [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-[var(--color-primary)] transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden
              />
            </summary>
            <div className="px-5 pb-4 text-sm text-[var(--color-ink-700)] leading-relaxed border-t border-[var(--color-ink-100)]/80 pt-3">
              {item.a}
            </div>
          </details>
        );
      })}
    </div>
  );
}
