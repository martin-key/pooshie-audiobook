import { SITE_URL } from "./env";
import { AGE_RANGE, AUTHOR, ISBN, localizeChapters, TOTAL_RUNTIME_ISO } from "./chapters";
import { SOCIAL_LINKS, STOREFRONTS } from "./links";
import { getDictionary, LOCALE_META, LOCALES, localePath, type Locale } from "./i18n";

/**
 * The edition each page language describes. The German edition's ISBN isn't known yet,
 * and its reviews on the page are translated English-edition reviews, so they stay out
 * of its structured data until it has reviews of its own.
 */
const EDITIONS: Record<Locale, { inLanguage: string; isbn?: string; ratedByPageReviews: boolean }> = {
  en: { inLanguage: "en", isbn: ISBN, ratedByPageReviews: true },
  de: { inLanguage: "de", ratedByPageReviews: false },
};

/** Character/brand name on this page, plus the names used in other languages. */
function brandNames(locale: Locale): { name: string; alternateName: string[] } {
  const name = getDictionary(locale).common.brand;
  const others = LOCALES.map((l) => getDictionary(l).common.brand).filter((b) => b !== name);
  return { name, alternateName: [...new Set(others)] };
}

type JsonLd = Record<string, unknown>;

/** Absolute URL of the home page in `locale`, without a trailing slash. */
function pageUrl(locale: Locale): string {
  const path = localePath(locale);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function buildOrgJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...brandNames(locale),
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: Object.values(SOCIAL_LINKS),
    description: getDictionary(locale).seo.orgDescription,
  };
}

export function buildBreadcrumbJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: getDictionary(locale).seo.breadcrumbHome,
        item: pageUrl(locale),
      },
    ],
  };
}

export function buildAudiobookJsonLd(locale: Locale): JsonLd {
  const dict = getDictionary(locale);
  const reviews = dict.reviews.items;
  const url = pageUrl(locale);
  const edition = EDITIONS[locale];
  const brand = brandNames(locale).name;

  const aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };

  const review = reviews.map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: r.author },
    ...(r.title ? { name: r.title } : {}),
    reviewBody: r.text,
    inLanguage: LOCALE_META[locale].htmlLang,
  }));

  const hasPart = localizeChapters(dict.chapters).map((c) => ({
    "@type": "Chapter",
    position: c.n,
    name: c.title,
    description: c.blurb,
    timeRequired: `PT${c.dur.split(":")[0]}M${c.dur.split(":")[1]}S`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["Audiobook", "Book"],
    "@id": `${url}#audiobook`,
    name: dict.seo.bookName,
    alternateName: dict.seo.bookAlternateName,
    description: dict.seo.bookDescription,
    inLanguage: edition.inLanguage,
    ...(edition.isbn ? { isbn: edition.isbn } : {}),
    bookFormat: "https://schema.org/AudiobookFormat",
    author: { "@type": "Person", name: AUTHOR },
    readBy: { "@type": "Person", name: dict.seo.narrator },
    duration: TOTAL_RUNTIME_ISO,
    timeRequired: TOTAL_RUNTIME_ISO,
    numberOfPages: undefined,
    typicalAgeRange: AGE_RANGE,
    genre: dict.seo.genres,
    publisher: { "@type": "Organization", name: brand, url: SITE_URL },
    image: `${SITE_URL}/og-default.jpg`,
    url,
    hasPart,
    ...(edition.ratedByPageReviews ? { aggregateRating, review } : {}),
    sameAs: STOREFRONTS[locale].sameAs.map((pl) => pl.href),
    keywords: dict.seo.keywords,
  };
}

export function buildFaqJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LOCALE_META[locale].htmlLang,
    mainEntity: getDictionary(locale).faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function buildWebsiteJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandNames(locale).name,
    url: pageUrl(locale),
    inLanguage: LOCALE_META[locale].htmlLang,
  };
}
