"use client";

import { useEffect, useState } from "react";

type Props = {
  count?: number;
  className?: string;
  /** En boy oranı için container kullanın */
  color?: string;
};

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

export function Sparkles({ count = 14, className, color = "var(--color-peach-300)" }: Props) {
  const [items, setItems] = useState<Sparkle[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 2.4,
        duration: 1.6 + Math.random() * 1.6,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {items.map((s) => (
        <span
          key={s.id}
          className="sparkle absolute block"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          <svg viewBox="0 0 16 16" className="block w-full h-full" style={{ color }}>
            <path
              d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
