import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { loadGalleryVideoPage, loadGalleryVideos } from "@/lib/site-gallery";
import { VideoGalleryExperience } from "@/components/gallery/VideoGalleryExperience";

type Props = { params: Promise<{ locale: string }> };

export default async function VideoGaleriPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = await loadGalleryVideoPage();
  const videos = await loadGalleryVideos();

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
          <VideoGalleryExperience videos={videos} locale={locale} />
        </Container>
      </Section>
    </>
  );
}
