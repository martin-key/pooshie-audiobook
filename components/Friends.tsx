import Image from "next/image";
import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";

const FRIENDS = [
  {
    name: "Pooshie",
    role: "The little pink hedgehog",
    quote: "His spines didn't prick. He had never done anybody any harm.",
    img: "/images/pooshie-portrait.jpeg",
    tilt: -2,
    color: "#E0195B",
  },
  {
    name: "Kitty",
    role: "A squirrel and good friend",
    quote: "Somehow this non-prickly pinkish ball gave her such peace of mind…",
    img: "/images/grass-friends.jpg",
    tilt: 3,
    color: "#6BBE4F",
  },
  {
    name: "Joe the Wolf",
    role: "A friend by the pond",
    quote: "Even wolves, sometimes, sit very still and listen.",
    img: "/images/wolf-pooshie-pond.jpg",
    tilt: -3,
    color: "#1F2A37",
  },
  {
    name: "The Raindrop",
    role: "A whisper from the sky",
    quote: "If you sit very quietly, you can hear its little song.",
    img: "/images/raindrop.jpg",
    tilt: 2,
    color: "#21A1C4",
  },
];

export function Friends() {
  return (
    <section
      id="friends"
      style={{ position: "relative", padding: "140px 0 120px", overflow: "hidden" }}
      aria-labelledby="friends-heading"
    >
      <SoftCloud
        w={460}
        h={200}
        opacity={0.7}
        style={{ position: "absolute", top: 80, left: -120 }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FCE4EC 0%, rgba(252,228,236,0) 70%)",
        }}
        aria-hidden
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 36,
              flexWrap: "wrap",
              marginBottom: 56,
            }}
          >
            <div>
              <Pill bg="#CFECF4" color="#0e5366">Meet the friends</Pill>
              <h2
                id="friends-heading"
                className="display"
                style={{ fontSize: "clamp(40px, 6vw, 72px)", marginTop: 18 }}
              >
                A whole forest
                <br />
                of <em>good souls</em>
              </h2>
            </div>
            <p
              className="body-prose-muted"
              style={{ maxWidth: 380, fontSize: 17 }}
            >
              Pooshie&apos;s world is full of unlikely friends. Hover any portrait
              to hear how they enter the story.
            </p>
          </div>
        </Reveal>

        <div
          className="grid-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
        >
          {FRIENDS.map((f, i) => (
            <Reveal key={f.name} delay={i * 90}>
              <article className="friend-card" tabIndex={0}>
                <div
                  className="friend-portrait"
                  style={{
                    position: "relative",
                    background: "#fff",
                    borderRadius: 32,
                    padding: 12,
                    border: "1px solid #f0e3cd",
                    boxShadow: "0 18px 40px -24px rgba(31,42,55,0.18)",
                    transform: `rotate(${f.tilt}deg)`,
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "4 / 5",
                      borderRadius: 24,
                      overflow: "hidden",
                      background: "#fff",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={f.img}
                      alt={`${f.name} — ${f.role}`}
                      fill
                      sizes="(max-width: 540px) 90vw, (max-width: 880px) 45vw, 280px"
                      className="friend-img"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      top: 22,
                      right: 22,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: f.color,
                      border: "3px solid #fff",
                      boxShadow: "0 4px 10px rgba(0,0,0,.1)",
                    }}
                    aria-hidden
                  />
                </div>

                <div style={{ marginTop: 22, paddingLeft: 6 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 26,
                      textTransform: "uppercase",
                      color: "#1F2A37",
                      letterSpacing: "-0.005em",
                      lineHeight: 1.05,
                    }}
                  >
                    {f.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: 15,
                      color: "#7c6c5a",
                      marginTop: 4,
                    }}
                  >
                    {f.role}
                  </p>

                  <p
                    className="body-prose friend-quote"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      marginTop: 14,
                      minHeight: 70,
                      color: "#1F2A37",
                    }}
                  >
                    <span style={{ color: f.color, fontWeight: 700 }}>&ldquo;</span>
                    {f.quote}
                    <span style={{ color: f.color, fontWeight: 700 }}>&rdquo;</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
