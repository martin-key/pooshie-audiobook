import { ISBN } from "@/lib/chapters";
import { LeadForm } from "./LeadForm";

export function Footer() {
  return (
    <footer
      style={{
        background: "#1A2330",
        color: "rgba(255,255,255,0.65)",
        padding: "72px 0 40px",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" style={{ position: "absolute", left: -9999 }}>
        Footer
      </h2>
      <div className="container">
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                color: "#F8C8D6",
                letterSpacing: "-0.01em",
              }}
            >
              pooshie
            </span>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)",
                marginTop: 14,
                maxWidth: 380,
              }}
            >
              A 13-chapter bedtime audiobook for ages 4–8. Gentle stories about
              a little pink hedgehog whose spines don&apos;t prick.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                color: "#fff",
                marginBottom: 12,
              }}
            >
              A bedtime letter, once in a while
            </h3>
            <LeadForm
              context="footer"
              variant="dark"
              copy="One quiet email when a new chapter or bonus story is ready. Never spam."
            />
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)" }}>
            © {new Date().getFullYear()} Pooshie &amp; Kitty · audiobook.pooshie.net · ISBN {ISBN}
          </span>
          <nav
            aria-label="Footer"
            style={{ display: "flex", gap: 18, color: "rgba(255,255,255,0.55)" }}
          >
            <a href="mailto:hello@pooshie.net" style={{ color: "inherit", textDecoration: "none" }}>
              Contact
            </a>
            <span aria-hidden>·</span>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy
            </a>
            <span aria-hidden>·</span>
            <a href="/llms.txt" style={{ color: "inherit", textDecoration: "none" }}>
              llms.txt
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
