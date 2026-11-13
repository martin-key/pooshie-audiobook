import type { Locale } from "./config";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";

/** The shape of every dictionary, taken from the English one. */
export type Dictionary = typeof en;

const DICTIONARIES: Record<Locale, Dictionary> = { en, de };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export * from "./config";
export { format } from "./format";
export type * from "./types";
