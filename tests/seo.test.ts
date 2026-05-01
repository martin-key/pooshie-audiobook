import { describe, it, expect } from "vitest";
import {
  buildAudiobookJsonLd,
  buildFaqJsonLd,
  buildOrgJsonLd,
  buildBreadcrumbJsonLd,
  buildWebsiteJsonLd,
  REVIEWS,
  FAQS,
} from "@/lib/seo";

describe("Organization JSON-LD", () => {
  const ld = buildOrgJsonLd();
  it("has @context and @type", () => {
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Organization");
  });
  it("references the configured site URL", () => {
    expect(String(ld.url)).toMatch(/^https?:\/\//);
  });
});

describe("Audiobook JSON-LD", () => {
  const ld = buildAudiobookJsonLd() as Record<string, unknown>;

  it("declares both Audiobook and Book types", () => {
    expect(ld["@type"]).toEqual(["Audiobook", "Book"]);
  });

  it("includes ISBN, language, and duration", () => {
    expect(ld.isbn).toBe("978-619-91473-0-6");
    expect(ld.inLanguage).toBe("en");
    expect(ld.duration).toBe("PT2H14M");
  });

  it("has 13 chapter parts", () => {
    expect(Array.isArray(ld.hasPart)).toBe(true);
    expect((ld.hasPart as unknown[]).length).toBe(13);
  });

  it("has 3 offers (single, full, bundle)", () => {
    const offers = ld.offers as Array<Record<string, unknown>>;
    expect(offers).toHaveLength(3);
    expect(offers.map((o) => o.price)).toEqual(["1.99", "9.99", "34.99"]);
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
  const ld = buildFaqJsonLd() as Record<string, unknown>;

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
    const ld = buildBreadcrumbJsonLd() as Record<string, unknown>;
    expect(ld["@type"]).toBe("BreadcrumbList");
    const items = ld.itemListElement as unknown[];
    expect(items).toHaveLength(1);
  });
});

describe("WebSite JSON-LD", () => {
  it("declares schema.org WebSite", () => {
    const ld = buildWebsiteJsonLd();
    expect(ld["@type"]).toBe("WebSite");
    expect(ld["@context"]).toBe("https://schema.org");
  });
});

describe("Reviews + FAQs source data", () => {
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
