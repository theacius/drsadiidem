"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "@/components/ui/Sparkles";
import { Mail, Send, Check, Sparkle } from "lucide-react";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("ok");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4500);
  }

  return (
    <Section spacing="lg" className="bg-[var(--color-cream-50)]">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-white border border-[var(--color-ink-100)] shadow-[var(--shadow-soft)] p-8 sm:p-12">
            <Sparkles count={20} color="var(--color-peach-300)" />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-peach-100)] blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-mint-100)] blur-3xl" />

            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <Eyebrow className="bg-[var(--color-mint-100)] text-[var(--color-mint-400)]">
                  <Sparkle className="size-3" />
                  {t("eyebrow")}
                </Eyebrow>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-balance">
                  {t("title")}
                </h2>
                <p className="mt-3 text-[var(--color-ink-700)] text-pretty max-w-xl">
                  {t("description")}
                </p>

                <form data-lvpe-skip onSubmit={onSubmit} className="mt-6 max-w-md">
                  <div className="relative flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--color-muted)]" />
                      <input
                        type="email"
                        required
                        placeholder={t("placeholder")}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        className="w-full h-12 pl-11 pr-4 rounded-2xl border border-[var(--color-ink-200)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-300)] focus:border-[var(--color-sky-300)] text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="md"
                      className="h-12 shrink-0 shine-on-hover"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <span className="inline-block size-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="size-4" />
                          {t("submit")}
                        </>
                      )}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {status === "ok" && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--color-mint-400)] font-semibold"
                      >
                        <Check className="size-4" />
                        {t("success")}
                      </motion.p>
                    )}
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-sm text-[var(--color-peach-400)] font-semibold"
                      >
                        {t("error")}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="mt-3 text-xs text-[var(--color-muted)]">
                    {t("privacy")}
                  </p>
                </form>
              </div>

              <div className="lg:col-span-5">
                <NewsletterIllustration />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function NewsletterIllustration() {
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="aspect-[5/4] rounded-3xl bg-gradient-to-br from-[var(--color-sky-100)] via-[var(--color-mint-100)] to-[var(--color-peach-100)] p-6 relative overflow-hidden">
        <svg viewBox="0 0 320 240" className="absolute inset-0 w-full h-full" aria-hidden>
          {/* Zarf */}
          <g transform="translate(60 60)">
            <rect x="0" y="0" width="200" height="130" rx="12" fill="white" />
            <path d="M0 0 L 100 75 L 200 0 Z" fill="#dfeefa" />
            <rect x="0" y="0" width="200" height="130" rx="12" fill="none" stroke="#5BA8D6" strokeWidth="2" />
          </g>
          {/* Mektup */}
          <g transform="translate(80 30)" className="float-slow">
            <rect x="0" y="0" width="160" height="90" rx="6" fill="white" stroke="#A8D8B9" strokeWidth="2" />
            <rect x="14" y="14" width="100" height="6" rx="3" fill="#A8D8B9" />
            <rect x="14" y="28" width="120" height="4" rx="2" fill="#dfeefa" />
            <rect x="14" y="38" width="90" height="4" rx="2" fill="#dfeefa" />
            <rect x="14" y="48" width="110" height="4" rx="2" fill="#dfeefa" />
            <circle cx="125" cy="68" r="9" fill="#FF9D76" />
            <path d="M120 68 L 124 72 L 132 64" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Yıldızlar */}
          <path d="M40 30 L 44 42 L 56 46 L 44 50 L 40 62 L 36 50 L 24 46 L 36 42 Z" fill="white" opacity="0.8" />
          <path d="M280 180 L 284 192 L 296 196 L 284 200 L 280 212 L 276 200 L 264 196 L 276 192 Z" fill="white" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
