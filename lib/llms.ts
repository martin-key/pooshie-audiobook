// Text of /llms.txt — the key facts for AI assistants, in English and German.
// Built from the same data as the pages (site URL, storefronts, editions, chapters, FAQs),
// so it can't drift from the site the way the old hand-written file did.

import { SITE_URL } from "@/lib/env";
import { AUTHOR, localizeChapters } from "@/lib/chapters";
import { EDITIONS } from "@/lib/editions";
import { getDictionary } from "@/lib/i18n";
import { BULGARIAN_PLATFORMS, SOCIAL_LINKS, STOREFRONTS, type ExternalLink } from "@/lib/links";
import { CONTACT_EMAIL, pageUrl } from "@/lib/seo";

const en = getDictionary("en");
const de = getDictionary("de");

function storeLines(links: ExternalLink[], regions: Record<string, string>): string[] {
  return links.map((l) => `- [${l.name} (${regions[l.region]})](${l.href})`);
}

function chapterLines(dict: typeof en): string[] {
  return localizeChapters(dict.chapters).map(
    (c) => `${c.n}. ${c.title} (${c.dur})${c.free ? ` — ${dict.listen.free}` : ""}`,
  );
}

function faqLines(dict: typeof en): string[] {
  return dict.faq.items.flatMap((f) => [`**${f.q}** ${f.a}`, ""]);
}

function germanDate(iso: string): string {
  return new Intl.DateTimeFormat("de", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

export function llmsTxt(): string {
  const enStores = STOREFRONTS.en;
  const deStores = STOREFRONTS.de;
  const deEdition = EDITIONS.de;
  const enUrl = `${pageUrl("en")}/`;
  const deUrl = pageUrl("de");

  const lines = [
    "# Pooshie · A Bedtime Audiobook (German: Puschi)",
    "",
    `> A 13-chapter children's audiobook for ages 4–8 about Pooshie, a little pink hedgehog whose spines don't prick. Gentle bedtime stories about kindness and friendship, voiced by a real human, not AI. Only chapter 1 is free on this site; the full audiobook is sold by audiobook stores. The German edition is „${de.facts.titleValue}“, read by ${de.seo.narrator}.`,
    "",
    `- English page: ${enUrl}`,
    `- German page (Deutsch): ${deUrl}`,
    "",
    "## Key facts (English edition)",
    "",
    `- **Title:** ${en.facts.titleValue}`,
    `- **Author:** ${AUTHOR}`,
    `- **Narrator:** ${en.facts.narratorValue}`,
    "- **Format:** Audiobook (also available as a Kindle ebook)",
    `- **Editions:** English; German — „${de.facts.titleValue}“; Bulgarian — „${en.platforms.regions.bgTitle}“`,
    ...(EDITIONS.en.isbn ? [`- **ISBN:** ${EDITIONS.en.isbn}`] : []),
    `- **Total runtime:** ${en.facts.runtimeValue}, 13 chapters of 5–8 minutes`,
    `- **Target age:** ${en.facts.ageValue}`,
    `- **Genre:** ${en.seo.genres.join(", ")}`,
    `- **Free preview:** ${en.facts.freeValue}`,
    `- **Website:** ${enUrl}`,
    "",
    "## What it's about",
    "",
    "Pooshie is a little pink hedgehog who has never done anybody any harm. The most interesting thing about him is that his spines don't prick. Across thirteen gentle chapters, Pooshie meets Kitty, Joe the Wolf, Aunt Elsa, a butterfly, a raindrop, a sleepy snake, and others — and quietly teaches kindness, listening, and friendship without ever being preachy.",
    "",
    "Each chapter is written for bedtime, on purpose: long enough to settle, short enough to not start a second one.",
    "",
    "## Where to listen (audiobook, English)",
    "",
    ...storeLines(enStores.audiobook, en.platforms.regions),
    `- Free chapter 1: ${enUrl}#listen`,
    "",
    "## Bulgarian edition",
    "",
    ...storeLines(BULGARIAN_PLATFORMS, en.platforms.regions),
    "",
    "## Where to read (ebook)",
    "",
    ...storeLines(enStores.ebook, en.platforms.regions),
    "",
    "## Chapters",
    "",
    ...chapterLines(en),
    "",
    "## FAQ",
    "",
    ...faqLines(en),
    "## Deutsche Ausgabe",
    "",
    `- **Titel:** ${de.facts.titleValue} – 13 Gute-Nacht-Geschichten für Kinder`,
    "- **Figur:** Puschi, ein kleiner rosa Igel, dessen Stacheln nicht pieksen",
    `- **Autor:** ${AUTHOR}`,
    `- **Sprecherin:** ${de.facts.narratorValue}`,
    `- **Dauer:** ${de.facts.runtimeValue}, ${de.facts.chaptersValue}`,
    `- **Alter:** ${de.facts.ageValue}`,
    ...(deEdition.isbn ? [`- **ISBN:** ${deEdition.isbn}`] : []),
    ...(deEdition.datePublished ? [`- **Erscheinungsdatum:** ${germanDate(deEdition.datePublished)}`] : []),
    `- **Gratis:** ${de.facts.freeValue} ${deUrl}#listen`,
    `- **Website:** ${deUrl}`,
    "",
    "### Wo hören (Hörbuch)",
    "",
    ...(deStores.audiobook.length ? storeLines(deStores.audiobook, de.platforms.regions) : [`- ${de.get.comingSoon}`]),
    "",
    "### E-Book",
    "",
    ...storeLines(deStores.ebook, de.platforms.regions),
    "",
    "### Kapitel",
    "",
    ...chapterLines(de),
    "",
    "### Häufige Fragen",
    "",
    ...faqLines(de),
    "## Social",
    "",
    `- [Facebook](${SOCIAL_LINKS.facebook})`,
    `- [Instagram](${SOCIAL_LINKS.instagram})`,
    `- [YouTube](${SOCIAL_LINKS.youtube})`,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Website: ${SITE_URL}`,
    "",
  ];
  return lines.join("\n");
}
