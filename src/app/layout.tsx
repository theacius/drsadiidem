import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadiidem.com.tr";

const SITE_TITLE_DEFAULT = "Dr. Şadi İdem — Çocuk Sağlığı ve Hastalıkları Uzmanı";

const SITE_DESCRIPTION =
  "Eskişehir'de 29 yıllık deneyimle yenidoğan, çocuk gelişimi, alerji ve astım takibi. Özgürlükçü, çocuk odaklı pediatri yaklaşımı.";

/** Arama ve dizinler için konuyla ilişkili terimler (TR ağırlıklı + İngilizce eşdeğerler). */
const SITE_KEYWORDS = [
  "Dr. Şadi İdem",
  "Şadi İdem",
  "doktor",
  "hekim",
  "uzman doktor",
  "çocuk doktoru",
  "çocuk hekimi",
  "çocuk doktoru Eskişehir",
  "Eskişehir çocuk doktoru",
  "Eskişehir çocuk sağlığı",
  "pediatrist",
  "pediatrist Eskişehir",
  "pediatri",
  "pediatri uzmanı",
  "pediatrician",
  "pediatrician Eskişehir",
  "pediatric specialist",
  "child doctor",
  "children's doctor",
  "çocuk sağlığı",
  "çocuk hastalıkları",
  "çocuk hastalıkları uzmanı",
  "yenidoğan",
  "yenidoğan doktoru",
  "yenidoğan takibi",
  "bebek doktoru",
  "bebek doktoru Eskişehir",
  "infant care",
  "çocuk muayenesi",
  "çocuk muayenehanesi",
  "çocuk polikliniği",
  "çocuk gelişimi",
  "gelişim değerlendirmesi",
  "aşı",
  "aşı takibi",
  "bağışıklık",
  "alerji çocuk",
  "çocukta alerji",
  "astım çocuk",
  "çocukta astım",
  "solunum yolu enfeksiyonu çocuk",
  "Eskişehir doktor",
  "Eskişehir pediatrist",
  "Eskişehir özel muayenehane",
  "ebeveyn danışmanlığı",
  "ebeveyn atölyesi",
  "fonksiyonel tıp çocuk",
  "beslenme danışmanlığı çocuk",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s · Dr. Şadi İdem",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Dr. Şadi İdem", url: SITE_URL }],
  creator: "Dr. Şadi İdem",
  publisher: "Dr. Şadi İdem",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Dr. Şadi İdem",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
