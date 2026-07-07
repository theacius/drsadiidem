import { getTranslations } from "next-intl/server";
import { getResolvedSiteContent } from "@/lib/site-content";
import { DoctorApproachModern } from "@/components/sections/home/DoctorApproachModern";

type Props = { locale: string };

export async function DoctorApproach({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.approach" });
  const c = await getResolvedSiteContent(locale);
  const infoCards = t.raw("infoCards") as Array<{ title: string; body: string }>;

  return (
    <DoctorApproachModern
      label={t("label")}
      title={t("title")}
      description={t("description")}
      ctaAbout={t("ctaAbout")}
      ctaContact={t("ctaContact")}
      infoCards={infoCards}
      portraitSrc={c.portrait.src}
      portraitAlt={c.portrait.alt}
    />
  );
}
