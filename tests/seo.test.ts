import { describe, it, expect } from "vitest";
import {
  buildAudiobookJsonLd,
  buildFaqJsonLd,
  buildOrgJsonLd,
  buildBreadcrumbJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";

const REVIEWS = getDictionary("en").reviews.items;
const FAQS = getDictionary("en").faq.items;

describe("Organization JSON-LD", () => {
  const ld = buildOrgJsonLd("en");
  it("has @context and @type", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Organization");
  });
  it("references the configured site URL", () => {
    expect(String(ld.url)).toMatch(/^https?:\/\//);
  });
});

describe("Audiobook JSON-LD", () => {
  const ld = buildAudiobookJsonLd("en") as Record<string, unknown>;

  it("declares both Audiobook and Book types", () => {
    expect(ld["@type"]).toEqual(["Audiobook", "Book"]);
  });

  it("includes ISBN, language, and duration", () => {
    expect(ld.isbn).toBe("978-619-91473-0-6");
    expect(ld.inLanguage).toBe("en");
    expect(ld.duration).toBe("PT1H24M");
  });

  it("has 13 chapter parts", () => {
    expect(Array.isArray(ld.hasPart)).toBe(true);
    expect((ld.hasPart as unknown[]).length).toBe(13);
  });

  it("advertises no on-site prices — the book is sold by third-party storefronts", () => {
    expect(ld.offers).toBeUndefined();
  });

  it("lists every storefront under sameAs", () => {
    const sameAs = ld.sameAs as string[];
    expect(sameAs.length).toBeGreaterThanOrEqual(14);
    for (const url of sameAs) expect(url).toMatch(/^https:\/\//);
  });

  it("has aggregate rating averaging the reviews", () => {
    const ar = ld.aggregateRating as Record<string, unknown>;
    expect(ar["@type"]).toBe("AggregateRating");
    expect(Number(ar.ratingValue)).toBeGreaterThanOrEqual(4.5);
    expect(ar.reviewCount).toBe(REVIEWS.length);
  });

  it("includes one Review per source review", () => {
    const reviews = ld.review as Array<Record<string, unknown>>;
    expect(reviews).toHaveLength(REVIEWS.length);
  });
});

describe("FAQ JSON-LD", () => {
  const ld = buildFaqJsonLd("en") as Record<string, unknown>;

  it("is a FAQPage with one Question per entry", () => {
    expect(ld["@type"]).toBe("FAQPage");
    const main = ld.mainEntity as Array<Record<string, unknown>>;
    expect(main).toHaveLength(FAQS.length);
    for (const q of main) {
      expect(q["@type"]).toBe("Question");
      const ans = q.acceptedAnswer as Record<string, unknown>;
      expect(ans["@type"]).toBe("Answer");
      expect(typeof ans.text).toBe("string");
    }
  });
});

describe("Breadcrumb JSON-LD", () => {
  it("has a single home crumb", () => {
    const ld = buildBreadcrumbJsonLd("en") as Record<string, unknown>;
    expect(ld["@type"]).toBe("BreadcrumbList");
    const items = ld.itemListElement as unknown[];
    expect(items).toHaveLength(1);
  });
});

describe("WebSite JSON-LD", () => {
  it("declares schema.org WebSite", () => {
    const ld = buildWebsiteJsonLd("en");
    expect(ld["@type"]).toBe("WebSite");
    expect(ld["@context"]).toBe("https://schema.org");
  });
});

describe("Reviews + FAQs source data", () => {
  it("includes the real reader review with its headline", () => {
    const real = REVIEWS.find((r) => r.title);
    expect(real?.title).toBe("A wonderful collection of bedtime tales!");
    expect(real?.text).toContain("friendship, patience, and mindfulness");
  });

  it("has no FAQ mentioning removed pricing or plush products", () => {
    const blob = FAQS.map((f) => `${f.q} ${f.a}`).join(" ");
    expect(blob).not.toMatch(/\$\d/);
    expect(blob).not.toMatch(/plush/i);
  });

  it("has at least 3 reviews, all 5-star", () => {
    expect(REVIEWS.length).toBeGreaterThanOrEqual(3);
    for (const r of REVIEWS) expect(r.rating).toBe(5);
  });

  it("has at least 6 FAQs", () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(6);
    for (const f of FAQS) {
      expect(f.q.length).toBeGreaterThan(0);
      expect(f.a.length).toBeGreaterThan(0);
    }
  });
});

describe("German structured data", () => {
  it("describes the German edition: Puschi, German language, Melina Camus, German stores", () => {
    const faq = buildFaqJsonLd("de") as Record<string, unknown>;
    expect(faq.inLanguage).toBe("de");
    expect((faq.mainEntity as unknown[]).length).toBe(getDictionary("de").faq.items.length);

    const book = buildAudiobookJsonLd("de") as Record<string, unknown>;
    expect(book.name).toBe("Erzählungen über Puschi und Kitty");
    expect(book.inLanguage).toBe("de");
    expect(book.isbn).toBeUndefined(); // the English ISBN must not leak onto the German edition
    expect(book.readBy).toEqual({ "@type": "Person", name: "Melina Camus" });
    expect(book.sameAs).toContain("https://www.amazon.de/dp/B0HRFYL6SK");
    expect(book.aggregateRating).toBeUndefined(); // page reviews are of the English edition
    expect(book.review).toBeUndefined();
    expect(String(book.url)).toMatch(/\/de$/);
    const parts = book.hasPart as Array<Record<string, unknown>>;
    expect(parts[0].name).toBe("Der Anfang");

    const site = buildWebsiteJsonLd("de");
    expect(site.inLanguage).toBe("de");
    expect(site.name).toBe("Puschi");
    expect(buildOrgJsonLd("de").name).toBe("Puschi");
  });

  it("never calls the character Pooshie in German copy (except the English original's title)", () => {
    const json = JSON.stringify(getDictionary("de")).replaceAll("The Tales of Pooshie and Kitty", "");
    expect(json).not.toMatch(/Pooshie/);
  });

  it("keeps the DACH positioning line and search terms on the German page", () => {
    const de = getDictionary("de");
    const line = "Gute-Nacht-Geschichten über Freundschaft, Mitgefühl und Mut – für Kinder von 4 bis 8.";
    expect(de.meta.homeDescription.startsWith(line)).toBe(true);
    expect(de.hero.introRest).toContain(line);
    const visible = JSON.stringify(de);
    for (const term of ["Gute-Nacht-Geschichten", "Einschlafgeschichten", "Hörbuch für Kinder"]) {
      expect(de.meta.keywords).toContain(term);
      expect(visible).toContain(term);
    }
  });
});
