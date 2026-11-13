// External destinations for the listen / read CTAs.
// This file is the single source of truth for every off-site link on the page —
// social profiles, audiobook storefronts, and the Kindle editions.
//
// Client-supplied URLs arrive with Google Shopping `?srsltid=` click tokens
// attached; those are stripped here so the links stay clean and shareable.

import type { Locale } from "./i18n/config";
import type { RegionKey } from "./i18n/types";

export type ExternalLink = {
  /** Storefront / network name as it should be shown. */
  name: string;
  /** Small secondary label — usually a country or a "how it works" hint. Translated via `platforms.regions`. */
  region: RegionKey;
  /** Tighter label for the compact badge row under the player. Defaults to `region`. */
  short?: RegionKey;
  href: string;
  /** Brand colour for the badge dot. */
  color: string;
  /** Single character shown inside the badge dot. */
  glyph: string;
};

export const SOCIAL_LINKS = {
  facebook:
    "https://www.facebook.com/people/The-tales-of-Pooshie-and-Kitty/100063804714614/",
  instagram: "https://www.instagram.com/the.tales.of.pooshie/",
  youtube: "https://www.youtube.com/@Pooshiethehedgehog",
} as const;

/** English-language audiobook storefronts. */
export const AUDIOBOOK_PLATFORMS: ExternalLink[] = [
  {
    name: "Audible",
    region: "us",
    href: "https://www.audible.com/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQWJFYF",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Audible",
    region: "uk",
    href: "https://www.audible.co.uk/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQHP4Q1",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Audible",
    region: "ca",
    href: "https://www.audible.ca/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQRHHRH",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Libro.fm",
    region: "indie",
    short: "indieShort",
    href: "https://libro.fm/audiobooks/9786199147306-the-tales-of-pooshie-and-kitty",
    color: "#14827E",
    glyph: "L",
  },
  {
    name: "Everand",
    region: "subscription",
    short: "subscriptionShort",
    href: "https://www.everand.com/audiobook/1047353305/The-tales-of-Pooshie-and-Kitty-Pooshie-is-a-little-pink-hedgehog-with-a-big-heart-Together-with-his-best-friend-Kitty-he-goes-on-gentle-adventures",
    color: "#0E7C7B",
    glyph: "E",
  },
  {
    name: "hoopla",
    region: "library",
    short: "libraryShort",
    href: "https://www.hoopladigital.com/audiobook/19929061",
    color: "#38A3D1",
    glyph: "h",
  },
  {
    name: "Kobo",
    region: "kobo",
    href: "https://www.kobo.com/ca/en/audiobook/tales-of-pooshie-and-kitty-the",
    color: "#C8102E",
    glyph: "K",
  },
  {
    name: "laFeltrinelli",
    region: "it",
    href: "https://www.lafeltrinelli.it/tales-of-pooshie-kitty-audiobook-mr-push/e/9786199147306",
    color: "#E30613",
    glyph: "F",
  },
  {
    name: "IBS.it",
    region: "it",
    href: "https://www.ibs.it/tales-of-pooshie-kitty-audiobook-mr-push/e/9786199147306",
    color: "#1B4F9C",
    glyph: "I",
  },
];

/** Bulgarian-language edition — "Разкази за Пуши и Кити". */
export const BULGARIAN_PLATFORMS: ExternalLink[] = [
  {
    name: "Storytel",
    region: "bgTitle",
    short: "bgShort",
    href: "https://www.storytel.com/bg/books/разкази-за-пуши-и-кити-1427185",
    color: "#E8434B",
    glyph: "S",
  },
];

/** Kindle editions of the illustrated book. */
export const EBOOK_PLATFORMS: ExternalLink[] = [
  {
    name: "Amazon.com",
    region: "us",
    href: "https://www.amazon.com/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.co.uk",
    region: "uk",
    href: "https://www.amazon.co.uk/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.it",
    region: "it",
    href: "https://www.amazon.it/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.com.br",
    region: "br",
    href: "https://www.amazon.com.br/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
];

/** The handful of badges shown under the free-chapter player. */
export const FEATURED_PLATFORMS: ExternalLink[] = [
  AUDIOBOOK_PLATFORMS[0], // Audible US
  AUDIOBOOK_PLATFORMS[3], // Libro.fm
  AUDIOBOOK_PLATFORMS[4], // Everand
  AUDIOBOOK_PLATFORMS[5], // hoopla
  AUDIOBOOK_PLATFORMS[6], // Kobo
  BULGARIAN_PLATFORMS[0], // Storytel
];

/** Every storefront, for JSON-LD `sameAs` / llms.txt style listings. */
export const ALL_PLATFORMS: ExternalLink[] = [
  ...AUDIOBOOK_PLATFORMS,
  ...BULGARIAN_PLATFORMS,
  ...EBOOK_PLATFORMS,
];

/**
 * German edition — „Erzählungen über Puschi und Kitty“, read by Melina Camus,
 * distributed by Inaudio. Put Audible.de first: the German page shows the first
 * link as its one main button and the rest as smaller tiles.
 * Empty until the audiobook is live; the German page shows a "coming soon" note meanwhile.
 */
export const GERMAN_AUDIOBOOK_PLATFORMS: ExternalLink[] = [];

/** German Kindle edition (ASIN B0HRFYL6SK, published 12 Nov 2026). */
export const GERMAN_EBOOK_PLATFORMS: ExternalLink[] = [
  {
    name: "Amazon.de",
    region: "de",
    href: "https://www.amazon.de/dp/B0HRFYL6SK",
    color: "#FF9900",
    glyph: "a",
  },
];

/** Which storefronts each page language shows, and where. */
export type Storefronts = {
  /** The audiobook edition in the page's language. */
  audiobook: ExternalLink[];
  /** Show the first audiobook link as a big button — one clear call to action. */
  primaryFirst: boolean;
  /** Ebook edition(s) in the page's language. */
  ebook: ExternalLink[];
  /** Editions in other languages, in a smaller card. */
  otherEditions: ExternalLink[];
  /** Badges under the free-chapter player; their names also close the final call to action. */
  featured: ExternalLink[];
  footerListen: ExternalLink[];
  footerAlso: ExternalLink[];
  /** Every storefront of this edition, for JSON-LD `sameAs`. */
  sameAs: ExternalLink[];
};

export const STOREFRONTS: Record<Locale, Storefronts> = {
  en: {
    audiobook: AUDIOBOOK_PLATFORMS,
    primaryFirst: false,
    ebook: EBOOK_PLATFORMS,
    otherEditions: BULGARIAN_PLATFORMS,
    featured: FEATURED_PLATFORMS,
    footerListen: AUDIOBOOK_PLATFORMS.slice(0, 7), // Audible US/UK/CA, Libro.fm, Everand, hoopla, Kobo
    footerAlso: [BULGARIAN_PLATFORMS[0], EBOOK_PLATFORMS[0]],
    sameAs: ALL_PLATFORMS,
  },
  de: {
    audiobook: GERMAN_AUDIOBOOK_PLATFORMS,
    primaryFirst: true,
    ebook: GERMAN_EBOOK_PLATFORMS,
    otherEditions: [AUDIOBOOK_PLATFORMS[0], BULGARIAN_PLATFORMS[0]], // English (Audible US), Bulgarian (Storytel)
    featured: GERMAN_AUDIOBOOK_PLATFORMS.slice(0, 6),
    footerListen: GERMAN_AUDIOBOOK_PLATFORMS.slice(0, 7),
    footerAlso: [GERMAN_EBOOK_PLATFORMS[0], AUDIOBOOK_PLATFORMS[0], BULGARIAN_PLATFORMS[0]],
    sameAs: [...GERMAN_AUDIOBOOK_PLATFORMS, ...GERMAN_EBOOK_PLATFORMS],
  },
};

/**
 * Free chapter audio per site language: the file, the language it is recorded in, and the
 * file's own length (mm:ss). The length can differ from the chapter's listed duration —
 * the site's English file runs longer than the 6:48 in the chapter list.
 * The Audiobook JSON-LD only announces the recording when its language matches the edition.
 */
export const CHAPTER_1_AUDIO: Record<Locale, { src: string; inLanguage: string; duration: string }> = {
  en: { src: "/audio/chapter-1.mp3", inLanguage: "en", duration: "8:16" },
  // Melina Camus, „Der Anfang“ (MP3, 192 kbps).
  de: { src: "/audio/chapter-1-de.mp3", inLanguage: "de", duration: "8:39" },
};
