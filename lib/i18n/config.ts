// Locale configuration — the one place to register a new language.
//
// To add a language:
//   1. add its code to LOCALES and an entry to LOCALE_META below,
//   2. create lib/i18n/dictionaries/<code>.ts typed as `Dictionary`,
//   3. register it in lib/i18n/index.ts.
// Routing, the language switcher, hreflang tags and the sitemap pick it up from here.

export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

/** Served at the unprefixed root (`/`). Every other locale lives under `/<code>`. */
export const DEFAULT_LOCALE: Locale = "en";

/** Remembers a language the visitor picked in the switcher, so the proxy stops guessing. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  de: { label: "Deutsch", short: "DE", htmlLang: "de", ogLocale: "de_DE" },
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Public path of `path` in `locale`: `/` → `/` for English, `/de` for German. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** hreflang map for `path`, including `x-default` (the default locale). */
export function alternateLanguages(path = "/"): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of LOCALES) map[LOCALE_META[l].htmlLang] = localePath(l, path);
  map["x-default"] = localePath(DEFAULT_LOCALE, path);
  return map;
}

/** Best supported locale for an `Accept-Language` header, falling back to the default. */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return { base: tag.trim().toLowerCase().split("-")[0], weight: Number.isFinite(weight) ? weight : 0, i };
    })
    .filter((x) => x.base && x.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.i - b.i);

  for (const { base } of ranked) {
    if (hasLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
