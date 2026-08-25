export type Chapter = {
  n: number;
  title: string;
  dur: string; // mm:ss
  free?: boolean;
  blurb: string;
  art: string;
};

export const CHAPTERS: Chapter[] = [
  { n: 1, title: "The Beginning", dur: "6:48", free: true,
    blurb: "Pooshie was a little pink hedgehog who had never ever done anybody any harm…",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 2, title: "Billy and Russell's Mushrooms", dur: "6:26",
    blurb: "A squirrel and her acorns that refuse to be cracked.",
    art: "/images/grass-friends.jpg" },
  { n: 3, title: "Joe the Wolf", dur: "5:00",
    blurb: "Listening, very quietly, with the daisies.",
    art: "/images/raindrop.jpg" },
  { n: 4, title: "The Raindrop", dur: "7:38",
    blurb: "How an unlikely friendship begins.",
    art: "/images/wolf-pooshie-pond.jpg" },
  { n: 5, title: "A Creamy-Pink Tummy Vista", dur: "5:59",
    blurb: "A nap, a swing, and the longest afternoon.",
    art: "/images/swing.jpg" },
  { n: 6, title: "Aunt Elsa", dur: "5:36",
    blurb: "A short lesson on listening.",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 7, title: "Cloudy", dur: "7:15",
    blurb: "Warm cups and warmer hearts.",
    art: "/images/grass-friends.jpg" },
  { n: 8, title: "The Butterfly", dur: "5:52",
    blurb: "Two brothers, one secret.",
    art: "/images/raindrop.jpg" },
  { n: 9, title: "The Sleepy Snake", dur: "7:51",
    blurb: "On not judging from a distance.",
    art: "/images/wolf-pooshie-pond.jpg" },
  { n: 10, title: "The River", dur: "5:00",
    blurb: "Divine nuances, traded for a wish.",
    art: "/images/swing.jpg" },
  { n: 11, title: "Birthday on the 22nd", dur: "5:42",
    blurb: "When the forest leans in to listen.",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 12, title: "A Christmas Present", dur: "7:05",
    blurb: "Pooshie draws a map for tired hearts.",
    art: "/images/grass-friends.jpg" },
  { n: 13, title: "The Little Hill", dur: "7:48",
    blurb: "A lullaby for everyone, asleep or awake.",
    art: "/images/raindrop.jpg" },
];

export const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const parseDur = (d: string): number => {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
};

export const TOTAL_RUNTIME_LABEL = "1h 24m";
export const TOTAL_RUNTIME_ISO = "PT1H24M";
export const ISBN = "978-619-91473-0-6";
export const AUTHOR = "Mr. Push";
export const NARRATOR = "A professional voice actress";
export const AGE_RANGE = "4-8";
