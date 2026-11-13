import type { ChapterText } from "./i18n/types";

/** Language-independent chapter data. Titles and blurbs live in the dictionaries. */
export type ChapterMeta = {
  n: number;
  dur: string; // mm:ss
  free?: boolean;
  art: string;
};

export type Chapter = ChapterMeta & ChapterText;

export const CHAPTER_META: ChapterMeta[] = [
  { n: 1, dur: "6:48", free: true, art: "/images/pooshie-portrait.jpeg" },
  { n: 2, dur: "6:26", art: "/images/grass-friends.jpg" },
  { n: 3, dur: "5:00", art: "/images/raindrop.jpg" },
  { n: 4, dur: "7:38", art: "/images/wolf-pooshie-pond.jpg" },
  { n: 5, dur: "5:59", art: "/images/swing.jpg" },
  { n: 6, dur: "5:36", art: "/images/pooshie-portrait.jpeg" },
  { n: 7, dur: "7:15", art: "/images/grass-friends.jpg" },
  { n: 8, dur: "5:52", art: "/images/raindrop.jpg" },
  { n: 9, dur: "7:51", art: "/images/wolf-pooshie-pond.jpg" },
  { n: 10, dur: "5:00", art: "/images/swing.jpg" },
  { n: 11, dur: "5:42", art: "/images/pooshie-portrait.jpeg" },
  { n: 12, dur: "7:05", art: "/images/grass-friends.jpg" },
  { n: 13, dur: "7:48", art: "/images/raindrop.jpg" },
];

/** Joins the chapter data with a dictionary's chapter titles and blurbs (same order). */
export function localizeChapters(texts: ChapterText[]): Chapter[] {
  return CHAPTER_META.map((meta, i) => ({ ...meta, ...texts[i] }));
}

export const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const parseDur = (d: string): number => {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
};

export const TOTAL_RUNTIME_ISO = "PT1H24M";
export const ISBN = "978-619-91473-0-6";
export const AUTHOR = "Mr. Push";
export const AGE_RANGE = "4-8";
