import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { SITE_UPDATED } from "@/lib/editions";
import { alternateLanguages, LOCALES, localePath } from "@/lib/i18n";

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(alternateLanguages()).map(([lang, path]) => [lang, abs(path)]),
  );
  return LOCALES.map((locale) => ({
    url: abs(localePath(locale)),
    // The date the content last changed, not the build time — see SITE_UPDATED.
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
