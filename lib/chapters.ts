export type Chapter = {
  n: number;
  title: string;
  dur: string; // mm:ss
  free?: boolean;
  blurb: string;
  art: string;
};

export const CHAPTERS: Chapter[] = [
  { n: 1, title: "The non-prickly hedgehog", dur: "7:12", free: true,
    blurb: "Pooshie was a little pink hedgehog who had never ever done anybody any harm…",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 2, title: "Kitty in the meadow", dur: "6:48",
    blurb: "A squirrel and her acorns that refuse to be cracked.",
    art: "/images/grass-friends.jpg" },
  { n: 3, title: "A song from a raindrop", dur: "5:31",
    blurb: "Listening, very quietly, with the daisies.",
    art: "/images/raindrop.jpg" },
  { n: 4, title: "Joe the Wolf at the pond", dur: "8:04",
    blurb: "How an unlikely friendship begins.",
    art: "/images/wolf-pooshie-pond.jpg" },
  { n: 5, title: "The pink puff and the swing", dur: "6:20",
    blurb: "A nap, a swing, and the longest afternoon.",
    art: "/images/swing.jpg" },
  { n: 6, title: "Owl says only what he wants", dur: "5:55",
    blurb: "A short lesson on listening.",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 7, title: "Aunt Elsa's tea", dur: "7:40",
    blurb: "Warm cups and warmer hearts.",
    art: "/images/grass-friends.jpg" },
  { n: 8, title: "Billy and Russel", dur: "6:12",
    blurb: "Two brothers, one secret.",
    art: "/images/raindrop.jpg" },
  { n: 9, title: "A snake who wasn't malicious", dur: "8:18",
    blurb: "On not judging from a distance.",
    art: "/images/wolf-pooshie-pond.jpg" },
  { n: 10, title: "The butterfly's exchange", dur: "4:55",
    blurb: "Divine nuances, traded for a wish.",
    art: "/images/swing.jpg" },
  { n: 11, title: "A little wind, a long whisper", dur: "6:02",
    blurb: "When the forest leans in to listen.",
    art: "/images/pooshie-portrait.jpeg" },
  { n: 12, title: "The map of all the soft places", dur: "7:30",
    blurb: "Pooshie draws a map for tired hearts.",
    art: "/images/grass-friends.jpg" },
  { n: 13, title: "Goodnight, little forest", dur: "8:25",
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

export const TOTAL_RUNTIME_LABEL = "2h 14m";
export const TOTAL_RUNTIME_ISO = "PT2H14M";
export const ISBN = "978-619-91473-0-6";
export const AUTHOR = "Mr. Push";
export const NARRATOR = "A professional voice actress";
export const AGE_RANGE = "4-8";
