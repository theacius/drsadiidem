"use client";

import { resolveServiceIcon } from "@/components/sections/home/service-icons";

type Props = { icon: string; className?: string };

export function ServiceDetailIcon({ icon, className }: Props) {
  const Icon = resolveServiceIcon(icon);
  return <Icon className={className} aria-hidden />;
}
