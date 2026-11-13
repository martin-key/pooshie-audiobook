import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";
import { format, type Dictionary } from "@/lib/i18n";

export function Reviews({ dict }: { dict: Dictionary }) {
  const t = dict.reviews;
  const { quoteOpen, quoteClose } = dict.common;
  return (
    <section
      style={{ position: "relative", padding: "60px 0 120px" }}
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill bg="#FCE4EC" color="#E0195B">{t.pill}</Pill>
            <h2
              id="reviews-heading"
              className="display"
              style={{ fontSize: "clamp(36px, 5vw, 60px)", margin: "20px 0 12px" }}
            >
              <Rich text={t.heading} />
            </h2>
            {t.translatedNote && (
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  color: "#7c6c5a",
                  margin: 0,
                }}
              >
                {t.translatedNote}
              </p>
            )}
          </div>
        </Reveal>
        <div
          className="grid-3 reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 22 }}
        >
          {t.items.map((r, i) => (
            <Reveal key={r.author} delay={i * 100}>
              <figure
                style={{
                  background: "#fff",
                  border: "1px solid #f0e3cd",
                  borderRadius: 28,
                  padding: "28px 28px 24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  margin: 0,
                }}
              >
                <div
                  style={{ display: "flex", gap: 4, color: "#FBC85A", fontSize: 18 }}
                  aria-label={format(t.starsAria, { rating: r.rating })}
                >
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} aria-hidden>★</span>
                  ))}
                </div>
                {r.title && (
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 19,
                      lineHeight: 1.25,
                      color: "#1F2A37",
                      margin: 0,
                    }}
                  >
                    {r.title}
                  </h3>
                )}
                <blockquote
                  className="body-prose review-quote"
                  style={{
                    fontSize: 17,
                    fontStyle: "italic",
                    lineHeight: 1.55,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {quoteOpen}{r.text}{quoteClose}
                </blockquote>
                <figcaption>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#1F2A37",
                    }}
                  >
                    {r.author}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 12,
                      color: "#7c6c5a",
                      marginTop: 2,
                    }}
                  >
                    {r.authorSub}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
