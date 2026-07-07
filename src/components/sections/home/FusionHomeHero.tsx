import { getTranslations } from "next-intl/server";
import { loadLvpePageDocument } from "@/lib/lvpe-storage";
import { getResolvedSiteContent } from "@/lib/site-content";
import {
  defaultFusionHomeHeroCopy,
  resolveFusionHomeHeroCopy,
} from "@/lib/lvpe-merge-home";
import { FusionHomeHeroLvpe } from "@/components/sections/home/FusionHomeHeroLvpe";

type Props = { locale: string };

/** Ana sayfa hero — poliklinik + portre; LVPE ile düzenlenebilir. */
export async function FusionHomeHero({ locale }: Props) {
  const [t, homeLvpe, siteContent] = await Promise.all([
    getTranslations("home.parallax"),
    loadLvpePageDocument("home", locale),
    getResolvedSiteContent(locale),
  ]);
  const defaults = defaultFusionHomeHeroCopy((key) => t(key), siteContent.portrait.alt);
  const copy = resolveFusionHomeHeroCopy(defaults, homeLvpe.changes ?? {});

  return <FusionHomeHeroLvpe {...copy} />;
}
