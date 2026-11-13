import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import {
  alternateLanguages,
  DEFAULT_LOCALE,
  format,
  getDictionary,
  hasLocale,
  localePath,
  LOCALES,
  pickLocale,
} from "@/lib/i18n";
import { CHAPTER_META, localizeChapters } from "@/lib/chapters";
import { STOREFRONTS } from "@/lib/links";
import { proxy } from "@/proxy";

/** Every key path in an object, with array lengths, so two dictionaries can be compared. */
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) {
    return [`${path}[${value.length}]`, ...value.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  }
  return [path];
}

describe("dictionaries", () => {
  const en = getDictionary("en");

  it.each(LOCALES)("%s has exactly the same keys as English", (locale) => {
    expect(shape(getDictionary(locale))).toEqual(shape(en));
  });

  it.each(LOCALES)("%s has no empty strings (except optional notes)", (locale) => {
    const dict = getDictionary(locale);
    const walk = (v: unknown, path: string): string[] =>
      typeof v === "string"
        ? v.trim() === "" && path !== "reviews.translatedNote" ? [path] : []
        : v && typeof v === "object"
          ? Object.entries(v).flatMap(([k, x]) => walk(x, path ? `${path}.${k}` : k))
          : [];
    expect(walk(dict, "")).toEqual([]);
  });

  it.each(LOCALES)("%s has a title and blurb for every chapter", (locale) => {
    expect(getDictionary(locale).chapters).toHaveLength(CHAPTER_META.length);
  });

  it.each(LOCALES)("%s labels every storefront", (locale) => {
    const regions = getDictionary(locale).platforms.regions;
    const all = Object.values(STOREFRONTS).flatMap((s) => [
      ...s.audiobook, ...s.ebook, ...s.otherEditions, ...s.featured, ...s.footerListen, ...s.footerAlso,
    ]);
    for (const pl of all) {
      expect(regions[pl.region]).toBeTruthy();
      if (pl.short) expect(regions[pl.short]).toBeTruthy();
    }
  });

  it("uses the German chapter titles of the book", () => {
    expect(localizeChapters(getDictionary("de").chapters).map((c) => c.title)).toEqual([
      "Der Anfang",
      "Die Pilze von Billy und Russell",
      "Joe der Wolf",
      "Der Regentropfen",
      "Ein Bauchblick in beige-rosa",
      "Tante Elsa",
      "Wolkig",
      "Der Schmetterling",
      "Die schläfrige Schlange",
      "Der Fluss",
      "Geburtstag am 22sten",
      "Weihnachtsgeschenk",
      "Das Hügelchen",
    ]);
  });

  it("names the friends in German", () => {
    expect(getDictionary("de").friends.list.map((f) => f.name)).toEqual([
      "Puschi",
      "Kitty",
      "Joe der Wolf",
      "Der Regentropfen",
    ]);
  });
});

describe("locale helpers", () => {
  it("keeps English unprefixed and prefixes other locales", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(localePath("en")).toBe("/");
    expect(localePath("de")).toBe("/de");
    expect(localePath("de", "/privacy")).toBe("/de/privacy");
    expect(localePath("en", "privacy")).toBe("/privacy");
  });

  it("lists hreflang alternates with an x-default", () => {
    expect(alternateLanguages()).toEqual({ en: "/", de: "/de", "x-default": "/" });
  });

  it("validates locale codes", () => {
    expect(hasLocale("de")).toBe(true);
    expect(hasLocale("fr")).toBe(false);
    expect(hasLocale(undefined)).toBe(false);
  });

  it("picks the best supported language from Accept-Language", () => {
    expect(pickLocale("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
    expect(pickLocale("de-AT")).toBe("de");
    expect(pickLocale("fr-FR,fr;q=0.9,de;q=0.7,en;q=0.5")).toBe("de");
    expect(pickLocale("en-GB,de;q=0.4")).toBe("en");
    expect(pickLocale("fr")).toBe("en");
    expect(pickLocale("de;q=0,en")).toBe("en");
    expect(pickLocale(null)).toBe("en");
  });

  it("fills placeholders", () => {
    expect(format("Kapitel {n}: {title}", { n: 1, title: "Der Anfang" })).toBe("Kapitel 1: Der Anfang");
    expect(format("{missing} stays", {})).toBe("{missing} stays");
  });
});

describe("proxy", () => {
  const req = (path: string, headers: Record<string, string> = {}) =>
    new NextRequest(new URL(path, "https://audiobook.pooshie.net"), { headers });

  it("serves English at / by rewriting to /en", () => {
    const res = proxy(req("/", { "accept-language": "en-US,en;q=0.9" }));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://audiobook.pooshie.net/en");
  });

  it("sends a German browser from / to /de on the first visit", () => {
    const res = proxy(req("/", { "accept-language": "de-DE,de;q=0.9" }));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://audiobook.pooshie.net/de");
  });

  it("respects a language picked in the switcher over the browser language", () => {
    const res = proxy(req("/", { "accept-language": "de-DE", cookie: "NEXT_LOCALE=en" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://audiobook.pooshie.net/en");
  });

  it("passes /de through untouched", () => {
    const res = proxy(req("/de"));
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("redirects /en URLs to their unprefixed address", () => {
    expect(proxy(req("/en")).headers.get("location")).toBe("https://audiobook.pooshie.net/");
    const deep = proxy(req("/en/privacy?x=1"));
    expect(deep.status).toBe(308);
    expect(deep.headers.get("location")).toBe("https://audiobook.pooshie.net/privacy?x=1");
  });

  it("does not redirect deep links by browser language", () => {
    const res = proxy(req("/privacy", { "accept-language": "de" }));
    expect(res.headers.get("x-middleware-rewrite")).toBe("https://audiobook.pooshie.net/en/privacy");
  });
});
