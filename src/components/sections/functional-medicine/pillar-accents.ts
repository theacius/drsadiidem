import type { LucideIcon } from "lucide-react";
import {
  Activity,
  HeartHandshake,
  Leaf,
  Moon,
  Pill,
  Shield,
  Sparkles,
  Wind,
} from "lucide-react";

/** Her CMS sütunu için renk + Lucide ikon — özel SVG yok */
export type PillarAccent = {
  Icon: LucideIcon;
  iconGradient: string;
  iconShadow: string;
  navIdle: string;
  navActiveRing: string;
  cardTint: string;
  barGradient: string;
};

const DEFAULT: PillarAccent = {
  Icon: Sparkles,
  iconGradient: "from-[var(--color-sky-500)] to-[var(--color-mint-500)]",
  iconShadow: "shadow-[0_12px_36px_rgba(91,168,214,0.28)]",
  navIdle: "border-[var(--color-ink-100)] bg-white/90 hover:border-[var(--color-sky-200)] hover:bg-[var(--color-sky-50)]",
  navActiveRing: "ring-2 ring-[var(--color-sky-300)]/70",
  cardTint: "bg-white/95",
  barGradient: "from-[var(--color-sky-500)] to-[var(--color-mint-400)]",
};

const MAP: Record<string, PillarAccent> = {
  "nutrition-microbiome": {
    Icon: Leaf,
    iconGradient: "from-emerald-500 to-teal-400",
    iconShadow: "shadow-[0_14px_36px_rgba(16,185,129,0.35)]",
    navIdle:
      "border-emerald-200/80 bg-emerald-50/60 hover:border-emerald-300 hover:bg-emerald-50",
    navActiveRing: "ring-2 ring-emerald-400/60",
    cardTint: "bg-gradient-to-br from-emerald-50/90 via-white to-white",
    barGradient: "from-emerald-500 to-teal-400",
  },
  "detox-environment": {
    Icon: Wind,
    iconGradient: "from-cyan-500 to-sky-500",
    iconShadow: "shadow-[0_14px_36px_rgba(6,182,212,0.32)]",
    navIdle:
      "border-cyan-200/80 bg-cyan-50/50 hover:border-cyan-300 hover:bg-cyan-50/90",
    navActiveRing: "ring-2 ring-cyan-400/55",
    cardTint: "bg-gradient-to-br from-cyan-50/85 via-white to-white",
    barGradient: "from-cyan-500 to-blue-500",
  },
  "development-parenting": {
    Icon: HeartHandshake,
    iconGradient: "from-rose-500 to-fuchsia-500",
    iconShadow: "shadow-[0_14px_36px_rgba(244,114,182,0.28)]",
    navIdle:
      "border-rose-200/80 bg-rose-50/50 hover:border-rose-300 hover:bg-rose-50",
    navActiveRing: "ring-2 ring-rose-400/55",
    cardTint: "bg-gradient-to-br from-rose-50/80 via-white to-white",
    barGradient: "from-rose-500 to-fuchsia-500",
  },
  "sleep-circadian": {
    Icon: Moon,
    iconGradient: "from-indigo-500 to-violet-500",
    iconShadow: "shadow-[0_14px_36px_rgba(99,102,241,0.28)]",
    navIdle:
      "border-indigo-200/80 bg-indigo-50/45 hover:border-indigo-300 hover:bg-indigo-50/85",
    navActiveRing: "ring-2 ring-indigo-400/55",
    cardTint: "bg-gradient-to-br from-indigo-50/75 via-white to-white",
    barGradient: "from-indigo-500 to-violet-500",
  },
  exercise: {
    Icon: Activity,
    iconGradient: "from-orange-500 to-amber-400",
    iconShadow: "shadow-[0_14px_36px_rgba(249,115,22,0.28)]",
    navIdle:
      "border-orange-200/80 bg-orange-50/50 hover:border-orange-300 hover:bg-orange-50",
    navActiveRing: "ring-2 ring-orange-400/55",
    cardTint: "bg-gradient-to-br from-orange-50/80 via-white to-white",
    barGradient: "from-orange-500 to-amber-400",
  },
  immunity: {
    Icon: Shield,
    iconGradient: "from-amber-500 to-yellow-400",
    iconShadow: "shadow-[0_14px_36px_rgba(245,158,11,0.28)]",
    navIdle:
      "border-amber-200/80 bg-amber-50/45 hover:border-amber-300 hover:bg-amber-50/90",
    navActiveRing: "ring-2 ring-amber-400/55",
    cardTint: "bg-gradient-to-br from-amber-50/75 via-white to-white",
    barGradient: "from-amber-500 to-yellow-400",
  },
  supplements: {
    Icon: Pill,
    iconGradient: "from-violet-500 to-purple-500",
    iconShadow: "shadow-[0_14px_36px_rgba(139,92,246,0.28)]",
    navIdle:
      "border-violet-200/80 bg-violet-50/45 hover:border-violet-300 hover:bg-violet-50/90",
    navActiveRing: "ring-2 ring-violet-400/55",
    cardTint: "bg-gradient-to-br from-violet-50/75 via-white to-white",
    barGradient: "from-violet-500 to-purple-500",
  },
};

export function getPillarAccent(pillarId: string): PillarAccent {
  return MAP[pillarId] ?? DEFAULT;
}
