"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { Star, ArrowRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Seda Okulu",
    role: "Hasta Yakını",
    text: "Eskişehir’de gerçekten çocuk doktoru denilince Şadi hocam derim. Doğumdan beri 7 yıldır doktorumuz; bizi hiç yanıltmadı. Kızımın biricik vazgeçemediği Şadi amcası. Başarıları daim olsun.",
    initial: "S",
    tone: "sky",
  },
  {
    name: "Aslı Ö.",
    role: "Hasta Yakını",
    text: "Birçok doktora gittik; yorumlara güvenemez olmuştum. İlk görüşmemizin sonunda Şadi Bey’e, anlattıklarına, bilgisine, muayene şekline ve tavsiyelerine bayıldım. İlk çocuğumuzda tecrübeli, yönlendirici bir doktora ihtiyacımız vardı — bulduk.",
    initial: "A",
    tone: "peach",
  },
  {
    name: "Güliz Sağlamlı",
    role: "Hasta Yakını",
    text: "Üç yıl önce tanıştık; o kadar ilgili bir doktor ki her ay mutlaka gidiyoruz. Çocuklarım Şadi hocayı çok seviyor. Son derece güven temelli bir ilişki içindeyiz; tüm anne ve babalara kesinlikle tavsiye ederim.",
    initial: "G",
    tone: "mint",
  },
  {
    name: "Murat Akkoyun",
    role: "Hasta Yakını",
    text: "Naif ve kibar bir kişilik; uzmanlığı tartışılmaz. Çocuklarımın doktoru olduğumuz için şanslıyız; herkese tereddütsüz tavsiye ederim.",
    initial: "M",
    tone: "sky",
  },
  {
    name: "Elif K.",
    role: "Hasta Yakını",
    text: "Sadece tedavi değil; ailenin yaşam tarzına dokunan, aileyi de iyileştiren bir hekim. İçimiz rahat ediyor.",
    initial: "E",
    tone: "peach",
  },
  {
    name: "Burak T.",
    role: "Hasta Yakını",
    text: "Çocuklara olan yaklaşımıyla, kibar ve sıcak ofis ortamıyla tavsiyenin ötesinde bir doktor.",
    initial: "B",
    tone: "mint",
  },
];

const TONE_AVATAR: Record<string, string> = {
  sky: "from-[var(--color-sky-300)] to-[var(--color-sky-500)]",
  peach: "from-[var(--color-peach-300)] to-[var(--color-peach-400)]",
  mint: "from-[var(--color-mint-300)] to-[var(--color-mint-400)]",
};

export function Testimonials() {
  const t = useTranslations("testimonials");
  const row1 = TESTIMONIALS;
  const row2 = [...TESTIMONIALS].reverse();

  return (
    <Section spacing="lg" className="bg-[var(--color-cream-50)] overflow-hidden">
      <Container className="text-center max-w-2xl mb-12">
        <Reveal>
          <Eyebrow>Hasta Görüşleri</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-[var(--color-ink-700)] text-lg text-pretty">
            {t("subtitle")}
          </p>
        </Reveal>
      </Container>

      <div className="relative space-y-4">
        <Marquee speed={48} fadeEdges>
          {row1.map((tt, idx) => (
            <TestimonialCard key={`r1-${idx}`} {...tt} />
          ))}
        </Marquee>
        <Marquee speed={56} reverse fadeEdges>
          {row2.map((tt, idx) => (
            <TestimonialCard key={`r2-${idx}`} {...tt} />
          ))}
        </Marquee>
      </div>

      <Container className="text-center mt-10">
        <Reveal>
          <Link
            href="/kurumsal/hasta-gorusleri"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] link-underline"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

function TestimonialCard({
  name,
  role,
  text,
  initial,
  tone,
}: {
  name: string;
  role: string;
  text: string;
  initial: string;
  tone: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.figure
      className="w-[340px] sm:w-[380px] shrink-0 rounded-3xl bg-white border border-[var(--color-ink-100)] p-6 shadow-[var(--shadow-soft)]"
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-0.5 text-[var(--color-peach-400)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5" fill="currentColor" />
          ))}
        </div>
        <Quote className="size-5 text-[var(--color-sky-100)]" />
      </div>
      <blockquote className="mt-4 text-sm text-[var(--color-ink-800)] leading-relaxed text-pretty line-clamp-4">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 pt-4 border-t border-[var(--color-ink-100)]">
        <span
          className={`size-9 rounded-full bg-gradient-to-br ${TONE_AVATAR[tone]} flex items-center justify-center text-white font-semibold text-sm`}
        >
          {initial}
        </span>
        <span>
          <span className="block font-semibold text-[var(--color-ink-900)] text-sm">
            {name}
          </span>
          <span className="block text-xs text-[var(--color-muted)]">{role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export const TESTIMONIAL_LIST = TESTIMONIALS;
