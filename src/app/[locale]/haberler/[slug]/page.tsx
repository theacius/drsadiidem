import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function HaberlerSlugRedirect({ params }: Props) {
  const { locale, slug } = await params;
  redirect({ href: `/blog/${slug}`, locale });
}
