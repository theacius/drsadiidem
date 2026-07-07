"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsLvpeEditing } from "@/live-visual-editor/useIsLvpeEditing";

type Props = {
  children: ReactNode;
  /** Saniye cinsinden bir tam dönüş süresi */
  speed?: number;
  /** Ters yön (sola) */
  reverse?: boolean;
  /** Hover'da duraklat */
  pauseOnHover?: boolean;
  className?: string;
  fadeEdges?: boolean;
};

export function Marquee({
  children,
  speed = 28,
  reverse = false,
  pauseOnHover = true,
  className,
  fadeEdges = true,
}: Props) {
  /** In the live editor, freeze the scroll and skip the visually-duplicated
   *  aria-hidden track so each item stays clickable / editable. */
  const isLvpe = useIsLvpeEditing();
  const animClass = isLvpe ? "" : reverse ? "marquee-reverse" : "marquee";
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fadeEdges && !isLvpe &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 gap-6 pr-6 will-change-transform",
          animClass,
          pauseOnHover && !isLvpe && "group-hover:[animation-play-state:paused]",
        )}
        style={isLvpe ? undefined : { animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      {isLvpe ? null : (
        <div
          aria-hidden
          className={cn(
            "flex shrink-0 gap-6 pr-6 will-change-transform",
            animClass,
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ animationDuration: `${speed}s` }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
