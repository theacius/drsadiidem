import { cn } from "@/lib/utils";

type Props = {
  /** Color the waves blend INTO at the bottom (typically the next section's
   *  background color). Tints the front-most wave so the handoff is seamless. */
  bottomColor?: string;
  /** `light`: tinted foam waves visible on white/light heroes. `dark`: white foam (legacy). */
  tone?: "light" | "dark";
  /** Optional extra classes for outer wrapper positioning. */
  className?: string;
  /** Reverse-direction motion. */
  reverse?: boolean;
};

/**
 * A layered, gently animated water-style divider used at the bottom of dark
 * full-bleed hero sections. Three SVG wave bands stacked with different
 * opacities, amplitudes and animation speeds give a believable parallax fluid
 * effect at near-zero runtime cost.
 *
 * The SVG paths repeat horizontally (two copies inside a 200% wide track)
 * and translate to -50% via `wave-drift` keyframes — that produces a
 * seamless loop because the second copy starts where the first one ends.
 */
export function WaveDivider({
  bottomColor = "var(--color-cream-50)",
  tone = "dark",
  className,
  reverse = false,
}: Props) {
  const dir = reverse ? "reverse" : "normal";
  const foamBack = tone === "light" ? "rgba(147, 197, 220, 0.42)" : "#ffffff";
  const foamMid =
    tone === "light" ? "rgba(230, 244, 236, 0.55)" : "#ffffff";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-[4]",
        className,
      )}
    >
      {/* Back wave — slowest, lowest opacity */}
      <Layer
        height="h-24 sm:h-32"
        opacity="opacity-30"
        duration="22s"
        direction={dir}
        d="M0 50 C 150 90 300 10 600 40 C 900 70 1050 20 1200 45 L 1200 100 L 0 100 Z"
        fill={foamBack}
      />
      {/* Mid wave */}
      <Layer
        height="h-20 sm:h-28"
        opacity="opacity-60"
        duration="14s"
        direction={dir === "normal" ? "reverse" : "normal"}
        d="M0 55 C 180 25 320 75 600 50 C 870 25 1040 70 1200 45 L 1200 100 L 0 100 Z"
        fill={foamMid}
      />
      {/* Front wave — solid handoff color */}
      <Layer
        height="h-16 sm:h-24"
        opacity="opacity-100"
        duration="9s"
        direction={dir}
        d="M0 65 C 200 45 350 85 600 65 C 850 45 1040 80 1200 60 L 1200 100 L 0 100 Z"
        fill={bottomColor}
      />
    </div>
  );
}

function Layer({
  d,
  fill,
  height,
  opacity,
  duration,
  direction,
}: {
  d: string;
  fill: string;
  height: string;
  opacity: string;
  duration: string;
  direction: "normal" | "reverse";
}) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0", height, opacity)}>
      {/* The two SVGs are placed side-by-side inside a 200%-wide track,
          which slides -50% (= one full SVG width) per loop — fully seamless. */}
      <div
        className="wave-drift flex h-full w-[200%] will-change-transform"
        style={{ animationDuration: duration, animationDirection: direction }}
      >
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="block h-full w-1/2"
        >
          <path d={d} fill={fill} />
        </svg>
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="block h-full w-1/2"
        >
          <path d={d} fill={fill} />
        </svg>
      </div>
    </div>
  );
}
