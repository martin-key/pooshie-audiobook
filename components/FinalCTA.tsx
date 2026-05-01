import { Reveal } from "./Reveal";
import { PlayGlyph } from "./icons/PlayGlyph";

export function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1F2A37",
        color: "#fff",
        padding: "140px 0 140px",
      }}
      aria-labelledby="final-cta-heading"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(224,25,91,0.25) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          right: "15%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#FBC85A",
          boxShadow: "0 0 20px #FBC85A",
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          top: 220,
          left: "20%",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#fff",
          opacity: 0.6,
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          bottom: 140,
          right: "30%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#F8C8D6",
        }}
        aria-hidden
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}
      >
        <Reveal>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, #FFF8EE 0%, #FBC85A 70%)",
              margin: "0 auto 28px",
              boxShadow: "0 0 60px rgba(251,200,90,.4)",
              animation: "float-y 6s ease-in-out infinite",
            }}
            aria-hidden
          />
        </Reveal>
        <Reveal delay={120}>
          <h2
            id="final-cta-heading"
            className="display"
            style={{
              color: "#fff",
              fontSize: "clamp(40px, 6vw, 80px)",
              textWrap: "balance",
            }}
          >
            Tonight&apos;s bedtime
            <br />
            story is <em style={{ color: "#F8C8D6" }}>waiting</em>
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 19,
              color: "rgba(255,255,255,0.75)",
              marginTop: 22,
              maxWidth: 560,
              marginInline: "auto",
            }}
          >
            Press play once. By the time chapter one ends, little eyes will already be drifting.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            <a href="#listen" className="btn btn-pink btn-lg">
              <PlayGlyph size={12} color="#fff" /> Listen free
            </a>
            <a
              href="#get"
              className="btn btn-lg"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.25)",
              }}
            >
              Get the audiobook · $9.99
            </a>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: 32,
            }}
          >
            Available worldwide · Audible · Spotify · Apple Books
          </p>
        </Reveal>
      </div>
    </section>
  );
}
