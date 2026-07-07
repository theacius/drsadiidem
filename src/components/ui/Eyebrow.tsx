import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[var(--color-mint-100)] px-3.5 py-1.5",
        "text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-mint-400)]",
        className,
      )}
      {...props}
    />
  );
}
