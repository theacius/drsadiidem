"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Spot rengi (rgba) */
  color?: string;
  /** Spot çapı px */
  size?: number;
};

export function Spotlight({
  className,
  color = "rgba(91, 168, 214, 0.18)",
  size = 520,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-auto absolute inset-0 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-hidden
      style={{
        background: `radial-gradient(${size}px circle at ${pos.x}% ${pos.y}%, ${color}, transparent 60%)`,
      }}
    />
  );
}
