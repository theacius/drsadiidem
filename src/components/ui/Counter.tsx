"use client";

import { useEffect, useRef, useState } from "react";
import { useIsLvpeEditing } from "@/live-visual-editor/useIsLvpeEditing";

type Props = {
  /** Hedef sayı */
  to: number;
  /** Süre ms */
  duration?: number;
  /** Önek (örn. "%") */
  prefix?: string;
  /** Sonek (örn. "+") */
  suffix?: string;
  /** Sayıyı format eden fonksiyon */
  format?: (n: number) => string;
  className?: string;
};

export function Counter({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  format,
  className,
}: Props) {
  /** When the page is loaded inside the Live Visual Page Editor, skip the
   *  animation so the final value renders immediately. This lets the user
   *  click the value and edit it as plain text without it ticking back. */
  const isLvpe = useIsLvpeEditing();
  const [live, setLive] = useState({ to, duration, suffix });
  const [value, setValue] = useState(isLvpe ? to : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    setLive({ to, duration, suffix });
  }, [to, duration, suffix]);

  /** LVPE: üst `data-type="stat"` host üzerindeki data-* değişikliklerini yakala (inspector). */
  useEffect(() => {
    if (!isLvpe || typeof window === "undefined") return;
    const inner = ref.current;
    const host = inner?.parentElement;
    if (!host || host.getAttribute("data-type") !== "stat") return;

    const readHost = () => {
      const tRaw = host.getAttribute("data-lvpe-stat-to");
      const dRaw = host.getAttribute("data-lvpe-stat-duration");
      const suf = host.getAttribute("data-lvpe-stat-suffix");

      const nextTo =
        tRaw != null && tRaw !== "" ? parseInt(tRaw, 10) : Number.isFinite(to) ? to : 0;
      const nextDur =
        dRaw != null && dRaw !== "" ? parseInt(dRaw, 10) : duration;
      setLive({
        to: Number.isFinite(nextTo) ? nextTo : to,
        duration: Number.isFinite(nextDur) ? Math.max(200, nextDur) : duration,
        suffix: suf !== null ? suf : suffix,
      });
    };

    readHost();
    const mo = new MutationObserver(readHost);
    mo.observe(host, {
      attributes: true,
      attributeFilter: ["data-lvpe-stat-to", "data-lvpe-stat-suffix", "data-lvpe-stat-duration", "data-lvpe-stat-gradient"],
    });
    return () => mo.disconnect();
  }, [isLvpe, to, duration, suffix]);

  const effectiveTo = isLvpe ? live.to : to;
  const effectiveSuffix = isLvpe ? live.suffix : suffix;

  useEffect(() => {
    if (isLvpe) {
      setValue(effectiveTo);
      triggered.current = true;
      return;
    }
    setValue(0);
    triggered.current = false;

    const el = ref.current;
    if (!el) return;

    const target = to;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, isLvpe, effectiveTo]);

  const display = format ? format(value) : value.toLocaleString("tr-TR");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {effectiveSuffix}
    </span>
  );
}