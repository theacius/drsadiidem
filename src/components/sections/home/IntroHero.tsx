import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { User, LayoutGrid, MessageCircle, Heart, Plus } from "lucide-react";
import { getResolvedSiteContent } from "@/lib/site-content";

const TRUST_ICONS = [User, LayoutGrid, MessageCircle] as const;
const SIDE_ICONS = [Heart, Plus] as const;

type Props = { locale: string };

export async function IntroHero({ locale }: Props) {
  const t = await getTranslations("home.intro");
  const c = await getResolvedSiteContent(locale);
  const trustItems = t.raw("trustItems") as Array<{ title: string; body: string }>;
  const sideCards = t.raw("sideCards") as Array<{ title: string; body: string }>;

  return (
    <section className="home-intro-hero" aria-label={t("title")}>
      <Container>
        <div className="home-intro-hero__grid">
          <div className="home-intro-hero__content">
            <Reveal>
              <span className="home-intro-badge">
                <span className="home-intro-badge__dot" aria-hidden />
                {t("badge")}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="home-intro-title">{t("title")}</h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="home-intro-desc">{t("description")}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="home-intro-actions">
                <Link href="/iletisim" className="home-intro-btn home-intro-btn--primary tap-press">
                  {t("ctaAppointment")}
                </Link>
                <Link
                  href="/hizmet-alanlarimiz"
                  className="home-intro-btn home-intro-btn--secondary tap-press"
                >
                  {t("ctaServices")}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="home-intro-trust-grid">
                {trustItems.map((item, i) => {
                  const Icon = TRUST_ICONS[i] ?? User;
                  return (
                    <div key={item.title} className="home-intro-trust-card">
                      <span className="home-intro-trust-card__icon" aria-hidden>
                        <Icon className="size-[1.15rem]" strokeWidth={2.25} />
                      </span>
                      <div>
                        <p className="home-intro-trust-card__title">{item.title}</p>
                        <p className="home-intro-trust-card__body">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.06} className="home-intro-hero__visual">
            <div className="home-intro-portrait-wrap">
              <div className="home-intro-portrait">
                <Image
                  src={c.portrait.src}
                  alt={c.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 88vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
            <div className="home-intro-side-grid">
              {sideCards.map((card, i) => {
                const Icon = SIDE_ICONS[i] ?? Heart;
                return (
                  <div key={card.title} className="home-intro-side-card">
                    <span className="home-intro-side-card__icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="home-intro-side-card__title">{card.title}</p>
                      <p className="home-intro-side-card__body">{card.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
