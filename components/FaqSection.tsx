import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { FAQS } from "@/lib/seo";

export function FaqSection() {
  return (
    <section
      id="faq"
      style={{ position: "relative", padding: "120px 0 100px" }}
      aria-labelledby="faq-heading"
    >
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Pill bg="#CFECF4" color="#0e5366">Questions, gently answered</Pill>
            <h2
              id="faq-heading"
              className="display"
              style={{ fontSize: "clamp(36px, 5vw, 60px)", margin: "20px 0 12px" }}
            >
              The little things <em>parents ask</em>
            </h2>
            <p className="body-prose-muted" style={{ fontSize: 18, maxWidth: 540, margin: "0 auto" }}>
              Everything you might want to know before pressing play tonight.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              background: "#fff",
              borderRadius: 32,
              border: "1px solid #f0e3cd",
              padding: "8px 32px 8px 32px",
              boxShadow: "0 12px 40px -22px rgba(31,42,55,.1)",
            }}
          >
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
