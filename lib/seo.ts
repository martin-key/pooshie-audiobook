import { SITE_URL } from "./env";
import { AGE_RANGE, AUTHOR, localizeChapters, TOTAL_RUNTIME_ISO } from "./chapters";
import { EDITIONS, isUpcoming } from "./editions";
import { CHAPTER_1_AUDIO, SOCIAL_LINKS, STOREFRONTS } from "./links";
import { getDictionary, LOCALE_META, LOCALES, localePath, type Locale } from "./i18n";

export const CONTACT_EMAIL = "hello@pooshie.net";

/** `@id` of the one Organization node every page carries (in the layout). */
export const ORG_ID = `${SITE_URL}/#org`;

/** Character/brand name on this page, plus the names used in other languages. */
function brandNames(locale: Locale): { name: string; alternateName: string[] } {
  const name = getDictionary(locale).common.brand;
  const others = LOCALES.map((l) => getDictionary(l).common.brand).filter((b) => b !== name);
  return { name, alternateName: [...new Set(others)] };
}

type JsonLd = Record<string, unknown>;

/** Absolute URL of the home page in `locale`, without a trailing slash. */
export function pageUrl(locale: Locale): string {
  const path = localePath(locale);
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** "6:48" → "PT6M48S" */
const isoDuration = (mmss: string) => {
  const [m, s] = mmss.split(":");
  return `PT${Number(m)}M${Number(s)}S`;
};

export function buildOrgJsonLd(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    ...brandNames(locale),
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    email: CONTACT_EMAIL,
    sameAs: Object.values(SOCIAL_LINKS),
    description: getDictionary(locale).seo.orgDescription,
  };
}

export function buildAudiobookJsonLd(locale: Locale): JsonLd {
  const dict = getDictionary(locale);
  const reviews = dict.reviews.items;
  const url = pageUrl(locale);
  const edition = EDITIONS[locale];
  const stores = STOREFRONTS[locale];

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

  const chapters = localizeChapters(dict.chapters);
  const hasPart = chapters.map((c) => ({
    "@type": "Chapter",
    position: c.n,
    name: c.title,
    description: c.blurb,
    timeRequired: isoDuration(c.dur),
  }));

  // Where the audiobook is sold. No prices: the book is sold by the storefronts, not here.
  const availability = isUpcoming(edition) ? "https://schema.org/PreOrder" : "https://schema.org/InStock";
  const offers = stores.audiobook.map((s) => ({
    "@type": "Offer",
    url: s.href,
    availability,
    seller: { "@type": "Organization", name: s.name },
  }));

  // The ebook of the same edition (Kindle).
  const [ebook, ...ebookMirrors] = stores.ebook;
  const workExample = ebook
    ? {
        "@type": "Book",
        bookFormat: "https://schema.org/EBook",
        inLanguage: edition.inLanguage,
        url: ebook.href,
        ...(ebookMirrors.length ? { sameAs: ebookMirrors.map((e) => e.href) } : {}),
      }
    : undefined;

  // The free chapter, but only when the recording on the page is in this edition's language.
  const audio = CHAPTER_1_AUDIO[locale];
  const free = chapters.find((c) => c.free) ?? chapters[0];
  const associatedMedia =
    audio.inLanguage === edition.inLanguage
      ? {
          "@type": "AudioObject",
          name: `${dict.common.chapter} ${free.n} – ${free.title} (${dict.listen.free})`,
          contentUrl: `${SITE_URL}${audio.src}`,
          encodingFormat: "audio/mpeg",
          duration: isoDuration(audio.duration),
          inLanguage: audio.inLanguage,
          isAccessibleForFree: true,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["Audiobook", "Book"],
    "@id": `${url}#audiobook`,
    name: dict.seo.bookName,
    alternateName: dict.seo.bookAlternateName,
    description: dict.seo.bookDescription,
    inLanguage: edition.inLanguage,
    ...(edition.isbn ? { isbn: edition.isbn } : {}),
    ...(edition.datePublished ? { datePublished: edition.datePublished } : {}),
    bookFormat: "https://schema.org/AudiobookFormat",
    author: { "@type": "Person", name: AUTHOR },
    readBy: { "@type": "Person", name: dict.seo.narrator },
    duration: TOTAL_RUNTIME_ISO,
    timeRequired: TOTAL_RUNTIME_ISO,
    typicalAgeRange: AGE_RANGE,
    genre: dict.seo.genres,
    publisher: { "@id": ORG_ID },
    image: `${SITE_URL}/og-default.jpg`,
    url,
    // Only chapter 1 is free; the whole book is not.
    isAccessibleForFree: false,
    hasPart,
    ...(associatedMedia ? { associatedMedia } : {}),
    ...(offers.length ? { offers } : {}),
    ...(workExample ? { workExample } : {}),
    ...(edition.ratedByPageReviews ? { aggregateRating, review } : {}),
    sameAs: stores.sameAs.map((pl) => pl.href),
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
    publisher: { "@id": ORG_ID },
  };
}
