import { getPublishedPressMarqueeItems } from "@/lib/press-marquee";
import { PressMarquee } from "@/components/sections/PressMarquee";

export async function Press({ locale }: { locale: string }) {
  const items = await getPublishedPressMarqueeItems(locale);
  return <PressMarquee items={items} />;
}
