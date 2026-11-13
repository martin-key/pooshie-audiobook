import { AUTHOR } from "@/lib/chapters";
import { EDITIONS } from "@/lib/editions";
import { LOCALE_META, type Dictionary, type Locale } from "@/lib/i18n";
import { STOREFRONTS } from "@/lib/links";

/** Store names without repeats ("Audible" for US, UK and Canada), in list order. */
function storeNames(locale: Locale): string[] {
  return [...new Set(STOREFRONTS[locale].audiobook.map((s) => s.name))];
}

/**
 * "Facts at a glance": the facts parents and AI assistants ask about, as plain text in one
 * place, matching the Audiobook JSON-LD. ISBN and release date appear once they are set in
 * lib/editions.ts.
 */
export function Facts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.facts;
  const edition = EDITIONS[locale];
  const stores = storeNames(locale);
  const released = edition.datePublished
    ? new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, { dateStyle: "long", timeZone: "UTC" }).format(
        new Date(`${edition.datePublished}T00:00:00Z`),
      )
    : undefined;

  const rows: Array<[string, string]> = [
    [t.title, t.titleValue],
    [t.author, AUTHOR],
    [t.narrator, t.narratorValue],
    [t.chapters, t.chaptersValue],
    [t.runtime, t.runtimeValue],
    [t.age, t.ageValue],
    ...(edition.isbn ? ([[t.isbn, edition.isbn]] as Array<[string, string]>) : []),
    ...(released ? ([[t.released, released]] as Array<[string, string]>) : []),
    [t.free, t.freeValue],
    [t.audiobook, stores.length ? stores.join(", ") : dict.get.comingSoon],
    [t.ebook, t.ebookValue],
  ];

  return (
    <div className="facts-card">
      <h3 className="facts-title">{t.heading}</h3>
      <dl className="facts-list">
        {rows.map(([label, value]) => (
          <div key={label} className="facts-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
