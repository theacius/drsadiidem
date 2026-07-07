import { getPublishedServiceCards } from "@/lib/services-catalog";
import { ServicesCarousel } from "@/components/sections/home/ServicesCarousel";

export async function ServicesCarouselSection({ locale }: { locale: string }) {
  const services = await getPublishedServiceCards(locale);
  return <ServicesCarousel services={services} />;
}
