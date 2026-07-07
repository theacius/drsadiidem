import { Suspense } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ThemeStyle } from "@/components/site/ThemeStyle";
import { loadSiteAppearance } from "@/lib/site-appearance";
import { loadLvpePageDocument } from "@/lib/lvpe-storage";
import {
  pickHeaderLogoLvpe,
} from "@/lib/lvpe-merge-home";
import { getMegaMenuServiceCovers } from "@/lib/nav-mega-menu";
import { getResolvedNavigationBundle } from "@/lib/site-navigation";
import { getResolvedSiteContent } from "@/lib/site-content";
import { LiveVisualGate } from "@/live-visual-editor/LiveVisualGate";
import { LvpePublishedHydrate } from "@/live-visual-editor/LvpePublishedHydrate";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const appearance = await loadSiteAppearance();
  const homeLvpe = await loadLvpePageDocument("home", locale);
  const lvpeChanges = homeLvpe.changes ?? {};
  const headerLogoLvpe = pickHeaderLogoLvpe(lvpeChanges);
  const lvpeLogoSrc = headerLogoLvpe.src ?? null;
  const [{ items: resolvedNav, headerNav }, siteContent, megaMenuServiceCovers] =
    await Promise.all([
      getResolvedNavigationBundle(locale),
      getResolvedSiteContent(locale),
      getMegaMenuServiceCovers(),
    ]);
  const logoAlt =
    locale === "tr"
      ? appearance.logoAltTr?.trim() || undefined
      : appearance.logoAltEn?.trim() || appearance.logoAltTr?.trim() || undefined;

  return (
    <div lang={locale} dir="ltr" className="flex min-h-full flex-1 flex-col">
      <ThemeStyle />
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Header
          resolvedNav={resolvedNav}
          headerNav={headerNav}
          logoUrl={lvpeLogoSrc ?? appearance.logoUrl}
          logoAlt={
            typeof headerLogoLvpe.alt === "string" && headerLogoLvpe.alt.trim()
              ? headerLogoLvpe.alt.trim()
              : logoAlt
          }
          logoImageLvpe={headerLogoLvpe}
          megaMenuPortrait={siteContent.portrait}
          megaMenuServiceCovers={megaMenuServiceCovers}
        />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <FloatingActions />
        <Suspense fallback={null}>
          <LiveVisualGate />
          <LvpePublishedHydrate locale={locale} />
        </Suspense>
      </NextIntlClientProvider>
    </div>
  );
}
