import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";
import { ISBN, TOTAL_RUNTIME_LABEL } from "@/lib/chapters";
import {
  AUDIOBOOK_PLATFORMS,
  BULGARIAN_PLATFORMS,
  EBOOK_PLATFORMS,
  type ExternalLink,
} from "@/lib/links";

function PlatformTile({ link }: { link: ExternalLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="platform-tile"
      aria-label={`${link.name} — ${link.region} (opens in a new tab)`}
    >
      <span className="platform-tile-dot" style={{ background: link.color }} aria-hidden>
        {link.glyph}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="platform-tile-name">{link.name}</span>
        <span className="platform-tile-region">{link.region}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="platform-tile-arrow">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function StoreCard({
  eyebrow,
  color,
  title,
  note,
  links,
  featured,
  twoUp,
  footer,
}: {
  eyebrow: string;
  color: string;
  title: string;
  note: string;
  links: ExternalLink[];
  featured?: boolean;
  twoUp?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <div className={`store-card ${featured ? "is-featured" : ""}`}>
      <div>
        <div className="eyebrow" style={{ color }}>
          {eyebrow}
        </div>
        <h3 className="store-card-title">{title}</h3>
        <p className="body-prose-muted store-card-note">{note}</p>
      </div>
      <div className={twoUp ? "platform-grid is-two-up" : "platform-grid"}>
        {links.map((l) => (
          <PlatformTile key={l.href} link={l} />
        ))}
      </div>
      {footer}
    </div>
  );
}

export function GetTheAudiobook() {
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
      aria-labelledby="get-heading"
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
              marginBottom: 56,
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            <Pill>Start tonight</Pill>
            <h2
              id="get-heading"
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "20px 0 16px" }}
            >
              Where to find <em>pooshie</em>
            </h2>
            <p className="body-prose-muted" style={{ fontSize: 18 }}>
              All thirteen chapters — {TOTAL_RUNTIME_LABEL} of warm storytelling — on the
              listening app you already use. Pick a storefront and press play.
            </p>
          </div>
        </Reveal>

        <div className="get-grid">
          <Reveal className="get-grid-main">
            <StoreCard
              featured
              twoUp
              eyebrow="The audiobook · English"
              color="#E0195B"
              title="Listen anywhere"
              note="Narrated by a real human voice, with original music. Available worldwide."
              links={AUDIOBOOK_PLATFORMS}
              footer={
                <div className="store-card-footer">
                  <p className="body-prose-muted" style={{ fontSize: 15, margin: 0 }}>
                    Not sure yet? Chapter&nbsp;1 is free to stream right here — no signup, no
                    card, just the story.
                  </p>
                  <a href="#listen" className="btn btn-pink" style={{ marginTop: 16 }}>
                    Listen to chapter 1
                  </a>
                </div>
              }
            />
          </Reveal>

          <div className="get-grid-side">
            <Reveal delay={110}>
              <StoreCard
                eyebrow="Аудиокнигата · на български"
                color="#21A1C4"
                title="Разкази за Пуши и Кити"
                note="Цялата аудиокнига на български език, в Storytel."
                links={BULGARIAN_PLATFORMS}
              />
            </Reveal>
            <Reveal delay={200}>
              <StoreCard
                eyebrow="Prefer to read?"
                color="#6BBE4F"
                title="The Kindle ebook"
                note="The same thirteen tales, with the original watercolour illustrations."
                links={EBOOK_PLATFORMS}
              />
            </Reveal>
          </div>
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
            Available worldwide · Narrated by a real human, never AI · ISBN {ISBN}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
