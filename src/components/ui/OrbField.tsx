import { cn } from "@/lib/utils";

type Orb = {
  /** Tailwind position utilities (e.g. "-top-32 -left-20"). */
  position: string;
  /** Tailwind size utilities (e.g. "w-[36rem] h-[36rem]"). */
  size: string;
  /** Any valid CSS background color. */
  color: string;
  /** Negative animation-delay for staggering. Default `0s`. */
  delay?: string;
};

type Props = {
  orbs?: Orb[];
  className?: string;
};

const DEFAULT_ORBS: Orb[] = [
  {
    position: "-top-36 -left-24",
    size: "w-[36rem] h-[36rem]",
    color: "rgba(168, 216, 185, 0.34)",
    delay: "0s",
  },
  {
    position: "-top-20 right-0",
    size: "w-[32rem] h-[32rem]",
    color: "rgba(147, 197, 220, 0.32)",
    delay: "-8s",
  },
  {
    position: "bottom-10 left-1/3",
    size: "w-[28rem] h-[28rem]",
    color: "rgba(247, 198, 174, 0.30)",
    delay: "-14s",
  },
];

/**
 * Decorative field of softly-pulsing colored orbs ("auroras") to be layered
 * BEHIND or IN FRONT of a hero photograph for atmospheric depth without
 * obscuring the subject. Pure CSS, no JS. Pointer-events disabled.
 */
export function OrbField({ orbs = DEFAULT_ORBS, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {orbs.map((o, i) => (
        <div
          key={i}
          className={cn(
            "aurora-blob absolute rounded-full blur-3xl",
            o.position,
            o.size,
          )}
          style={{
            backgroundColor: o.color,
            animationDelay: o.delay ?? "0s",
          }}
        />
      ))}
    </div>
  );
}
