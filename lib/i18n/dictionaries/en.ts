// English copy. This file defines the shape every other language must match
// (see `Dictionary` in lib/i18n/index.ts).
//
// Rich-text strings: "\n" becomes a line break and *text* becomes <em>text</em>.
// Placeholders such as {n} or {title} are filled in by the component.

import type { ChapterText, Faq, FriendText, NavLink, Pillar, RegionKey, Review } from "../types";

const RUNTIME = "1h 24m";

const chapters: ChapterText[] = [
  { title: "The Beginning", blurb: "Pooshie was a little pink hedgehog who had never ever done anybody any harm…" },
  { title: "Billy and Russell's Mushrooms", blurb: "A squirrel and her acorns that refuse to be cracked." },
  { title: "Joe the Wolf", blurb: "Listening, very quietly, with the daisies." },
  { title: "The Raindrop", blurb: "How an unlikely friendship begins." },
  { title: "A Creamy-Pink Tummy Vista", blurb: "A nap, a swing, and the longest afternoon." },
  { title: "Aunt Elsa", blurb: "A short lesson on listening." },
  { title: "Cloudy", blurb: "Warm cups and warmer hearts." },
  { title: "The Butterfly", blurb: "Two brothers, one secret." },
  { title: "The Sleepy Snake", blurb: "On not judging from a distance." },
  { title: "The River", blurb: "Divine nuances, traded for a wish." },
  { title: "Birthday on the 22nd", blurb: "When the forest leans in to listen." },
  { title: "A Christmas Present", blurb: "Pooshie draws a map for tired hearts." },
  { title: "The Little Hill", blurb: "A lullaby for everyone, asleep or awake." },
];

const friends: FriendText[] = [
  {
    name: "Pooshie",
    role: "The little pink hedgehog",
    quote: "His spines didn't prick. He had never done anybody any harm.",
  },
  {
    name: "Kitty",
    role: "A squirrel and good friend",
    quote: "Somehow this non-prickly pinkish ball gave her such peace of mind…",
  },
  {
    name: "Joe the Wolf",
    role: "A friend by the pond",
    quote: "Even wolves, sometimes, sit very still and listen.",
  },
  {
    name: "The Raindrop",
    role: "A whisper from the sky",
    quote: "If you sit very quietly, you can hear its little song.",
  },
];

const reviews: Review[] = [
  {
    title: "A wonderful collection of bedtime tales!",
    text:
      "I am happy to have stumbled upon this book. From “Pooshie and Kitty” we learn about friendship, patience, and mindfulness. Although written for children, there is much that these stories can teach adults about these virtues and how to focus our lives on things that seem small but are very important for our well-being and for society. Pooshie has the guilelessness of a child, and yet also the wisdom of Owl. The small gestures of companionship between Pooshie and Kitty show us how great friendship can be, even as their personalities are quite different. This is a wonderful book to teach children great virtues that they can build with as they grow into adults.",
    author: "A verified reader",
    authorSub: "Reader review",
    rating: 5,
  },
  { text: "My daughter asks for Pooshie every single night. The voice is so warm — she falls asleep with a smile.", author: "Sarah M.", authorSub: "Mom of two · USA", rating: 5 },
  { text: "Nothing else compares to this. The music, the storytelling, the values — worth every penny.", author: "James T.", authorSub: "Dad of three · UK", rating: 5 },
  { text: "I use Pooshie in my classroom for morning circle. The children love it and we talk about kindness every day.", author: "Ms. Elena R.", authorSub: "Kindergarten teacher", rating: 5 },
];

const faqs: Faq[] = [
  {
    q: "How long is each chapter?",
    a: `Every chapter runs 5–8 minutes — long enough to settle, short enough to not start a second one. The full audiobook is ${RUNTIME} (1 hour and 24 minutes) across 13 chapters.`,
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
    a: "The audiobook is on Audible (US, UK and Canada), Libro.fm, Everand, hoopla, Kobo, laFeltrinelli and IBS.it. A Bulgarian edition — Разкази за Пуши и Кити — is on Storytel, and the illustrated ebook is on Amazon. The first chapter is free to stream right on this site — no signup needed.",
  },
  {
    q: "Is the first chapter really free?",
    a: "Yes. Press play on Chapter 1 — \"The Beginning\" — anywhere on this page. No email required, no signup, no card. Just the story.",
  },
  {
    q: "What's the audiobook about?",
    a: "Pooshie is a little pink hedgehog whose spines don't prick. Across 13 gentle chapters he meets Kitty the squirrel, Joe the Wolf, an owl, a butterfly, and a raindrop — and quietly teaches kindness, listening, and friendship without ever being preachy.",
  },
];

const pillars: Pillar[] = [
  {
    eyebrow: "Voiced by",
    title: "A real human, not AI",
    body: "Every chapter is read by a professional actress who lives inside the story. You can hear the smile.",
  },
  {
    eyebrow: "Written for",
    title: "Bedtime, on purpose",
    body: "Each chapter is 5–8 minutes — long enough to settle, short enough to not start a second one.",
  },
  {
    eyebrow: "About",
    title: "Kindness, gently",
    body: "Lessons about empathy and friendship — never preachy, never loud. Stories first.",
  },
];

const nav: NavLink[] = [
  { label: "The Story", href: "#story" },
  { label: "Free Chapter", href: "#listen" },
  { label: "Friends", href: "#friends" },
  { label: "Where to Listen", href: "#get" },
  { label: "FAQ", href: "#faq" },
];

const regions: Record<RegionKey, string> = {
  us: "United States",
  uk: "United Kingdom",
  ca: "Canada",
  it: "Italy",
  br: "Brazil",
  de: "Germany",
  indie: "Supports indie bookshops",
  indieShort: "Indie bookshops",
  subscription: "Included with a subscription",
  subscriptionShort: "Subscription",
  library: "Free with a library card",
  libraryShort: "Library card",
  kobo: "Rakuten Kobo",
  bgTitle: "Разкази за Пуши и Кити",
  bgShort: "На български",
};

export const en = {
  common: {
    /** The character and brand name as written in this language. */
    brand: "Pooshie",
    runtime: RUNTIME,
    listenFree: "Listen free",
    listenChapter1: "Listen to chapter 1",
    getAudiobook: "Get the audiobook",
    freePreview: "Free preview",
    chapter: "Chapter",
    quoteOpen: "“",
    quoteClose: "”",
  },

  meta: {
    siteTitle: "Pooshie · A bedtime audiobook for ages 4–8",
    titleTemplate: "%s · Pooshie",
    siteDescription:
      "A 13-chapter children's audiobook about a little pink hedgehog whose spines don't prick. Real human narration, 5–8 minute chapters, total 1h 24m. Listen to the first chapter free.",
    homeTitle: "Pooshie · A bedtime audiobook for young & grown-up children",
    homeDescription:
      "Pooshie is a 13-chapter children's audiobook (1h 24m) for ages 4–8. Real human narration, gentle stories about a little pink hedgehog whose spines don't prick. Free chapter 1 — no signup, no email required.",
    ogDescription:
      "A 13-chapter children's audiobook. Gentle bedtime stories, real human narration, 1h 24m total. Free first chapter — no signup.",
    twitterDescription: "A 13-chapter children's audiobook. Free first chapter, no signup.",
    ogImageAlt: "Pooshie — a watercolor portrait of a little pink hedgehog",
    category: "Children's Audiobook",
    keywords: [
      "children's audiobook",
      "bedtime stories",
      "audiobook for kids",
      "ages 4-8",
      "pooshie",
      "hedgehog story",
      "kindness stories",
      "sleep stories for children",
      "audible kids audiobook",
      "free audiobook chapter",
    ],
  },

  seo: {
    bookName: "Pooshie · Stories of Pooshie & Kitty",
    bookAlternateName: "Pooshie · A Bedtime Audiobook",
    bookDescription:
      "A 13-chapter children's audiobook for ages 4–8. Gentle bedtime stories about a little pink hedgehog whose spines don't prick. Voiced by a real human, written for bedtime, total runtime 1h 24m.",
    orgDescription:
      "Pooshie is a children's audiobook brand publishing gentle bedtime stories for ages 4–8.",
    narrator: "A professional voice actress",
    genres: ["Children's literature", "Bedtime stories", "Animal fables"],
    keywords:
      "children's audiobook, bedtime story, hedgehog, ages 4-8, gentle storytelling, kindness, friendship, sleep stories",
    breadcrumbHome: "Home",
  },

  header: {
    nav,
    homeAria: "Pooshie home",
    primaryNavAria: "Primary",
    mobileNavAria: "Mobile primary",
    drawerAria: "Site navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    drawerMeta: "13 chapters · 1h 24m · ages 4–8",
    languageAria: "Language",
  },

  hero: {
    eyebrow: "An audiobook for young & grown-up children",
    titleStart: "A little",
    titleHighlight: "pink hedgehog",
    titleUnderline: "whose spines",
    titleEnd: "don't prick.",
    introTitle: "Stories of Pooshie & Kitty",
    introRest:
      " — thirteen gentle bedtime tales, voiced like a warm room and a soft lamp. Listen to the first chapter, free.",
    stats: [
      { n: "13", label: "Bedtime chapters" },
      { n: RUNTIME, label: "Total runtime" },
      { n: "4–8", label: "For ages" },
    ],
    portraitAlt: "Pooshie the pink hedgehog — watercolor portrait",
    swingAlt: "Pooshie and Kitty on a swing — watercolor",
    stampText: "free chapter · listen now · free chapter · ",
    sticker: "13 chapters",
    ribbonAria: "Play free preview of Chapter 1: {title}",
  },

  story: {
    pill: "A book of friendship",
    quote:
      "Pooshie was a little pink hedgehog who had never ever done anybody any harm. The most interesting thing about him was that *his spines didn't prick*.",
    attribution: "From the audiobook · written by Mr. Push",
    pillars,
  },

  listen: {
    pill: "Free chapter",
    heading: "Listen to the\nfirst *chapter* tonight",
    intro: "Press play. Tuck in. The other twelve chapters will be there when little eyes are ready for them.",
    audioAria: "Audio for chapter {n}: {title}",
    artworkAlt: "Chapter {n} artwork — {title}",
    seekAria: "Seek audio",
    back10: "Previous 10 seconds",
    forward10: "Next 10 seconds",
    play: "Play chapter 1",
    pause: "Pause",
    leadCopy: "Want Pooshie tucked into your inbox? Get a bonus chapter and gentle updates.",
    allChapters: "All chapters",
    chaptersMeta: `13 · ${RUNTIME}`,
    free: "free",
    getFull: "Get the full audiobook",
    platformsLabel: "Listen on the platforms you already use",
    platformAria: "Listen to Pooshie on {name} (opens in a new tab)",
    seeAll: "See every storefront →",
  },

  friends: {
    pill: "Meet the friends",
    heading: "A whole forest\nof *good souls*",
    intro: "Pooshie's world is full of unlikely friends. Hover any portrait to hear how they enter the story.",
    list: friends,
  },

  reviews: {
    pill: "From bedtime to circle time",
    heading: "Loved by *little hearts*\nand the grown-ups who tuck them in",
    /** Shown under the heading when the reviews are translated; empty for the original language. */
    translatedNote: "",
    starsAria: "{rating} out of 5 stars",
    items: reviews,
  },

  get: {
    pill: "Start tonight",
    heading: "Where to find *pooshie*",
    intro: `All thirteen chapters — ${RUNTIME} of warm storytelling — on the listening app you already use. Pick a storefront and press play.`,
    audiobookEyebrow: "The audiobook · English",
    audiobookTitle: "Listen anywhere",
    audiobookNote: "Narrated by a real human voice, with original music. Available worldwide.",
    audiobookFooter: "Not sure yet? Chapter 1 is free to stream right here — no signup, no card, just the story.",
    ebookEyebrow: "Prefer to read?",
    ebookTitle: "The Kindle ebook",
    ebookNote: "The same thirteen tales, with the original watercolour illustrations.",
    otherEyebrow: "Аудиокнигата · на български",
    otherTitle: "Разкази за Пуши и Кити",
    otherNote: "Цялата аудиокнига на български език, в Storytel.",
    /** Shown in place of the audiobook storefronts while there are none yet. */
    comingSoon: "Coming soon to your favourite listening apps.",
    /** Label of the big button when the first storefront is the main call to action. */
    primaryCta: "Listen on {name}",
    tileAria: "{name} — {region} (opens in a new tab)",
    bottomLine: "Available worldwide · Narrated by a real human, never AI · ISBN {isbn}",
  },

  platforms: { regions },

  faq: {
    pill: "Questions, gently answered",
    heading: "The little things *parents ask*",
    intro: "Everything you might want to know before pressing play tonight.",
    items: faqs,
  },

  finalCta: {
    heading: "Tonight's bedtime\nstory is *waiting*",
    body: "Press play once. By the time chapter one ends, little eyes will already be drifting.",
    availableWorldwide: "Available worldwide",
  },

  footer: {
    srHeading: "Footer",
    tagline:
      "A 13-chapter bedtime audiobook for ages 4–8. Gentle stories about a little pink hedgehog whose spines don't prick.",
    socialAria: "Pooshie on {name} (opens in a new tab)",
    newsletterHeading: "A bedtime letter, once in a while",
    newsletterCopy: "One quiet email when a new chapter or bonus story is ready. Never spam.",
    listenHeading: "Listen to the audiobook",
    alsoHeading: "Also available",
    allStorefronts: "All storefronts",
    everyCountry: "every country",
    navAria: "Footer",
    contact: "Contact",
    privacy: "Privacy",
    copyright: "© {year} Pooshie & Kitty · audiobook.pooshie.net · ISBN {isbn}",
  },

  leadForm: {
    formAria: "Subscribe for Pooshie updates",
    emailAria: "Email address",
    placeholder: "you@example.com",
    submit: "Send me Pooshie",
    sending: "Sending…",
    success: "Thank you. We'll be in touch soon — keep an ear out for Pooshie.",
    errorInvalid: "Please enter a valid email.",
    errorRateLimit: "Too many requests. Try again in a minute.",
    errorSave: "We couldn't save that. Please try again.",
    errorGeneric: "Something went wrong. Please try again.",
    errorNetwork: "Network error — please try again.",
  },

  mobileSticky: {
    getIt: "Get it",
  },

  consent: {
    title: "Cookies, gently",
    body: "With your OK we use cookies for analytics and marketing (Google) to see how families find Pooshie and how our ads are doing. Nothing like that is stored without your consent, and you can change your mind any time under “Cookie settings” at the bottom of the page.",
    accept: "Accept all",
    reject: "Only necessary",
    settings: "Cookie settings",
  },

  notFound: {
    title: "Page not found",
    eyebrow: "404 · lost in the meadow",
    heading: "That page *wandered off*",
    body: "Let's get you back to where Pooshie is waiting.",
    cta: "Back to the audiobook",
  },

  chapters,
};
