import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";
import { PURCHASE_LINKS } from "@/lib/links";

type Tier = {
  kind: string;
  name: string;
  price: string;
  per: string;
  bullets: string[];
  color: string;
  cta: string;
  buttonStyle: "pink" | "ghost" | "teal";
  href: string;
  featured?: boolean;
};

const PRICING: Tier[] = [
  {
    kind: "Single chapter",
    name: "A taste",
    price: "$1.99",
    per: "per chapter, forever",
    bullets: [
      "Any one chapter you choose",
      "~7 minutes of bedtime",
      "Listen on all platforms",
      "Perfect for trying Pooshie",
    ],
    color: "#21A1C4",
    cta: "Pick a chapter",
    buttonStyle: "ghost",
    href: PURCHASE_LINKS.single,
  },
  {
    kind: "Full audiobook",
    name: "All 13",
    price: "$9.99",
    per: "all chapters, forever",
    bullets: [
      "Every one of the 13 chapters",
      "2h 14m of warm storytelling",
      "Original music, real voice",
      "Listen on Audible, Spotify, Apple",
      "ISBN 978-619-91473-0-6",
    ],
    color: "#E0195B",
    cta: "Get the audiobook",
    buttonStyle: "pink",
    href: PURCHASE_LINKS.full,
    featured: true,
  },
  {
    kind: "Bundle",
    name: "+ Pooshie plush",
    price: "$34.99",
    per: "audiobook + plush hedgehog",
    bullets: [
      "Everything in the full audiobook",
      "A soft Pooshie hedgehog (non-prickly!)",
      "Wraps & ships worldwide",
      "A keepsake for little arms",
    ],
    color: "#6BBE4F",
    cta: "Get the bundle",
    buttonStyle: "ghost",
    href: PURCHASE_LINKS.bundle,
  },
];

export function Pricing() {
  return (
    <section
      id="get"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFF8EE",
        padding: "140px 0 140px",
        borderTop: "1px solid #f0e3cd",
      }}
      aria-labelledby="pricing-heading"
    >
      <SoftCloud
        w={520}
        h={220}
        opacity={0.7}
        style={{ position: "absolute", top: 80, right: -160 }}
      />
      <SoftCloud
        w={420}
        h={180}
        opacity={0.6}
        style={{ position: "absolute", bottom: 120, left: -120 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div
            style={{
              textAlign: "center",
              marginBottom: 64,
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            <Pill>Start tonight</Pill>
            <h2
              id="pricing-heading"
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "20px 0 16px" }}
            >
              Choose your <em>pooshie</em>
            </h2>
            <p className="body-prose-muted" style={{ fontSize: 18 }}>
              No subscription. Own the stories — they&apos;re yours, forever.
            </p>
          </div>
        </Reveal>

        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          {PRICING.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 110}
              className={t.featured ? "price-tile-wrap is-featured-wrap" : "price-tile-wrap"}
            >
              <div
                className={`price-card ${t.featured ? "is-featured" : "is-default"}`}
                style={{
                  position: "relative",
                  height: "100%",
                  background: "#fff",
                  border: t.featured ? "2px solid #E0195B" : "1px solid #f0e3cd",
                  borderRadius: 32,
                  padding: "36px 32px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  boxShadow: t.featured
                    ? "0 30px 60px -20px rgba(224,25,91,.25)"
                    : "0 12px 30px -22px rgba(31,42,55,.1)",
                }}
              >
                {t.featured && (
                  <div
                    className="featured-badge"
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#E0195B",
                      color: "#fff",
                      fontFamily: "var(--font-ui)",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      padding: "8px 18px",
                      borderRadius: 999,
                      boxShadow: "0 8px 18px rgba(224,25,91,.35)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ★ Best value
                  </div>
                )}

                <div>
                  <div className="eyebrow" style={{ color: t.color }}>{t.kind}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 28,
                      textTransform: "uppercase",
                      marginTop: 10,
                      color: "#1F2A37",
                    }}
                  >
                    {t.name}
                  </h3>
                </div>

                <div>
                  <div
                    className="price-amount"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 56,
                      lineHeight: 1,
                      color: t.color,
                    }}
                  >
                    {t.price}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 12,
                      color: "#7c6c5a",
                      marginTop: 6,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.per}
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#FCE4EC",
                          color: "#E0195B",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                          marginTop: 2,
                        }}
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="body-prose" style={{ fontSize: 15, lineHeight: 1.45 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener"
                  className={`btn ${t.buttonStyle === "pink" ? "btn-pink" : "btn-ghost"}`}
                  style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div
            style={{
              textAlign: "center",
              marginTop: 48,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "#7c6c5a",
            }}
          >
            Available instantly · No subscription · Listen on any device
          </div>
        </Reveal>
      </div>
    </section>
  );
}
