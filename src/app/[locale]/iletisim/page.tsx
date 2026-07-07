import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import {
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_DISPLAY,
  SITE_EMAIL,
  SITE_ADDRESS,
  telLink,
  waLink,
} from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

const CONTACTS = [
  {
    icon: Phone,
    label: "Telefon",
    value: SITE_PHONE_DISPLAY,
    href: telLink,
    tone: "bg-[var(--color-sky-100)] text-[var(--color-sky-500)]",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: SITE_WHATSAPP_DISPLAY,
    href: waLink(),
    tone: "bg-[var(--color-mint-100)] text-[var(--color-mint-400)]",
    external: true,
  },
  {
    icon: Mail,
    label: "E-posta",
    value: SITE_EMAIL,
    href: `mailto:${SITE_EMAIL}`,
    tone: "bg-[var(--color-peach-100)] text-[var(--color-peach-400)]",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: SITE_ADDRESS,
    tone: "bg-[var(--color-cream-200)] text-[var(--color-ink-700)]",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pzt – Cum: 09:00 – 19:00",
    tone: "bg-[var(--color-cream-200)] text-[var(--color-ink-700)]",
  },
];

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Randevu için bize ulaşın"
        description="Online formu doldurabilir, telefon veya WhatsApp ile randevu oluşturabilirsiniz. Acil durumlarda saat fark etmez."
      />

      <Section>
        <Container className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                Online Randevu Formu
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 text-[var(--color-ink-700)] text-pretty">
                Aşağıdaki formu eksiksiz doldurun, randevu saati için size telefonla
                geri dönüş yapacağız.
              </p>
            </Reveal>
            <div className="mt-7">
              <AppointmentForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-3">
            <Reveal from="right">
              <h3 className="font-display text-xl font-semibold mb-4">
                Bize ulaşın
              </h3>
            </Reveal>
            {CONTACTS.map((c, idx) => (
              <Reveal key={c.label} from="right" delay={idx * 0.05}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 rounded-2xl bg-white border border-[var(--color-ink-100)] p-4 hover:border-[var(--color-sky-200)] hover:shadow-[var(--shadow-soft)] transition-all"
                  >
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl ${c.tone}`}
                    >
                      <c.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        {c.label}
                      </div>
                      <div className="mt-0.5 font-medium text-[var(--color-ink-900)] break-words">
                        {c.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 rounded-2xl bg-white border border-[var(--color-ink-100)] p-4">
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl ${c.tone}`}
                    >
                      <c.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        {c.label}
                      </div>
                      <div className="mt-0.5 font-medium text-[var(--color-ink-900)] text-sm leading-relaxed">
                        {c.value}
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}

            <Reveal from="right" delay={0.3}>
              <div className="mt-2 rounded-2xl overflow-hidden border border-[var(--color-ink-100)] aspect-[4/3] bg-[var(--color-cream-200)]">
                <iframe
                  title="Klinik konumu"
                  src="https://maps.google.com/maps?q=Ho%C5%9Fnudiye%2C%20746%20sk%2013%2C%20Tepeba%C5%9F%C4%B1%2FEski%C5%9Fehir&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                />
              </div>
            </Reveal>
          </aside>
        </Container>
      </Section>
    </>
  );
}
