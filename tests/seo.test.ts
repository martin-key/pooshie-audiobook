import { describe, it, expect } from "vitest";
import {
  buildAudiobookJsonLd,
  buildFaqJsonLd,
  buildOrgJsonLd,
  buildWebsiteJsonLd,
  ORG_ID,
} from "@/lib/seo";
import { getDictionary } from "@/lib/i18n";
import { SITE_URL } from "@/lib/env";
import { SITE_UPDATED } from "@/lib/editions";
import { llmsTxt } from "@/lib/llms";
import { CHAPTER_1_AUDIO } from "@/lib/links";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

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
  it("has the @id the other nodes point to as publisher", () => {
    expect(ld["@id"]).toBe(ORG_ID);
  });
});

describe("Site address", () => {
  // audiobook.pooshie.net no longer exists in DNS; nothing may point there.
  const OLD_HOST = /https?:\/\/[a-z.]*pooshie\.net/;

  it("defaults to www.pooshieaudiobook.com", () => {
    expect(SITE_URL).toBe("https://www.pooshieaudiobook.com");
  });

  it("is the only host in JSON-LD, robots.txt, the sitemap and llms.txt", () => {
    const blobs = [
      ...(["en", "de"] as const).flatMap((l) => [
        buildOrgJsonLd(l),
        buildAudiobookJsonLd(l),
        buildWebsiteJsonLd(l),
      ]),
      robots(),
      sitemap(),
    ].map((x) => JSON.stringify(x));
    blobs.push(llmsTxt());
    for (const blob of blobs) expect(blob).not.toMatch(OLD_HOST);
  });

  it("robots.txt has no non-standard Host line and points to the sitemap", () => {
    const r = robots();
    expect(r.host).toBeUndefined();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("the sitemap lists / and /de with the content date, not the build time", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([`${SITE_URL}/`, `${SITE_URL}/de`]);
    for (const e of entries) expect(e.lastModified).toBe(SITE_UPDATED);
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

  it("lists the storefronts as offers, without on-site prices", () => {
    const offers = ld.offers as Array<Record<string, unknown>>;
    expect(offers.length).toBeGreaterThanOrEqual(9);
    for (const o of offers) {
      expect(o["@type"]).toBe("Offer");
      expect(String(o.url)).toMatch(/^https:\/\//);
      expect(o.price).toBeUndefined();
    }
  });

  it("says the book is not free, and offers chapter 1 as a free recording", () => {
    expect(ld.isAccessibleForFree).toBe(false);
    const media = ld.associatedMedia as Record<string, unknown>;
    expect(media["@type"]).toBe("AudioObject");
    expect(media.contentUrl).toBe(`${SITE_URL}${CHAPTER_1_AUDIO.en.src}`);
    expect(media.inLanguage).toBe("en");
    expect(media.duration).toMatch(/^PT\d+M\d+S$/);
    expect(media.isAccessibleForFree).toBe(true);
  });

  it("points to the Organization as publisher and has the Kindle edition as workExample", () => {
    expect(ld.publisher).toEqual({ "@id": ORG_ID });
    const ebook = ld.workExample as Record<string, unknown>;
    expect(ebook.bookFormat).toBe("https://schema.org/EBook");
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
    // The free chapter is Melina Camus's German recording, with the file's own length.
    const media = book.associatedMedia as Record<string, unknown>;
    expect(CHAPTER_1_AUDIO.de.src).not.toBe(CHAPTER_1_AUDIO.en.src);
    expect(media.inLanguage).toBe("de");
    expect(media.contentUrl).toBe(`${SITE_URL}${CHAPTER_1_AUDIO.de.src}`);
    expect(media.duration).toBe("PT8M39S");
    expect(book.isAccessibleForFree).toBe(false);

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
    expect(de.hero.intro).toContain(line);
    const visible = JSON.stringify(de);
    for (const term of ["Gute-Nacht-Geschichten", "Einschlafgeschichten", "Hörbuch für Kinder"]) {
      expect(de.meta.keywords).toContain(term);
      expect(visible).toContain(term);
    }
  });

  it("names the product, Puschi and the rosa Igel in title and H1", () => {
    const de = getDictionary("de");
    expect(de.meta.homeTitle).toContain("Puschi, der rosa Igel");
    for (const term of ["Puschi", "Hörbuch", "Gute-Nacht-Geschichten", "4 bis 8", "Melina Camus"]) {
      expect(de.hero.titleSub).toContain(term);
    }
  });

  it("says plainly that only chapter 1 is free", () => {
    const de = getDictionary("de");
    expect(de.facts.freeValue).toMatch(/Nur Kapitel 1/);
    expect(de.faq.items.some((f) => /ganze Hörbuch gratis/.test(f.q) && /^Nein/.test(f.a))).toBe(true);
  });

  it("has a German section in llms.txt with the narrator and the German title", () => {
    const txt = llmsTxt();
    expect(txt).toContain("## Deutsche Ausgabe");
    expect(txt).toContain("Erzählungen über Puschi und Kitty");
    expect(txt).toContain("Melina Camus");
    expect(txt).toContain("https://www.amazon.de/dp/B0HRFYL6SK");
  });
});
