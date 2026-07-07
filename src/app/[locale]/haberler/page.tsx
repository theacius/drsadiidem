import { redirect } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Eski URL: /haberler → /blog */
export default async function HaberlerRedirect({ params }: Props) {
  const { locale } = await params;
  redirect({ href: "/blog", locale });
}
