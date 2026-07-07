import { getTranslations } from "next-intl/server";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { loadKlinikGalleryPhotos } from "@/lib/site-gallery";

export async function ClinicPreview() {
  const t = await getTranslations("home.clinic");

  let photos: { imageUrl: string; altTr: string | null }[] = [];
  try {
    photos = await loadKlinikGalleryPhotos();
  } catch {
    photos = [];
  }

  const fallback = [
    { imageUrl: "/uploads/gallery/klinik-giris-tabela.png", altTr: "Muayenehane girişi" },
    { imageUrl: "/uploads/gallery/klinik-bekleme-alani.png", altTr: "Bekleme alanı" },
  ];
  const display = photos.length > 0 ? photos : fallback;
  const gridClass =
    display.length >= 3
      ? "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      : "mt-10 grid gap-5 md:grid-cols-2";

  return (
    <Section id="klinikten" className="bg-white">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-ink-900)]">
              {t("title")}
            </h2>
            <p className="mt-3 text-[var(--color-muted)] max-w-xl mx-auto">{t("subtitle")}</p>
          </div>
        </Reveal>
        <div className={gridClass}>
          {display.map((photo, i) => (
            <Reveal key={`${photo.imageUrl}-${i}`} delay={0.06 * i}>
              <div className="relative aspect-[16/10] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-ink-100)] shadow-[var(--shadow-soft)] bg-[var(--color-cream-200)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.altTr ?? t("title")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
