import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { SITE_PHONE_DISPLAY, SITE_EMAIL, telLink, waLink } from "@/lib/utils";

export function PhoneCTA() {
  return (
    <Section spacing="md" className="bg-white">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--color-ink-100)] bg-gradient-to-br from-[var(--color-sky-500)] via-[var(--color-sky-600)] to-[var(--color-ink-800)] text-white p-8 sm:p-12 shadow-[var(--shadow-soft-lg)]">
            <BgDecor />

            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
                  <span className="size-1.5 rounded-full bg-[var(--color-mint-300)] pulse-soft" />
                  Bilgi için arayabilirsiniz
                </span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold leading-tight text-balance">
                  Çocuğunuz için bir sorunuz mu var?
                </h2>
                <p className="mt-3 text-white/85 text-lg max-w-xl text-pretty">
                  Telefon ya da WhatsApp üzerinden bize ulaşın; çocuğunuzun durumuna uygun bir
                  randevu ayarlayalım.
                </p>

                <a
                  href={telLink}
                  className="group mt-6 inline-flex flex-col"
                >
                  <span className="text-xs uppercase tracking-[0.16em] text-white/60">
                    Hemen ara
                  </span>
                  <span className="mt-1 inline-flex items-center gap-3 font-display text-3xl sm:text-5xl font-semibold tracking-tight">
                    <Phone className="size-6 sm:size-8" />
                    <span className="link-underline">{SITE_PHONE_DISPLAY}</span>
                  </span>
                </a>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={waLink("Merhaba, randevu hakkında bilgi almak istiyorum.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      className="bg-[#25D366] hover:bg-[#1eb858] focus-visible:outline-[#25D366]"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp ile yaz
                    </Button>
                  </a>
                  <a href={`mailto:${SITE_EMAIL}`}>
                    <Button variant="ghost" size="md" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                      <Mail className="size-4" />
                      {SITE_EMAIL}
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <PhonePreview />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function BgDecor() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[var(--color-mint-300)]/30 blur-3xl aurora-blob" />
      <div className="absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-full bg-[var(--color-peach-300)]/30 blur-3xl aurora-blob" style={{ animationDelay: "-10s" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="cta-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="relative mx-auto max-w-[280px] aspect-[9/19] rounded-[40px] bg-[var(--color-ink-900)] border-[10px] border-[var(--color-ink-800)] shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[var(--color-ink-800)] rounded-b-3xl" />
      <div className="absolute inset-3 rounded-[28px] bg-gradient-to-b from-[var(--color-sky-200)] via-white to-[var(--color-cream-100)] flex flex-col items-center justify-center p-4 text-center">
        <div className="size-20 rounded-full bg-gradient-to-br from-[var(--color-sky-300)] to-[var(--color-mint-300)] flex items-center justify-center text-white font-display text-3xl font-bold animate-pulse">
          Ş
        </div>
        <div className="mt-4 font-display text-base font-semibold text-[var(--color-ink-900)]">
          Dr. Şadi İdem
        </div>
        <div className="text-[0.65rem] text-[var(--color-muted)] uppercase tracking-wider">
          gelen arama…
        </div>
        <div className="mt-6 flex gap-3">
          <span className="size-12 rounded-full bg-[#ef4444] flex items-center justify-center text-white">
            <Phone className="size-5 rotate-[135deg]" />
          </span>
          <span className="size-12 rounded-full bg-[#22c55e] flex items-center justify-center text-white pulse-soft">
            <Phone className="size-5" />
          </span>
        </div>
      </div>
    </div>
  );
}
