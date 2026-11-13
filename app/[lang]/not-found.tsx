import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { getDictionary, LOCALES, type Dictionary, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

// not-found.tsx gets no route params, so the client view picks the copy for the
// current [lang] itself. Only the small notFound block of each language is sent.
export default function NotFound() {
  const copies = Object.fromEntries(
    LOCALES.map((l) => [l, getDictionary(l).notFound]),
  ) as Record<Locale, Dictionary["notFound"]>;
  return <NotFoundView copies={copies} />;
}
