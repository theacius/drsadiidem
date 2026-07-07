import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CareerForm } from "@/components/forms/CareerForm";
import { Briefcase, GraduationCap, Heart } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function InsanKaynaklariPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="İnsan Kaynakları"
        title="Polikliniğimizde Görev Almak İster misiniz?"
        description="Çocuk odaklı, sıcak ve düzenli bir poliklinik ortamında görev almak istiyorsanız, formu doldurarak başvurunuzu iletebilirsiniz."
      />

      <Section>
        <Container className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">
                Aradığımız özellikler
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-6 space-y-4">
                {[
                  { Icon: Heart, title: "Çocuklara sıcak yaklaşım", body: "Empati ve sabır temel niteliklerimizdir." },
                  { Icon: GraduationCap, title: "Mesleki yetkinlik", body: "Alanında eğitim ve deneyim önemlidir." },
                  { Icon: Briefcase, title: "Takım çalışması", body: "Düzenli, paylaşımcı, sorumluluk alabilen bir profil ararız." },
                ].map(({ Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3 rounded-2xl bg-[var(--color-cream-100)] p-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-sky-100)] text-[var(--color-sky-500)] shrink-0">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-0.5 text-sm text-[var(--color-ink-700)]">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal from="right">
              <CareerForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
