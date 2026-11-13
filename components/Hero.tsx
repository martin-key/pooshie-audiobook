import { Fragment } from "react";
import { Reveal } from "./Reveal";
import { SoftCloud } from "./icons/SoftCloud";
import { Squiggle } from "./icons/Squiggle";
import { PlayGlyph } from "./icons/PlayGlyph";
import { HeroPortraitStack } from "./HeroPortraitStack";
import { HeroMiniRibbon } from "./HeroMiniRibbon";
import type { Chapter } from "@/lib/chapters";
import type { Dictionary } from "@/lib/i18n";

function Stat({ n, label, small }: { n: string; label: string; small?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: small ? 24 : 30,
          color: "#E0195B",
          lineHeight: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#4B5563",
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Hero({ dict, firstChapter }: { dict: Dictionary; firstChapter: Chapter }) {
  const t = dict.hero;
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", paddingTop: 40 }} aria-labelledby="hero-heading">
      {/* ambient watercolor blobs */}
      <SoftCloud
        w={520}
        h={220}
        opacity={0.95}
        style={{
          position: "absolute",
          top: 60,
          left: -120,
          animation: "drift 20s ease-in-out infinite",
        }}
      />
      <SoftCloud
        w={420}
        h={180}
        opacity={0.8}
        style={{
          position: "absolute",
          top: 220,
          right: -80,
          animation: "drift 26s ease-in-out infinite reverse",
        }}
      />
      <SoftCloud
        w={360}
        h={150}
        opacity={0.7}
        style={{
          position: "absolute",
          bottom: 80,
          left: "38%",
          animation: "drift 30s ease-in-out infinite",
        }}
      />

      {/* Decorative pink puff bottom-right */}
      <div
        style={{
          position: "absolute",
          right: -160,
          bottom: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #FCE4EC 0%, rgba(252,228,236,0) 70%)",
          pointerEvents: "none",
        }}
        aria-hidden
      />

      <div
        className="container hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 64,
          alignItems: "center",
          padding: "60px 36px 100px",
        }}
      >
        {/* LEFT — copy */}
        <div>
          <Reveal>
            <span
              className="eyebrow"
              style={{ display: "inline-flex", gap: 12, alignItems: "center" }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "#E0195B",
                  display: "inline-block",
                }}
              />
              {t.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1
              id="hero-heading"
              className="display"
              style={{ fontSize: "clamp(56px, 8vw, 108px)", margin: "22px 0 4px" }}
            >
              {t.titleStart}
              <br />
              <span style={{ color: "#E0195B" }}>{t.titleHighlight}</span>
              <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                {t.titleUnderline}
                <Squiggle
                  width={420}
                  color="#21A1C4"
                  strokeWidth={4}
                  style={{ position: "absolute", left: 0, bottom: -8, width: "100%" }}
                />
              </span>
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "#1F2A37",
                  fontFamily: "var(--font-display)",
                  textTransform: "none",
                  fontWeight: 400,
                }}
              >
                {t.titleEnd}
              </em>
              {/* The product, in plain words, as part of the heading: title, what it is, for whom. */}
              <span className="hero-title-sub">{t.titleSub}</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p
              className="body-prose"
              style={{ maxWidth: 520, marginTop: 20, fontSize: 20 }}
            >
              {t.intro}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="hero-cta-row" style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
              <a href="#listen" className="btn btn-pink btn-lg" style={{ position: "relative" }}>
                <span
                  className="hero-cta-pulse"
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: 999,
                    animation: "pulse-ring 2.4s ease-out infinite",
                    pointerEvents: "none",
                  }}
                  aria-hidden
                />
                <PlayGlyph size={11} color="#fff" /> {dict.common.listenChapter1}
              </a>
              <a href="#get" className="btn btn-ghost btn-lg">
                {dict.common.getAudiobook}
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div
              className="hero-stats"
              style={{
                display: "flex",
                gap: 36,
                alignItems: "center",
                marginTop: 56,
                flexWrap: "wrap",
              }}
            >
              {t.stats.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <span style={{ width: 1, height: 32, background: "#E5D8C2" }} aria-hidden />}
                  <Stat n={s.n} label={s.label} small={i > 0} />
                </Fragment>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — portrait stack */}
        <Reveal delay={150}>
          <HeroPortraitStack t={t} />
        </Reveal>
      </div>

      <Reveal delay={500}>
        <HeroMiniRibbon dict={dict} chapter={firstChapter} />
      </Reveal>
    </section>
  );
}
