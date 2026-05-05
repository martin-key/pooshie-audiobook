import { PlayGlyph } from "./icons/PlayGlyph";

export function HeroMiniRibbon() {
  return (
    <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: 0 }}>
      <a
        href="#listen"
        className="hero-ribbon"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          background: "#fff",
          borderRadius: 999,
          padding: "14px 22px",
          boxShadow:
            "0 14px 50px rgba(31,42,55,0.08), 0 2px 6px rgba(31,42,55,0.04)",
          textDecoration: "none",
          color: "inherit",
          border: "1px solid #f0e7d9",
          maxWidth: 760,
          margin: "0 auto",
        }}
        aria-label="Play free preview of Chapter 1: The Beginning"
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#E0195B",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 6px 16px rgba(224,25,91,.35)",
          }}
        >
          <PlayGlyph size={14} color="#fff" />
        </span>
        <div className="hero-ribbon-text" style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <span
            className="hero-ribbon-eyebrow"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#E0195B",
            }}
          >
            Free preview
          </span>
          <span
            className="hero-ribbon-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 18,
              color: "#1F2A37",
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Chapter 1 — <em style={{ fontStyle: "italic", fontWeight: 400 }}>The Beginning</em>
          </span>
        </div>
        <span
          className="hero-ribbon-wave"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 3,
            height: 24,
            flexShrink: 0,
          }}
          aria-hidden
        >
          {[0.6, 1, 0.8, 0.5, 1, 0.7, 0.9, 0.5, 0.7].map((h, i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: 24,
                background: "#E0195B",
                borderRadius: 2,
                transformOrigin: "center",
                animation: `wave-bounce ${0.7 + (i % 3) * 0.2}s ease-in-out ${i * 0.07}s infinite`,
                transform: `scaleY(${h})`,
              }}
            />
          ))}
        </span>
        <span
          className="hero-ribbon-time"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 12,
            color: "#7c6c5a",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginLeft: 6,
          }}
        >
          7:12
        </span>
      </a>
    </div>
  );
}
