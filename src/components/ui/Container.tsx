import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-x", className)} {...props} />;
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: "sm" | "md" | "lg";
};

export function Section({ className, spacing = "md", ...props }: SectionProps) {
  const sp =
    spacing === "sm"
      ? "py-10 sm:py-12"
      : spacing === "lg"
        ? "py-16 sm:py-24 lg:py-32"
        : "py-12 sm:py-16 lg:py-24";
  return <section className={cn(sp, className)} {...props} />;
}
