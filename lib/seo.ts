import { SITE_URL } from "./env";
import { AGE_RANGE, AUTHOR, CHAPTERS, ISBN, NARRATOR, TOTAL_RUNTIME_ISO } from "./chapters";

const BRAND_NAME = "Pooshie";
const BOOK_NAME = "Pooshie · Stories of Pooshie & Kitty";
const BOOK_DESCRIPTION =
  "A 13-chapter children's audiobook for ages 4–8. Gentle bedtime stories about a little pink hedgehog whose spines don't prick. Voiced by a real human, written for bedtime, total runtime 2h 14m.";

export type Review = {
  text: string;
  author: string;
  authorSub: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  { text: "My daughter asks for Pooshie every single night. The voice is so warm — she falls asleep with a smile.", author: "Sarah M.", authorSub: "Mom of two · USA", rating: 5 },
  { text: "Nothing else compares to this. The music, the storytelling, the values — worth every penny.", author: "James T.", authorSub: "Dad of three · UK", rating: 5 },
  { text: "I use Pooshie in my classroom for morning circle. The children love it and we talk about kindness every day.", author: "Ms. Elena R.", authorSub: "Kindergarten teacher", rating: 5 },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is each chapter?",
    a: "Every chapter runs 5–8 minutes — long enough to settle, short enough to not start a second one. The full audiobook is 2h 14m across 13 chapters.",
  },
  {
    q: "Who narrates the Pooshie audiobook?",
    a: "A professional human voice actress — never an AI voice. You can hear the smile in every line.",
  },
  {
    q: "What age is the Pooshie audiobook for?",
    a: "It's written for children ages 4 to 8, but the storytelling style invites grown-ups to listen along too. Many parents say it's their bedtime, on purpose.",
  },
  {
    q: "Where can I listen?",
    a: "Pooshie is available on Audible, Spotify, Apple Books, and Google Play. The first chapter is free to stream right on this site — no signup needed.",
  },
  {
    q: "Is the first chapter really free?",
    a: "Yes. Press play on Chapter 1 — \"The non-prickly hedgehog\" — anywhere on this page. No email required, no signup, no card. Just the story.",
  },
  {
    q: "What's the audiobook about?",
    a: "Pooshie is a little pink hedgehog whose spines don't prick. Across 13 gentle chapters he meets Kitty the squirrel, Joe the Wolf, an owl, a butterfly, and a raindrop — and quietly teaches kindness, listening, and friendship without ever being preachy.",
  },
  {
    q: "Can I buy a single chapter instead of the whole book?",
    a: "Yes. A single chapter is $1.99, the full 13-chapter audiobook is $9.99, and the audiobook + Pooshie plush bundle is $34.99. No subscription — you own the stories forever.",
  },
  {
    q: "Is there a Pooshie plush toy?",
    a: "Yes — a soft (non-prickly!) pink Pooshie plush ships with the audiobook in our $34.99 bundle. Worldwide shipping included.",
  },
];

type JsonLd = Record<string, unknown>;

export function buildOrgJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: [],
    description:
      "Pooshie is a children's audiobook brand publishing gentle bedtime stories for ages 4–8.",
  };
}

export function buildBreadcrumbJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };
}

export function buildAudiobookJsonLd(): JsonLd {
  const aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: (
      REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length
    ).toFixed(1),
    reviewCount: REVIEWS.length,
    bestRating: 5,
    worstRating: 1,
  };

  const review = REVIEWS.map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.text,
  }));

  const hasPart = CHAPTERS.map((c) => ({
    "@type": "Chapter",
    position: c.n,
    name: c.title,
    description: c.blurb,
    timeRequired: `PT${c.dur.split(":")[0]}M${c.dur.split(":")[1]}S`,
  }));

  const offers = [
    {
      "@type": "Offer",
      name: "Single chapter",
      price: "1.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#get`,
    },
    {
      "@type": "Offer",
      name: "Full audiobook (13 chapters)",
      price: "9.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#get`,
    },
    {
      "@type": "Offer",
      name: "Audiobook + Pooshie plush bundle",
      price: "34.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#get`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": ["Audiobook", "Book"],
    "@id": `${SITE_URL}/#audiobook`,
    name: BOOK_NAME,
    alternateName: "Pooshie · A Bedtime Audiobook",
    description: BOOK_DESCRIPTION,
    inLanguage: "en",
    isbn: ISBN,
    bookFormat: "https://schema.org/AudiobookFormat",
    author: { "@type": "Person", name: AUTHOR },
    readBy: { "@type": "Person", name: NARRATOR },
    duration: TOTAL_RUNTIME_ISO,
    timeRequired: TOTAL_RUNTIME_ISO,
    numberOfPages: undefined,
    typicalAgeRange: AGE_RANGE,
    genre: ["Children's literature", "Bedtime stories", "Animal fables"],
    publisher: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
    image: `${SITE_URL}/og-default.jpg`,
    url: SITE_URL,
    hasPart,
    aggregateRating,
    review,
    offers,
    keywords:
      "children's audiobook, bedtime story, hedgehog, ages 4-8, gentle storytelling, kindness, friendship, sleep stories",
  };
}

export function buildFaqJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    inLanguage: "en",
  };
}
