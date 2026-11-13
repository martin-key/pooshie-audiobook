import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cardo, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/env";
import { getDictionary, hasLocale, LOCALE_META, LOCALES, localePath } from "@/lib/i18n";
import { buildOrgJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import "../globals.css";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

type Params = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#FFF8EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta: t, common } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.siteTitle,
      template: t.titleTemplate,
    },
    description: t.siteDescription,
    applicationName: common.brand,
    keywords: t.keywords,
    authors: [{ name: "Mr. Push" }],
    creator: "Mr. Push",
    publisher: common.brand,
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      siteName: common.brand,
      title: t.siteTitle,
      description: t.ogDescription,
      url: localePath(lang),
      locale: LOCALE_META[lang].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => LOCALE_META[l].ogLocale),
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: t.ogImageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.twitterDescription,
      images: ["/og-default.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    category: t.category,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & Params>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={LOCALE_META[lang].htmlLang} className={`${cardo.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrgJsonLd(lang)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd(lang)) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
