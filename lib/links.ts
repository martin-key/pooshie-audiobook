// External destinations for the listen / read CTAs.
// This file is the single source of truth for every off-site link on the page —
// social profiles, audiobook storefronts, and the Kindle editions.
//
// Client-supplied URLs arrive with Google Shopping `?srsltid=` click tokens
// attached; those are stripped here so the links stay clean and shareable.

export type ExternalLink = {
  /** Storefront / network name as it should be shown. */
  name: string;
  /** Small secondary label — usually a country or a "how it works" hint. */
  region: string;
  /** Tighter label for the compact badge row under the player. Defaults to `region`. */
  short?: string;
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
    region: "United States",
    href: "https://www.audible.com/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQWJFYF",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Audible",
    region: "United Kingdom",
    href: "https://www.audible.co.uk/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQHP4Q1",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Audible",
    region: "Canada",
    href: "https://www.audible.ca/pd/The-Tales-of-Pooshie-and-Kitty-Audiobook/B0HCQRHHRH",
    color: "#F8991C",
    glyph: "A",
  },
  {
    name: "Libro.fm",
    region: "Supports indie bookshops",
    short: "Indie bookshops",
    href: "https://libro.fm/audiobooks/9786199147306-the-tales-of-pooshie-and-kitty",
    color: "#14827E",
    glyph: "L",
  },
  {
    name: "Everand",
    region: "Included with a subscription",
    short: "Subscription",
    href: "https://www.everand.com/audiobook/1047353305/The-tales-of-Pooshie-and-Kitty-Pooshie-is-a-little-pink-hedgehog-with-a-big-heart-Together-with-his-best-friend-Kitty-he-goes-on-gentle-adventures",
    color: "#0E7C7B",
    glyph: "E",
  },
  {
    name: "hoopla",
    region: "Free with a library card",
    short: "Library card",
    href: "https://www.hoopladigital.com/audiobook/19929061",
    color: "#38A3D1",
    glyph: "h",
  },
  {
    name: "Kobo",
    region: "Rakuten Kobo",
    href: "https://www.kobo.com/ca/en/audiobook/tales-of-pooshie-and-kitty-the",
    color: "#C8102E",
    glyph: "K",
  },
  {
    name: "laFeltrinelli",
    region: "Italy",
    href: "https://www.lafeltrinelli.it/tales-of-pooshie-kitty-audiobook-mr-push/e/9786199147306",
    color: "#E30613",
    glyph: "F",
  },
  {
    name: "IBS.it",
    region: "Italy",
    href: "https://www.ibs.it/tales-of-pooshie-kitty-audiobook-mr-push/e/9786199147306",
    color: "#1B4F9C",
    glyph: "I",
  },
];

/** Bulgarian-language edition — "Разкази за Пуши и Кити". */
export const BULGARIAN_PLATFORMS: ExternalLink[] = [
  {
    name: "Storytel",
    region: "Разкази за Пуши и Кити",
    short: "На български",
    href: "https://www.storytel.com/bg/books/разкази-за-пуши-и-кити-1427185",
    color: "#E8434B",
    glyph: "S",
  },
];

/** Kindle editions of the illustrated book. */
export const EBOOK_PLATFORMS: ExternalLink[] = [
  {
    name: "Amazon.com",
    region: "United States",
    href: "https://www.amazon.com/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.co.uk",
    region: "United Kingdom",
    href: "https://www.amazon.co.uk/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.it",
    region: "Italy",
    href: "https://www.amazon.it/Tales-Pooshie-Kitty-Kindness-Friendship-ebook/dp/B0H24JNV45",
    color: "#FF9900",
    glyph: "a",
  },
  {
    name: "Amazon.com.br",
    region: "Brazil",
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

// Free chapter audio source
export const CHAPTER_1_AUDIO_SRC = "/audio/chapter-1.mp3";
