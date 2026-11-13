import { Pill } from "./icons/Pill";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";
import { Rich } from "./Rich";
import { Facts } from "./Facts";
import { ISBN } from "@/lib/chapters";
import { format, type Dictionary, type Locale } from "@/lib/i18n";
import { STOREFRONTS, type ExternalLink } from "@/lib/links";

type Labels = { tileAria: string; regions: Dictionary["platforms"]["regions"] };

function PlatformTile({ link, labels }: { link: ExternalLink; labels: Labels }) {
  const region = labels.regions[link.region];
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="platform-tile"
      aria-label={format(labels.tileAria, { name: link.name, region })}
    >
      <span className="platform-tile-dot" style={{ background: link.color }} aria-hidden>
        {link.glyph}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="platform-tile-name">{link.name}</span>
        <span className="platform-tile-region">{region}</span>
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
  labels,
  featured,
  twoUp,
  lead,
  footer,
}: {
  eyebrow: string;
  color: string;
  title: string;
  note: string;
  links: ExternalLink[];
  labels: Labels;
  featured?: boolean;
  twoUp?: boolean;
  /** Shown between the heading and the tiles — the main button, or a "coming soon" note. */
  lead?: React.ReactNode;
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
      {lead}
      {links.length > 0 && (
        <div className={twoUp ? "platform-grid is-two-up" : "platform-grid"}>
          {links.map((l) => (
            <PlatformTile key={l.href} link={l} labels={labels} />
          ))}
        </div>
      )}
      {footer}
    </div>
  );
}

export function GetTheAudiobook({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.get;
  const labels: Labels = { tileAria: t.tileAria, regions: dict.platforms.regions };
  const stores = STOREFRONTS[locale];
  // One clear call to action: the first audiobook store as a big button, the rest as tiles.
  const primary = stores.primaryFirst ? stores.audiobook[0] : undefined;
  const audiobookTiles = primary ? stores.audiobook.slice(1) : stores.audiobook;

  let audiobookLead: React.ReactNode = null;
  if (primary) {
    audiobookLead = (
      <a
        href={primary.href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-pink btn-lg store-card-primary"
        aria-label={format(t.tileAria, { name: primary.name, region: labels.regions[primary.region] })}
      >
        {format(t.primaryCta, { name: primary.name })}
      </a>
    );
  } else if (stores.audiobook.length === 0) {
    audiobookLead = <p className="store-card-soon">{t.comingSoon}</p>;
  }
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
            <Pill>{t.pill}</Pill>
            <h2
              id="get-heading"
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", margin: "20px 0 16px" }}
            >
              <Rich text={t.heading} />
            </h2>
            <p className="body-prose-muted" style={{ fontSize: 18 }}>
              {t.intro}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <Facts locale={locale} dict={dict} />
        </Reveal>

        <div className="get-grid">
          <Reveal className="get-grid-main">
            <StoreCard
              featured
              twoUp
              eyebrow={t.audiobookEyebrow}
              color="#E0195B"
              title={t.audiobookTitle}
              note={t.audiobookNote}
              links={audiobookTiles}
              labels={labels}
              lead={audiobookLead}
              footer={
                <div className="store-card-footer">
                  <p className="body-prose-muted" style={{ fontSize: 15, margin: 0 }}>
                    {t.audiobookFooter}
                  </p>
                  <a
                    href="#listen"
                    className={primary ? "btn btn-ghost" : "btn btn-pink"}
                    style={{ marginTop: 16 }}
                  >
                    {dict.common.listenChapter1}
                  </a>
                </div>
              }
            />
          </Reveal>

          <div className="get-grid-side">
            <Reveal delay={110}>
              <StoreCard
                eyebrow={t.otherEyebrow}
                color="#21A1C4"
                title={t.otherTitle}
                note={t.otherNote}
                links={stores.otherEditions}
                labels={labels}
              />
            </Reveal>
            <Reveal delay={200}>
              <StoreCard
                eyebrow={t.ebookEyebrow}
                color="#6BBE4F"
                title={t.ebookTitle}
                note={t.ebookNote}
                links={stores.ebook}
                labels={labels}
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
            {format(t.bottomLine, { isbn: ISBN })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
