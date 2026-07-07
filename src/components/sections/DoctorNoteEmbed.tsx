"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Quote } from "lucide-react";
import type { DoctorNoteContent } from "@/components/sections/DoctorNote";

type Props = {
  note: DoctorNoteContent;
  variant?: "embedded" | "standalone";
};

export function DoctorNoteEmbed({ note, variant = "embedded" }: Props) {
  const isEmbedded = variant === "embedded";

  return (
    <div
      className={cn(
        isEmbedded &&
          "rounded-[26px] border border-[var(--color-sky-200)]/45 bg-gradient-to-br from-white via-[var(--color-sky-50)]/50 to-[var(--color-mint-50)]/30 px-6 py-7 shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-ink-100)]/10",
      )}
    >
      <Reveal>
        <div className="flex items-center gap-2 text-[var(--color-sky-600)]">
          <Quote className="size-5 shrink-0" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">{note.heading}</span>
        </div>
        <p className="mt-4 font-display text-xl sm:text-2xl font-semibold text-[var(--color-ink-900)] text-pretty leading-snug">
          {note.greeting}
        </p>
      </Reveal>
      <div className="mt-5 space-y-3.5 text-[var(--color-ink-700)] leading-relaxed text-pretty [&_p]:text-[17px] [&_p]:sm:text-lg">
        {note.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.04 * (i + 1)}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.12}>
        <p
          className={cn(
            "text-sm text-[var(--color-muted)]",
            isEmbedded ? "mt-6 border-t border-[var(--color-ink-100)]/60 pt-5" : "mt-8",
          )}
        >
          {note.closingLine}
        </p>
      </Reveal>
    </div>
  );
}
