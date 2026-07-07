import { cn } from "@/lib/utils";

type Props = {
  /** Üst bölümün rengi (dalga rengi) */
  fill?: string;
  /** Aşağı yönde mi (varsayılan) yoksa yukarı mı */
  flip?: boolean;
  className?: string;
  variant?: "wave" | "tilt" | "curve";
};

export function SectionDivider({
  fill = "var(--color-cream-50)",
  flip = false,
  className,
  variant = "wave",
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative w-full leading-[0]",
        flip && "rotate-180",
        className,
      )}
    >
      {variant === "wave" && (
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-16"
        >
          <path
            d="M0 40 C 240 80 480 0 720 32 C 960 64 1200 16 1440 48 L 1440 80 L 0 80 Z"
            fill={fill}
          />
        </svg>
      )}
      {variant === "tilt" && (
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="block w-full h-10 sm:h-14"
        >
          <path d="M0 0 L 1440 60 L 1440 60 L 0 60 Z" fill={fill} />
        </svg>
      )}
      {variant === "curve" && (
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block w-full h-14 sm:h-20"
        >
          <path
            d="M0 100 Q 720 0 1440 100 L 1440 100 L 0 100 Z"
            fill={fill}
          />
        </svg>
      )}
    </div>
  );
}
