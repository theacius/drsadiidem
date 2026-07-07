import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";
import { Newspaper, Tv, Mic, Radio, Globe, BookOpen, ExternalLink } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const MEDIA_ITEMS = [
  { Icon: Newspaper, type: "Gazete", title: "Yerel Gazete Söyleşisi", description: "Çocuk sağlığı ve ebeveynlik üzerine söyleşi.", tone: "sky" },
  { Icon: Tv, type: "Televizyon", title: "TV Konuk Programı", description: "Mevsim hastalıkları ve aşı takvimi paneli.", tone: "peach" },
  { Icon: Mic, type: "Podcast", title: "Ebeveynlik Podcast'i", description: "Özgürlükçü çocuk odaklı yaklaşım üzerine sohbet.", tone: "mint" },
  { Icon: Radio, type: "Radyo", title: "Sabah Radyo Yayını", description: "Yenidoğan bakımı ve emzirme üzerine bilgi.", tone: "sky" },
  { Icon: Globe, type: "Online", title: "Dijital Yayın Röportajı", description: "Çocuk gelişimi ve teknoloji ilişkisi.", tone: "peach" },
  { Icon: BookOpen, type: "Dergi", title: "Aile Dergisi Köşesi", description: "Çocuk sağlığı yazı dizisi.", tone: "mint" },
];

const TONE_BG: Record<string, { bg: string; iconColor: string }> = {
  sky: { bg: "bg-[var(--color-sky-100)]", iconColor: "text-[var(--color-sky-500)]" },
  peach: { bg: "bg-[var(--color-peach-100)]", iconColor: "text-[var(--color-peach-400)]" },
  mint: { bg: "bg-[var(--color-mint-100)]", iconColor: "text-[var(--color-mint-400)]" },
};

export default async function BasindaBizPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Basında Biz"
        title="Yayın ve Röportajlar"
        description="Yıllar içinde basında yayınlanan söyleşiler, röportajlar ve çocuk sağlığı üzerine paylaşımlar."
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MEDIA_ITEMS.map((m, idx) => {
              const tone = TONE_BG[m.tone];
              return (
                <Reveal key={m.title + idx} delay={idx * 0.05}>
                  <article className="group h-full rounded-3xl bg-white border border-[var(--color-ink-100)] hover:border-[var(--color-sky-200)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-soft-lg)] transition-all overflow-hidden">
                    <div className={`aspect-[16/10] flex items-center justify-center ${tone.bg}`}>
                      <m.Icon className={`size-14 ${tone.iconColor}`} strokeWidth={1.4} />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                        {m.type}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-pretty">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-700)] text-pretty">
                        {m.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                        <ExternalLink className="size-3.5" />
                        Yayın detayları yakında
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-10 text-center text-sm text-[var(--color-muted)] max-w-xl mx-auto">
              Bu bölümdeki görseller ve detaylar admin panel üzerinden eklenecektir.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
