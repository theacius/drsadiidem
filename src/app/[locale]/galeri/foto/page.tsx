import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { loadGalleryPhotoPage, loadGalleryPhotoSections } from "@/lib/site-gallery";
import { PhotoGallerySections } from "@/components/gallery/PhotoGallerySections";

type Props = { params: Promise<{ locale: string }> };

export default async function FotoGaleriPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await loadGalleryPhotoPage();
  const sections = await loadGalleryPhotoSections(locale);

  const preferEn = locale !== "tr";
  const eyebrow = preferEn ? page.eyebrowEn?.trim() || page.eyebrowTr : page.eyebrowTr;
  const title = preferEn ? page.titleEn?.trim() || page.titleTr : page.titleTr;
  const description = preferEn
    ? page.descriptionEn?.trim() || page.descriptionTr
    : page.descriptionTr;

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />

      <Section>
        <Container>
          <PhotoGallerySections sections={sections} />
        </Container>
      </Section>
    </>
  );
}
