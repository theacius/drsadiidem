import { getTranslations } from "next-intl/server";
import { DoctorNoteModern } from "@/components/sections/home/DoctorNoteModern";

type Props = { locale: string };

export async function DoctorNote({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.doctorNote" });

  return (
    <DoctorNoteModern
      eyebrow={t("eyebrow")}
      greeting={t("greeting")}
      body={t("body")}
      highlight={t("highlight")}
    />
  );
}
