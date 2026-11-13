// German copy (Deutsch) for the German edition „Erzählungen über Puschi und Kitty“.
// Must match the shape of en.ts — the compiler enforces it.
//
// From the DACH marketing strategy (13 Nov 2026):
//   - The name is always „Puschi“, the author always „Mr. Push“.
//   - Positioning line, used everywhere:
//     „Gute-Nacht-Geschichten über Freundschaft, Mitgefühl und Mut – für Kinder von 4 bis 8.“
//   - Search terms to keep in metadata and on the page:
//     „Gute-Nacht-Geschichten“, „Einschlafgeschichten“, „Hörbuch für Kinder“.
//   - Narrated by Melina Camus. Audible.de is the one main call to action.
// Before launch, have a native speaker (e.g. Melina) proofread this file.

import type { Dictionary } from "..";
import type { ChapterText, Faq, FriendText, NavLink, Pillar, RegionKey, Review } from "../types";

const RUNTIME = "1 Std. 24 Min.";
const POSITIONING = "Gute-Nacht-Geschichten über Freundschaft, Mitgefühl und Mut – für Kinder von 4 bis 8.";
const TITLE = "Erzählungen über Puschi und Kitty";
const NARRATOR = "Melina Camus";

const chapters: ChapterText[] = [
  { title: "Der Anfang", blurb: "Puschi war ein kleiner rosa Igel, der noch nie, wirklich noch nie jemandem etwas zuleide getan hatte …" },
  { title: "Die Pilze von Billy und Russell", blurb: "Ein Eichhörnchen und seine Eicheln, die sich partout nicht knacken lassen." },
  { title: "Joe der Wolf", blurb: "Ganz leise lauschen, gemeinsam mit den Gänseblümchen." },
  { title: "Der Regentropfen", blurb: "Wie eine ungewöhnliche Freundschaft beginnt." },
  { title: "Ein Bauchblick in beige-rosa", blurb: "Ein Nickerchen, eine Schaukel und der längste Nachmittag." },
  { title: "Tante Elsa", blurb: "Eine kleine Lektion im Zuhören." },
  { title: "Wolkig", blurb: "Warme Tassen und noch wärmere Herzen." },
  { title: "Der Schmetterling", blurb: "Zwei Brüder, ein Geheimnis." },
  { title: "Die schläfrige Schlange", blurb: "Warum man nicht aus der Ferne urteilen sollte." },
  { title: "Der Fluss", blurb: "Göttliche Nuancen, eingetauscht gegen einen Wunsch." },
  { title: "Geburtstag am 22sten", blurb: "Wenn der Wald sich vorbeugt, um zuzuhören." },
  { title: "Weihnachtsgeschenk", blurb: "Puschi zeichnet eine Landkarte für müde Herzen." },
  { title: "Das Hügelchen", blurb: "Ein Schlaflied für alle – ob sie schon schlafen oder noch wach sind." },
];

const friends: FriendText[] = [
  {
    name: "Puschi",
    role: "Der kleine rosa Igel",
    quote: "Seine Stacheln pieksten nicht. Er hatte noch nie jemandem etwas zuleide getan.",
  },
  {
    name: "Kitty",
    role: "Ein Eichhörnchen und Puschis beste Freundin",
    quote: "Irgendwie schenkte ihr dieses nicht pieksende, rosige Knäuel so viel innere Ruhe …",
  },
  {
    name: "Joe der Wolf",
    role: "Ein Freund am Teich",
    quote: "Auch Wölfe sitzen manchmal ganz still da und hören zu.",
  },
  {
    name: "Der Regentropfen",
    role: "Ein Flüstern vom Himmel",
    quote: "Wenn du ganz still sitzt, kannst du sein kleines Lied hören.",
  },
];

// Reader reviews of the English edition, translated. Replace with reviews from
// Audible.de / Amazon.de once the German edition has them.
const reviews: Review[] = [
  {
    title: "Eine wunderbare Sammlung von Gute-Nacht-Geschichten!",
    text:
      "Ich bin froh, dass ich auf dieses Buch gestoßen bin. Mit ‚Puschi und Kitty‘ lernen wir etwas über Freundschaft, Geduld und Achtsamkeit. Auch wenn die Geschichten für Kinder geschrieben sind, können sie Erwachsenen viel über diese Tugenden beibringen – und darüber, wie wir unser Leben auf Dinge ausrichten, die klein wirken, aber für unser Wohlbefinden und für die Gesellschaft sehr wichtig sind. Puschi hat die Arglosigkeit eines Kindes und zugleich die Weisheit der Eule. Die kleinen Gesten der Verbundenheit zwischen Puschi und Kitty zeigen, wie schön Freundschaft sein kann, auch wenn die beiden ganz verschieden sind. Ein wunderbares Buch, um Kindern wertvolle Tugenden mitzugeben, auf die sie bauen können, wenn sie erwachsen werden.",
    author: "Verifizierte Leserstimme",
    authorSub: "Leserrezension",
    rating: 5,
  },
  { text: "Meine Tochter möchte jeden Abend Puschi hören. Die Stimme ist so warm – sie schläft mit einem Lächeln ein.", author: "Sarah M.", authorSub: "Mutter von zwei Kindern · USA", rating: 5 },
  { text: "Nichts kommt da heran. Die Musik, das Erzählen, die Werte – jeden Cent wert.", author: "James T.", authorSub: "Vater von drei Kindern · UK", rating: 5 },
  { text: "Ich nutze Puschi in meiner Gruppe für den Morgenkreis. Die Kinder lieben es, und wir sprechen jeden Tag über Freundlichkeit.", author: "Elena R.", authorSub: "Erzieherin im Kindergarten", rating: 5 },
];

const faqs: Faq[] = [
  {
    q: "Wie lang ist ein Kapitel?",
    a: `Jedes Kapitel dauert 5–8 Minuten – lang genug, um zur Ruhe zu kommen, kurz genug, um nicht gleich ein zweites anzufangen. Das ganze Hörbuch hat 13 Kapitel und eine Spieldauer von ${RUNTIME} (1 Stunde und 24 Minuten).`,
  },
  {
    q: "Wer liest das Puschi-Hörbuch?",
    a: `${NARRATOR} – eine echte Stimme, niemals eine KI. In jeder Zeile hört man ihr Lächeln.`,
  },
  {
    q: "Für welches Alter ist das Puschi-Hörbuch?",
    a: "Es ist ein Hörbuch für Kinder von 4 bis 8 Jahren, aber die Art des Erzählens lädt auch Erwachsene zum Mithören ein. Viele Eltern sagen, dass es längst auch ihre eigene Gute-Nacht-Geschichte ist.",
  },
  {
    q: "Wo kann ich das Hörbuch hören?",
    a: `„${TITLE}“ erscheint als Hörbuch bei Audible.de und in vielen weiteren Hör-Apps. Das E-Book mit den Aquarell-Illustrationen gibt es bei Amazon.de. Das erste Kapitel kannst du direkt auf dieser Seite gratis hören – ganz ohne Anmeldung.`,
  },
  {
    q: "Ist das erste Kapitel wirklich gratis?",
    a: "Ja. Drück auf dieser Seite bei Kapitel 1 – „Der Anfang“ – auf Play. Keine E-Mail, keine Anmeldung, keine Karte. Nur die Geschichte.",
  },
  {
    q: "Worum geht es in dem Hörbuch?",
    a: "Puschi ist ein kleiner rosa Igel, dessen Stacheln nicht pieksen. In 13 Einschlafgeschichten trifft er Kitty, das Eichhörnchen, Joe den Wolf, eine Eule, einen Schmetterling und einen Regentropfen – und erzählt ganz leise von Freundschaft, Mitgefühl und Mut, ohne je belehrend zu sein.",
  },
];

const pillars: Pillar[] = [
  {
    eyebrow: "Gelesen von",
    title: NARRATOR,
    body: "Eine echte Stimme, keine KI: Melina Camus lebt in jeder Geschichte mit. Man hört ihr Lächeln.",
  },
  {
    eyebrow: "Geschrieben für",
    title: "Die Schlafenszeit – ganz bewusst",
    body: "Einschlafgeschichten von 5–8 Minuten – lang genug, um zur Ruhe zu kommen, kurz genug, um nicht gleich ein zweites Kapitel anzufangen.",
  },
  {
    eyebrow: "Worum es geht",
    title: "Freundschaft, Mitgefühl und Mut",
    body: "Gute-Nacht-Geschichten, die ganz leise Werte mitgeben – nie belehrend, nie laut. Zuerst kommt die Geschichte.",
  },
];

const nav: NavLink[] = [
  { label: "Die Geschichte", href: "#story" },
  { label: "Gratis-Kapitel", href: "#listen" },
  { label: "Die Freunde", href: "#friends" },
  { label: "Wo erhältlich", href: "#get" },
  { label: "FAQ", href: "#faq" },
];

const regions: Record<RegionKey, string> = {
  us: "USA",
  uk: "Großbritannien",
  ca: "Kanada",
  it: "Italien",
  br: "Brasilien",
  de: "Deutschland",
  indie: "Unterstützt unabhängige Buchläden",
  indieShort: "Indie-Buchläden",
  subscription: "Im Abo enthalten",
  subscriptionShort: "Abo",
  library: "Gratis mit Bibliotheksausweis",
  libraryShort: "Bibliothek",
  kobo: "Rakuten Kobo",
  bgTitle: "Разкази за Пуши и Кити",
  bgShort: "На български",
};

export const de: Dictionary = {
  common: {
    brand: "Puschi",
    runtime: RUNTIME,
    listenFree: "Gratis anhören",
    listenChapter1: "Kapitel 1 anhören",
    getAudiobook: "Zum Hörbuch",
    freePreview: "Gratis-Hörprobe",
    chapter: "Kapitel",
    quoteOpen: "„",
    quoteClose: "“",
  },

  meta: {
    siteTitle: "Puschi · Gute-Nacht-Geschichten für Kinder von 4 bis 8",
    titleTemplate: "%s · Puschi",
    siteDescription: `${POSITIONING} Das Hörbuch „${TITLE}“ in 13 Kapiteln, gelesen von ${NARRATOR}.`,
    homeTitle: "Puschi · Gute-Nacht-Geschichten als Hörbuch für Kinder (4–8)",
    homeDescription: `${POSITIONING} 13 Einschlafgeschichten als Hörbuch für Kinder, gelesen von ${NARRATOR}. Kapitel 1 gratis anhören.`,
    ogDescription: `${POSITIONING} Gelesen von ${NARRATOR}. Erstes Kapitel gratis.`,
    twitterDescription: `${POSITIONING} Erstes Kapitel gratis.`,
    ogImageAlt: "Puschi – ein Aquarellporträt eines kleinen rosa Igels",
    category: "Kinderhörbuch",
    keywords: [
      "Gute-Nacht-Geschichten",
      "Einschlafgeschichten",
      "Hörbuch für Kinder",
      "Gutenachtgeschichten",
      "Kinderhörbuch",
      "Hörbuch 4-8 Jahre",
      "Puschi",
      TITLE,
      "Geschichten über Freundschaft",
      "Melina Camus",
    ],
  },

  seo: {
    bookName: TITLE,
    bookAlternateName: "Puschi · 13 Gute-Nacht-Geschichten für Kinder",
    bookDescription: `${POSITIONING} 13 Einschlafgeschichten über Puschi, einen kleinen rosa Igel, dessen Stacheln nicht pieksen, und seine beste Freundin Kitty. Gelesen von ${NARRATOR}.`,
    orgDescription: `Puschi – ${POSITIONING}`,
    narrator: NARRATOR,
    genres: ["Kinderliteratur", "Gute-Nacht-Geschichten", "Tierfabeln"],
    keywords:
      "Gute-Nacht-Geschichten, Einschlafgeschichten, Hörbuch für Kinder, Kinderhörbuch, Igel, 4-8 Jahre, Freundschaft, Mitgefühl, Mut",
    breadcrumbHome: "Startseite",
  },

  header: {
    nav,
    homeAria: "Puschi – Startseite",
    primaryNavAria: "Hauptnavigation",
    mobileNavAria: "Mobile Hauptnavigation",
    drawerAria: "Seitennavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    drawerMeta: "13 Kapitel · 1 Std. 24 Min. · 4–8 Jahre",
    languageAria: "Sprache",
  },

  hero: {
    eyebrow: "Ein Hörbuch für Kinder von 4 bis 8",
    titleStart: "Ein kleiner",
    titleHighlight: "rosa Igel,",
    titleUnderline: "dessen Stacheln",
    titleEnd: "nicht pieksen.",
    introTitle: TITLE,
    introRest: `: ${POSITIONING} Warm gelesen von ${NARRATOR}. Das erste Kapitel hörst du gratis.`,
    stats: [
      { n: "13", label: "Gute-Nacht-Kapitel" },
      { n: "84 Min.", label: "Spieldauer" },
      { n: "4–8", label: "Jahre" },
    ],
    portraitAlt: "Puschi, der rosa Igel – Aquarellporträt",
    swingAlt: "Puschi und Kitty auf einer Schaukel – Aquarell",
    // One loop around the stamp: longer text is cut off at the end of the circle.
    stampText: "gratis-kapitel · jetzt hören · ",
    sticker: "13 Kapitel",
    ribbonAria: "Gratis-Hörprobe von Kapitel 1 abspielen: {title}",
  },

  story: {
    pill: "Ein Buch über Freundschaft",
    quote:
      "Puschi war ein kleiner rosa Igel, der noch nie, wirklich noch nie jemandem etwas zuleide getan hatte. Das Interessanteste an ihm war, dass *seine Stacheln nicht pieksten*.",
    attribution: `Aus „${TITLE}“ · von Mr. Push`,
    pillars,
  },

  listen: {
    pill: "Gratis-Kapitel",
    heading: "Heute Abend:\ndas erste *Kapitel*",
    intro: "Auf Play drücken. Zudecken. Die anderen zwölf Kapitel warten geduldig, bis kleine Augen bereit für sie sind.",
    audioAria: "Audio für Kapitel {n}: {title}",
    artworkAlt: "Illustration zu Kapitel {n} – {title}",
    seekAria: "Im Audio springen",
    back10: "10 Sekunden zurück",
    forward10: "10 Sekunden vor",
    play: "Kapitel 1 abspielen",
    pause: "Pause",
    leadCopy: "Puschi direkt ins Postfach? Hol dir ein Bonuskapitel und ab und zu sanfte Neuigkeiten.",
    allChapters: "Alle Kapitel",
    chaptersMeta: `13 · ${RUNTIME}`,
    free: "gratis",
    getFull: "Das ganze Hörbuch holen",
    platformsLabel: "Hör auf den Plattformen, die du schon nutzt",
    platformAria: "Puschi auf {name} anhören (öffnet in neuem Tab)",
    seeAll: "Alle Shops ansehen →",
  },

  friends: {
    pill: "Die Freunde",
    heading: "Ein ganzer Wald\nvoller *guter Seelen*",
    intro: "Puschis Welt ist voller ungewöhnlicher Freunde. Fahr mit der Maus über ein Porträt und erfahre, wie sie in die Geschichte kommen.",
    list: friends,
  },

  reviews: {
    pill: "Von der Gute-Nacht-Zeit bis zum Morgenkreis",
    heading: "Geliebt von *kleinen Herzen*\nund den Großen, die sie zudecken",
    translatedNote: "Stimmen zur englischen Ausgabe, aus dem Englischen übersetzt",
    starsAria: "{rating} von 5 Sternen",
    items: reviews,
  },

  get: {
    pill: "Heute Abend anfangen",
    heading: "Wo du *puschi* findest",
    intro: `Alle dreizehn Gute-Nacht-Geschichten – ${RUNTIME} zum Einschlafen – als Hörbuch für Kinder und als illustriertes E-Book.`,
    audiobookEyebrow: "Das Hörbuch · auf Deutsch",
    audiobookTitle: TITLE,
    audiobookNote: `Gelesen von ${NARRATOR} – eine echte Stimme, keine KI.`,
    audiobookFooter: "Noch unsicher? Kapitel 1 kannst du hier gratis hören – ohne Anmeldung, ohne Karte, nur die Geschichte.",
    ebookEyebrow: "Lieber selbst lesen?",
    ebookTitle: "Das Kindle-E-Book",
    ebookNote: "Dieselben dreizehn Geschichten auf Deutsch, mit den originalen Aquarell-Illustrationen.",
    otherEyebrow: "Andere Sprachen",
    otherTitle: "Auf Englisch & Bulgarisch",
    otherNote: "Das Original „The Tales of Pooshie and Kitty“ und die bulgarische Ausgabe „Разкази за Пуши и Кити“.",
    comingSoon: "Das Hörbuch erscheint in Kürze bei Audible.de und in vielen weiteren Hör-Apps.",
    primaryCta: "Bei {name} anhören",
    tileAria: "{name} – {region} (öffnet in neuem Tab)",
    bottomLine: `Gelesen von ${NARRATOR} · eine echte Stimme, nie KI · für Kinder von 4 bis 8`,
  },

  platforms: { regions },

  faq: {
    pill: "Fragen, sanft beantwortet",
    heading: "Was Eltern *wissen möchten*",
    intro: "Alles, was du wissen möchtest, bevor du heute Abend auf Play drückst.",
    items: faqs,
  },

  finalCta: {
    heading: "Die Geschichte für\nheute Abend *wartet* schon",
    body: "Einmal auf Play drücken. Noch bevor das erste Kapitel zu Ende ist, werden kleine Augen schon schwer.",
    availableWorldwide: "Erhältlich",
  },

  footer: {
    srHeading: "Fußzeile",
    tagline: `${POSITIONING} Mit Puschi, einem kleinen rosa Igel, dessen Stacheln nicht pieksen.`,
    socialAria: "Puschi auf {name} (öffnet in neuem Tab)",
    newsletterHeading: "Ab und zu ein Gute-Nacht-Brief",
    newsletterCopy: "Eine leise E-Mail, wenn ein neues Kapitel oder eine Bonusgeschichte fertig ist. Niemals Spam.",
    listenHeading: "Das Hörbuch anhören",
    alsoHeading: "Ebenfalls erhältlich",
    allStorefronts: "Alle Shops",
    everyCountry: "alle Länder",
    navAria: "Fußzeile",
    contact: "Kontakt",
    privacy: "Datenschutz",
    copyright: "© {year} Puschi & Kitty · audiobook.pooshie.net",
  },

  leadForm: {
    formAria: "Puschi-Neuigkeiten abonnieren",
    emailAria: "E-Mail-Adresse",
    placeholder: "du@beispiel.de",
    submit: "Schick mir Puschi",
    sending: "Wird gesendet …",
    success: "Danke! Wir melden uns bald – halte die Ohren offen für Puschi.",
    errorInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
    errorRateLimit: "Zu viele Anfragen. Bitte versuch es in einer Minute noch einmal.",
    errorSave: "Das konnten wir leider nicht speichern. Bitte versuch es noch einmal.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuch es noch einmal.",
    errorNetwork: "Netzwerkfehler – bitte versuch es noch einmal.",
  },

  mobileSticky: {
    getIt: "Hörbuch",
  },

  consent: {
    title: "Cookies, ganz sanft",
    body: "Mit deiner Zustimmung nutzen wir Cookies für Statistik und Marketing (Google), um zu sehen, wie Familien Puschi finden und wie unsere Werbung wirkt. Ohne deine Zustimmung wird nichts davon gespeichert. Du kannst deine Wahl jederzeit unter „Cookie-Einstellungen“ unten auf der Seite ändern.",
    accept: "Alle akzeptieren",
    reject: "Nur notwendige",
    settings: "Cookie-Einstellungen",
  },

  notFound: {
    title: "Seite nicht gefunden",
    eyebrow: "404 · auf der Wiese verlaufen",
    heading: "Diese Seite ist *davongewandert*",
    body: "Wir bringen dich zurück – dorthin, wo Puschi schon auf dich wartet.",
    cta: "Zurück zum Hörbuch",
  },

  chapters,
};
