import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "fusion" | "fusionOutline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)]",
  secondary:
    "bg-[var(--color-peach-200)] text-[var(--color-ink-900)] hover:bg-[var(--color-peach-300)]",
  ghost:
    "bg-transparent text-[var(--color-ink-800)] hover:bg-[var(--color-ink-100)]",
  outline:
    "bg-transparent text-[var(--color-ink-800)] border border-[var(--color-ink-200)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  fusion: "btn-fusion rounded-[4px] !shadow-none",
  fusionOutline: "btn-fusion btn-fusion-outline rounded-[4px] !shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          variant === "fusion" || variant === "fusionOutline"
            ? ""
            : "inline-flex items-center justify-center gap-2 rounded-full font-medium",
          variant === "fusion" || variant === "fusionOutline"
            ? "inline-flex items-center justify-center gap-2"
            : "",
          "transition-[transform,box-shadow,background-color,color] duration-200",
          "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
