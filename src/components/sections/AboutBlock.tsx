import { getTranslations } from "next-intl/server";
import { AboutBlockVisual } from "@/components/sections/AboutBlockVisual";
import type { DoctorNoteContent } from "@/components/sections/DoctorNote";

type Props = {
  locale: string;
  portrait: { src: string; alt: string };
  eyebrow: string;
  title: string;
  biography: string;
  doctorNote: DoctorNoteContent;
};

export async function AboutBlock({
  locale,
  portrait,
  eyebrow,
  title,
  biography,
  doctorNote,
}: Props) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tSite = await getTranslations({ locale, namespace: "site" });

  return (
    <AboutBlockVisual
      eyebrow={eyebrow}
      title={title}
      biography={biography}
      doctorName={tSite("name")}
      specialty={tSite("specialty")}
      cta={t("cta")}
      portraitSrc={portrait.src}
      portraitAlt={portrait.alt}
      doctorNote={doctorNote}
    />
  );
}
