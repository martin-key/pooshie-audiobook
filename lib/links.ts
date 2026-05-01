// External destinations for the purchase / listen CTAs.
// Replace these placeholders with your actual storefront URLs.

export const PLATFORM_LINKS = {
  audible: "https://www.audible.com/",
  spotify: "https://open.spotify.com/",
  appleBooks: "https://books.apple.com/",
  googlePlay: "https://play.google.com/store/audiobooks",
} as const;

// Pricing CTA destinations
export const PURCHASE_LINKS = {
  single: PLATFORM_LINKS.audible,   // single-chapter purchase
  full: PLATFORM_LINKS.audible,     // full audiobook purchase
  bundle: PLATFORM_LINKS.audible,   // audiobook + plush bundle
} as const;

// Free chapter audio source
export const CHAPTER_1_AUDIO_SRC = "/audio/chapter-1.mp3";
