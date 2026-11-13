// Facts about each language edition of the audiobook — the one place to fill them in.
// The facts box on the page, the Audiobook JSON-LD and /llms.txt all read from here,
// so a confirmed ISBN or release date shows up everywhere at once.

import type { Locale } from "./i18n/config";
import { ISBN } from "./chapters";

export type Edition = {
  /** Language of the recording (BCP 47). */
  inLanguage: string;
  /** ISBN of this audiobook edition. Leave unset until the publisher confirms it. */
  isbn?: string;
  /** Release date of this audiobook edition, YYYY-MM-DD. Leave unset until confirmed. */
  datePublished?: string;
  /** Whether the reviews shown on this page are of this edition (only then do they go into JSON-LD). */
  ratedByPageReviews: boolean;
};

export const EDITIONS: Record<Locale, Edition> = {
  en: { inLanguage: "en", isbn: ISBN, ratedByPageReviews: true },
  // German edition (Inaudio). Retailer listings point to 24 Nov 2026 and an ISBN of its own:
  // add both here once the publisher confirms them.
  de: { inLanguage: "de", ratedByPageReviews: false },
};

/**
 * When the site's content last changed in a way that matters to search engines.
 * The sitemap reports it as `lastmod`, so bump it when you change the page copy or facts —
 * not on every deploy.
 */
export const SITE_UPDATED = "2026-11-13";

/** True while the edition has a release date that is still ahead (evaluated at build time). */
export function isUpcoming(edition: Edition, now = new Date()): boolean {
  return !!edition.datePublished && new Date(`${edition.datePublished}T00:00:00Z`) > now;
}
