import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";

const PILLARS = [
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

export function StoryBand() {
  return (
    <section
      id="story"
      style={{ position: "relative", padding: "120px 0 80px", overflow: "hidden" }}
      aria-labelledby="story-heading"
    >
      <SoftCloud
        w={420}
        h={180}
        opacity={0.6}
        style={{ position: "absolute", top: 60, left: "46%" }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 980 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill bg="#CFECF4" color="#0e5366">A book of friendship</Pill>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p
            id="story-heading"
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              textTransform: "none",
              textAlign: "center",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.005em",
              textWrap: "balance",
              color: "#1F2A37",
            }}
          >
            <span
              style={{
                color: "#E0195B",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.4em",
                verticalAlign: "-0.18em",
                marginRight: 4,
              }}
            >
              &ldquo;
            </span>
            Pooshie was a little pink hedgehog who had never ever done
            anybody any harm. The most interesting thing about him was that
            <em style={{ color: "#E0195B" }}> his spines didn&apos;t prick</em>.
            <span
              style={{
                color: "#E0195B",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.4em",
                verticalAlign: "-0.18em",
                marginLeft: 4,
              }}
            >
              &rdquo;
            </span>
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div
            style={{
              textAlign: "center",
              marginTop: 36,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7c6c5a",
            }}
          >
            From the audiobook · written by Mr. Push
          </div>
        </Reveal>

        <div
          className="grid-3 story-pillars"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            marginTop: 80,
          }}
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 28,
                  padding: 32,
                  border: "1px solid #f0e3cd",
                  height: "100%",
                  boxShadow: "0 12px 30px -16px rgba(31,42,55,.06)",
                }}
              >
                <div className="eyebrow" style={{ color: "#21A1C4" }}>
                  {p.eyebrow}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 24,
                    marginTop: 12,
                    color: "#1F2A37",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {p.title}
                </h3>
                <p className="body-prose-muted" style={{ marginTop: 12, fontSize: 16 }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
