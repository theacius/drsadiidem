"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { DoctorNoteEmbed } from "@/components/sections/DoctorNoteEmbed";
import type { DoctorNoteContent } from "@/components/sections/DoctorNote";

const fadeUp = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.35, staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export type AboutBlockVisualProps = {
  eyebrow: string;
  title: string;
  biography: string;
  doctorName: string;
  specialty: string;
  cta: string;
  portraitSrc: string;
  portraitAlt: string;
  doctorNote: DoctorNoteContent;
};

export function AboutBlockVisual({
  eyebrow,
  title,
  biography,
  doctorName,
  specialty,
  cta,
  portraitSrc,
  portraitAlt,
  doctorNote,
}: AboutBlockVisualProps) {
  const initial = doctorName.trim().charAt(0) || "Ş";

  return (
    <Section
      spacing="lg"
      className="relative overflow-hidden bg-gradient-to-b from-[var(--color-cream-50)] via-white to-[var(--color-mint-50)]/35"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[12%] h-[420px] w-[420px] rounded-full bg-[var(--color-mint-200)]/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[320px] w-[320px] rounded-full bg-[var(--color-sky-200)]/25 blur-3xl"
      />
      <Container className="relative">
        <motion.div
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerParent}
        >
          <motion.div
            variants={fadeUp}
            className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start lg:sticky lg:top-28"
          >
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute -inset-6 rounded-[42px] bg-gradient-to-br from-[var(--color-mint-200)]/45 via-[var(--color-sky-200)]/30 to-transparent blur-2xl opacity-90" />
              <div className="relative rounded-[34px] bg-gradient-to-br from-white via-[var(--color-cream-100)] to-[var(--color-mint-100)] p-[3px] shadow-[var(--shadow-soft-lg)] ring-1 ring-[var(--color-ink-100)]/12 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(30,41,59,0.14)]">
                <div className="relative aspect-[4/5] rounded-[31px] overflow-hidden bg-[var(--color-cream-200)]">
                  <Image
                    src={portraitSrc}
                    alt={portraitAlt}
                    fill
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="object-cover object-center transition-transform duration-[650ms] ease-out hover:scale-[1.025]"
                    priority={false}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[31px] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-inset ring-[var(--color-ink-900)]/[0.06]"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/93 backdrop-blur-md px-4 py-3.5 shadow-[var(--shadow-soft)] border border-white/85">
                    <div className="flex items-center gap-3">
                      <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-mint-400)] to-[var(--color-sky-500)] flex items-center justify-center text-white font-display font-semibold text-lg shadow-sm">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[var(--color-ink-900)] text-sm truncate">
                          {doctorName}
                        </div>
                        <div className="text-xs text-[var(--color-muted)] leading-snug">{specialty}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:col-span-7 order-1 lg:order-2 space-y-7">
            <div className="space-y-6">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.08] text-balance text-[var(--color-ink-900)] tracking-tight">
                {title}
              </h2>
              <p className="text-lg text-[var(--color-ink-700)] text-pretty max-w-2xl leading-relaxed">
                {biography}
              </p>
            </div>

            <DoctorNoteEmbed note={doctorNote} variant="embedded" />

            <div className="pt-1">
              <Link href="/kurumsal/hakkimda">
                <Button variant="outline" size="lg" className="group">
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
