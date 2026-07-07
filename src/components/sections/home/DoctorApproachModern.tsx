"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { GraduationCap, MapPin, ArrowUpRight, type LucideIcon } from "lucide-react";

type InfoCard = { title: string; body: string };

type Props = {
  label: string;
  title: string;
  description: string;
  ctaAbout: string;
  ctaContact: string;
  infoCards: InfoCard[];
  portraitSrc: string;
  portraitAlt: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const CARD_ICONS: LucideIcon[] = [GraduationCap, MapPin];

function ApproachInfoCard({
  card,
  Icon,
  index,
  reduceMotion,
}: {
  card: InfoCard;
  Icon: LucideIcon;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="doctor-approach-modern__info-card"
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
    >
      <span className="doctor-approach-modern__info-card-glow" aria-hidden />
      <span className="doctor-approach-modern__info-icon" aria-hidden>
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <p className="doctor-approach-modern__info-title">{card.title}</p>
      <p className="doctor-approach-modern__info-body">{card.body}</p>
      <span className="doctor-approach-modern__info-index" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export function DoctorApproachModern({
  label,
  title,
  description,
  ctaAbout,
  ctaContact,
  infoCards,
  portraitSrc,
  portraitAlt,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.98]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section ref={ref} className="doctor-approach-modern" aria-labelledby="doctor-approach-title">
      <div className="doctor-approach-modern__grid-bg" aria-hidden />
      <motion.span
        className="doctor-approach-modern__watermark"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        aria-hidden
      >
        02
      </motion.span>

      <div className="container-x doctor-approach-modern__inner">
        <div className="doctor-approach-modern__layout">
          <div className="doctor-approach-modern__copy">
            <motion.div
              className="doctor-approach-modern__title-wrap"
              initial={reduceMotion ? false : { opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease }}
            >
              <motion.span
                className="doctor-approach-modern__accent-bar"
                initial={reduceMotion ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                aria-hidden
              />
              <div>
                <p className="doctor-approach-modern__label">{label}</p>
                <h2 id="doctor-approach-title" className="doctor-approach-modern__title">
                  {title}
                </h2>
              </div>
            </motion.div>

            <motion.p
              className="doctor-approach-modern__desc"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease }}
            >
              {description}
            </motion.p>

            <motion.div
              className="doctor-approach-modern__actions"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25, ease }}
            >
              <Link href="/hakkimda" className="doctor-approach-modern__btn doctor-approach-modern__btn--primary tap-press">
                {ctaAbout}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link href="/iletisim" className="doctor-approach-modern__btn doctor-approach-modern__btn--ghost tap-press">
                {ctaContact}
              </Link>
            </motion.div>

            <div className="doctor-approach-modern__cards">
              {infoCards.map((card, i) => (
                <ApproachInfoCard
                  key={card.title}
                  card={card}
                  Icon={CARD_ICONS[i] ?? GraduationCap}
                  index={i}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="doctor-approach-modern__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <motion.div
              className="doctor-approach-modern__ring"
              style={reduceMotion ? undefined : { rotate: ringRotate }}
              aria-hidden
            />
            <motion.div
              className="doctor-approach-modern__portrait"
              style={reduceMotion ? undefined : { scale: portraitScale }}
            >
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                sizes="(min-width: 1024px) 420px, 88vw"
                className="object-cover object-center"
              />
            </motion.div>
            <motion.div
              className="doctor-approach-modern__portrait-shine"
              animate={reduceMotion ? undefined : { x: ["-120%", "220%"] }}
              transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
