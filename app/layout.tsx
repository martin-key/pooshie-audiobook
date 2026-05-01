import type { Metadata, Viewport } from "next";
import { Cardo, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/env";
import { buildOrgJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

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

export const viewport: Viewport = {
  themeColor: "#FFF8EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pooshie · A bedtime audiobook for ages 4–8",
    template: "%s · Pooshie",
  },
  description:
    "A 13-chapter children's audiobook about a little pink hedgehog whose spines don't prick. Real human narration, 5–8 minute chapters, total 2h 14m. Listen to the first chapter free.",
  applicationName: "Pooshie",
  keywords: [
    "children's audiobook",
    "bedtime stories",
    "audiobook for kids",
    "ages 4-8",
    "pooshie",
    "hedgehog story",
    "kindness stories",
    "sleep stories for children",
    "audible kids audiobook",
    "free audiobook chapter",
  ],
  authors: [{ name: "Mr. Push" }],
  creator: "Mr. Push",
  publisher: "Pooshie",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Pooshie",
    title: "Pooshie · A bedtime audiobook for ages 4–8",
    description:
      "A 13-chapter children's audiobook. Gentle bedtime stories, real human narration, 2h 14m total. Free first chapter — no signup.",
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Pooshie — a watercolor portrait of a little pink hedgehog",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooshie · A bedtime audiobook for ages 4–8",
    description:
      "A 13-chapter children's audiobook. Free first chapter, no signup.",
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
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "Children's Audiobook",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cardo.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrgJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteJsonLd()) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
