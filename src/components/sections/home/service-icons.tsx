import {
  Activity,
  Baby,
  HeartPulse,
  Shield,
  Stethoscope,
  Leaf,
  Moon,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Shield,
  Baby,
  HeartPulse,
  Stethoscope,
  Leaf,
  Moon,
  HeartHandshake,
  Syringe: Stethoscope,
  Wind: Stethoscope,
  Sparkles: Baby,
};

export function resolveServiceIcon(name: string | null | undefined): LucideIcon {
  if (!name?.trim()) return Stethoscope;
  return ICON_MAP[name.trim()] ?? Stethoscope;
}
