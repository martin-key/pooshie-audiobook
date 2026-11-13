export type Review = {
  /** Optional headline, as left on the storefront review. */
  title?: string;
  text: string;
  author: string;
  authorSub: string;
  rating: number;
};

export type Faq = { q: string; a: string };

export type ChapterText = { title: string; blurb: string };

export type FriendText = { name: string; role: string; quote: string };

export type Pillar = { eyebrow: string; title: string; body: string };

export type NavLink = { label: string; href: string };

/** Keys for the small secondary labels on storefront badges (see lib/links.ts). */
export type RegionKey =
  | "us"
  | "uk"
  | "ca"
  | "it"
  | "br"
  | "de"
  | "indie"
  | "indieShort"
  | "subscription"
  | "subscriptionShort"
  | "library"
  | "libraryShort"
  | "kobo"
  | "bgTitle"
  | "bgShort";
