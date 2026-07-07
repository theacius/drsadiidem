import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { HeartHandshake, Sparkles, Users, MessageCircleHeart, ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const TOPICS = [
  { Icon: HeartHandshake, title: "Çocuk Odaklı Yaklaşım", description: "Her çocuğun biricikliğine saygılı, dinleyici bir ebeveynlik tarzı." },
  { Icon: Sparkles, title: "Özgürlük ve Sınırlar", description: "Çocuğun keşif alanını korurken sağlıklı sınırlar koymak." },
  { Icon: Users, title: "Aile İçi İletişim", description: "Eşler arası uyum ve çocukla kurulan duygusal yakınlık." },
  { Icon: MessageCircleHeart, title: "Duygusal Hazır Bulunuş", description: "Ebeveynin kendi duygularını fark etmesi ve yönetmesi." },
];

export default async function EbeveynAtolyesiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Ebeveyn Atölyesi"
        title="Özgürlükçü Çocuk Odaklı Ebeveynlik"
        description="Yıllar içinde verdiğim seminerlerden damıttığım bu atölyede; ailelerle çocuk gelişimi, beslenme, uyku ve duygusal yakınlık üzerine konuşuyoruz."
      />

      <Section>
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  Atölyenin amacı
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mt-5 space-y-4 text-[var(--color-ink-700)] text-lg leading-relaxed text-pretty">
                  <p>
                    Çocuğa "ne yapacağını söylemek" yerine, onunla "birlikte
                    keşfetmeye" davet eden bir ebeveynlik mümkün. Bu atölyede
                    ailelerle birlikte; çocukla yapılan günlük etkileşimleri,
                    sınırları, beslenme ve uyku rutinlerini, aile içi iletişimi
                    ele alıyoruz.
                  </p>
                  <p>
                    Amacımız, ebeveynin kendi sezgisine güvenmesi ve çocuğunu
                    daha sakin, daha ilgili bir gözle takip edebilmesidir.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-7">
                  <Link href="/iletisim">
                    <Button size="lg">
                      Atölye için ön kayıt
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <aside className="lg:col-span-5">
              <Reveal from="right">
                <div className="rounded-3xl bg-gradient-to-br from-[var(--color-mint-100)] to-[var(--color-sky-100)] p-7 border border-[var(--color-mint-200)]">
                  <h3 className="font-display text-xl font-semibold">Pratik bilgiler</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <Row label="Süre" value="Yarım gün veya tam gün seçenekleri" />
                    <Row label="Format" value="Yüz yüze · küçük grup" />
                    <Row label="Kontenjan" value="8 — 16 ebeveyn" />
                    <Row label="Mekan" value="Eskişehir Tepebaşı / talebe göre" />
                  </dl>
                  <p className="mt-5 text-xs text-[var(--color-ink-700)]">
                    Detaylı program ve tarihler için iletişim formundan ulaşabilirsiniz.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-[var(--color-cream-50)]">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Konu başlıkları
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map(({ Icon, title, description }, idx) => (
              <Reveal key={title} delay={idx * 0.06}>
                <div className="h-full rounded-3xl bg-white border border-[var(--color-ink-100)] p-6 shadow-[var(--shadow-soft)]">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-peach-100)] text-[var(--color-peach-400)]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-pretty">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-700)] leading-relaxed text-pretty">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 pb-3 border-b border-white/60 last:border-0 last:pb-0">
      <dt className="text-[var(--color-ink-700)] font-medium">{label}</dt>
      <dd className="text-[var(--color-ink-900)] text-right">{value}</dd>
    </div>
  );
}
