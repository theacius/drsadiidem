import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  /** Forwarded to root span — allows callers to mark this as a live-editable element. */
  editableId?: string;
  editableType?: "text" | "button" | "image" | "video";
  style?: CSSProperties;
};

export function GradientText({
  children,
  className,
  from = "var(--color-sky-500)",
  via = "var(--color-mint-400)",
  to = "var(--color-peach-400)",
  animate = true,
  editableId,
  editableType,
  style,
}: Props) {
  const dataAttrs: Record<string, string> = {};
  if (editableId) dataAttrs["data-editable-id"] = editableId;
  if (editableType) dataAttrs["data-type"] = editableType;

  return (
    <span
      {...dataAttrs}
      className={cn(
        "bg-clip-text text-transparent",
        animate && "gradient-pan",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(120deg, ${from}, ${via}, ${to}, ${via}, ${from})`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
