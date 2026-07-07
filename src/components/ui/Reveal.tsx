"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

const easeOutSoft = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Hareket yönü */
  from?: "bottom" | "top" | "left" | "right";
  amount?: number;
  /** Hafif ölçek + geçiş — vitrin blokları için */
  soft?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
  amount = 24,
  soft = true,
}: Props) {
  const reduceMotion = useReducedMotion();

  const initial =
    from === "bottom"
      ? { y: amount }
      : from === "top"
        ? { y: -amount }
        : from === "left"
          ? { x: -amount }
          : { x: amount };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initial,
      ...(soft && !reduceMotion ? { scale: 0.988, filter: "blur(5px)" } : {}),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0.2 : 0.68,
        delay: reduceMotion ? 0 : delay,
        ease: easeOutSoft,
      },
    },
  };

  return (
    <motion.div
      initial={reduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
