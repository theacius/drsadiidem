"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

type Props = {
  eyebrow: string;
  greeting: string;
  body: string;
  highlight: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DoctorNoteModern({ eyebrow, greeting, body, highlight }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const cardY = useTransform(scrollYProgress, [0, 1], [24, -12]);

  const bodyParts = body.split(highlight);

  return (
    <section ref={ref} className="doctor-note-modern" aria-labelledby="doctor-note-title">
      <div className="doctor-note-modern__backdrop" aria-hidden>
        <div className="doctor-note-modern__mesh" />
        <motion.div
          className="doctor-note-modern__orb doctor-note-modern__orb--a"
          style={reduceMotion ? undefined : { y: orbY }}
        />
        <motion.div
          className="doctor-note-modern__orb doctor-note-modern__orb--b"
          style={reduceMotion ? undefined : { y: orbBY }}
        />
      </div>

      <div className="container-x doctor-note-modern__inner">
        <motion.div
          className="doctor-note-modern__card"
          style={reduceMotion ? undefined : { y: cardY }}
          initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease }}
        >
          <motion.span
            className="doctor-note-modern__quote-icon"
            initial={reduceMotion ? false : { opacity: 0, rotate: -12, scale: 0.6 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            aria-hidden
          >
            <Quote className="size-7" strokeWidth={1.5} />
          </motion.span>

          <motion.p
            className="doctor-note-modern__eyebrow"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease }}
          >
            <span className="doctor-note-modern__eyebrow-line" aria-hidden />
            {eyebrow}
          </motion.p>

          <motion.h2
            id="doctor-note-title"
            className="doctor-note-modern__greeting"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.22, ease }}
          >
            {greeting}
          </motion.h2>

          <motion.p
            className="doctor-note-modern__body"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
          >
            {bodyParts[0]}
            <span className="doctor-note-modern__highlight">{highlight}</span>
            {bodyParts[1] ?? ""}
          </motion.p>

          <motion.div
            className="doctor-note-modern__signature"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
