import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { alternateLanguages, LOCALES, localePath } from "@/lib/i18n";

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = Object.fromEntries(
    Object.entries(alternateLanguages()).map(([lang, path]) => [lang, abs(path)]),
  );
  return LOCALES.map((locale) => ({
    url: abs(localePath(locale)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
