"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import {
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_DISPLAY,
  telLink,
  waLink,
} from "@/lib/utils";

export function CTABanner() {
  const t = useTranslations("cta");

  return (
    <Section spacing="md">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[var(--color-sky-400)] via-[var(--color-sky-500)] to-[var(--color-sky-600)] p-6 sm:p-10 lg:p-12 text-white">
            <DecorBlobs />
            <div className="relative grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-balance">
                  {t("title")}
                </h2>
                <p className="mt-4 text-white/85 text-base sm:text-lg max-w-md text-pretty">
                  {t("body")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/iletisim">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-[var(--color-sky-600)] hover:bg-white/90"
                    >
                      {t("formCta")}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <a
                    href={waLink("Merhaba, randevu hakkında bilgi almak istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-[color-mix(in_srgb,white_15%,transparent)] hover:bg-[color-mix(in_srgb,white_25%,transparent)] text-white border border-white/30"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ContactCard
                  icon={Phone}
                  label={t("phoneLabel")}
                  value={SITE_PHONE_DISPLAY}
                  href={telLink}
                />
                <ContactCard
                  icon={MessageCircle}
                  label={t("whatsappLabel")}
                  value={SITE_WHATSAPP_DISPLAY}
                  href={waLink()}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="rounded-2xl bg-white/12 backdrop-blur-sm border border-white/25 p-5 hover:bg-white/20 transition-colors"
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
        <Icon className="size-5" />
      </span>
      <div className="mt-3 text-xs uppercase tracking-wider text-white/70">
        {label}
      </div>
      <div className="mt-1 font-display text-lg font-semibold">{value}</div>
    </motion.a>
  );
}

function DecorBlobs() {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-[var(--color-mint-300)]/20"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.05, 1],
                opacity: [0.75, 0.95, 0.75],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <svg
        aria-hidden
        className="absolute top-6 right-6 w-12 h-12 text-[var(--color-peach-300)] float-slow"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    </>
  );
}
