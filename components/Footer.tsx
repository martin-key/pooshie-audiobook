import { ISBN } from "@/lib/chapters";
import { AUDIOBOOK_PLATFORMS, BULGARIAN_PLATFORMS, EBOOK_PLATFORMS, SOCIAL_LINKS } from "@/lib/links";
import { LeadForm } from "./LeadForm";

const SOCIALS = [
  {
    name: "Facebook",
    href: SOCIAL_LINKS.facebook,
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z",
  },
  {
    name: "YouTube",
    href: SOCIAL_LINKS.youtube,
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
];

/** A short, curated set of storefront links — the full list lives in the #get section. */
const FOOTER_LISTEN = [
  AUDIOBOOK_PLATFORMS[0], // Audible US
  AUDIOBOOK_PLATFORMS[1], // Audible UK
  AUDIOBOOK_PLATFORMS[2], // Audible CA
  AUDIOBOOK_PLATFORMS[3], // Libro.fm
  AUDIOBOOK_PLATFORMS[4], // Everand
  AUDIOBOOK_PLATFORMS[5], // hoopla
  AUDIOBOOK_PLATFORMS[6], // Kobo
];

const FOOTER_READ = [BULGARIAN_PLATFORMS[0], EBOOK_PLATFORMS[0]];

const linkStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontFamily: "var(--font-ui)",
  fontSize: 13,
  lineHeight: 2,
};

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.5)",
        marginBottom: 10,
      }}
    >
      {children}
    </h3>
  );
}

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
              Pooshie
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

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {SOCIALS.map((sn) => (
                <a
                  key={sn.name}
                  href={sn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Pooshie on ${sn.name} (opens in a new tab)`}
                  className="social-dot"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={sn.path} />
                  </svg>
                </a>
              ))}
            </div>
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
          className="footer-links grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 48,
            paddingTop: 32,
            paddingBottom: 8,
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <ColumnHeading>Listen to the audiobook</ColumnHeading>
            <div className="footer-link-cols">
              {FOOTER_LISTEN.map((pl) => (
                <a
                  key={pl.href}
                  href={pl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={linkStyle}
                >
                  {pl.name}
                  <span style={{ color: "rgba(255,255,255,0.35)" }}> · {pl.region}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <ColumnHeading>Also available</ColumnHeading>
            <div className="footer-link-cols">
              {FOOTER_READ.map((pl) => (
                <a
                  key={pl.href}
                  href={pl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  style={linkStyle}
                >
                  {pl.name}
                  <span style={{ color: "rgba(255,255,255,0.35)" }}> · {pl.region}</span>
                </a>
              ))}
              <a href="/#get" className="footer-link" style={linkStyle}>
                All storefronts
                <span style={{ color: "rgba(255,255,255,0.35)" }}> · every country</span>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            marginTop: 24,
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
