"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CHAPTERS, fmt, parseDur } from "@/lib/chapters";
import { CHAPTER_1_AUDIO_SRC } from "@/lib/links";
import { Pill } from "./icons/Pill";
import { PlayGlyph } from "./icons/PlayGlyph";
import { SoftCloud } from "./icons/SoftCloud";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";

function PlatformBadge({
  name,
  sub,
  glyph,
  color,
}: {
  name: string;
  sub: string;
  glyph: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid #ECE2D2",
        borderRadius: 999,
        padding: "10px 18px 10px 12px",
        boxShadow: "0 2px 10px rgba(31,42,55,.04)",
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: color,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "var(--font-ui)",
        }}
        aria-hidden
      >
        {glyph}
      </span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7c6c5a",
            fontWeight: 600,
          }}
        >
          {sub}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "#1F2A37",
          }}
        >
          {name}
        </span>
      </span>
    </span>
  );
}

function IconBtn({ icon, ariaLabel }: { icon: "skip-back" | "skip-fwd"; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "transparent",
        border: "1px solid #E5D8C2",
        cursor: "pointer",
        color: "#1F2A37",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background .15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#FCE4EC")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {icon === "skip-back" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path d="M19 19 V5 L8 12 Z M5 5 H7 V19 H5 Z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 5 V19 L16 12 Z M17 5 H19 V19 H17 Z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

function Waveform({
  ratio,
  playing,
  onSeek,
  disabled,
}: {
  ratio: number;
  playing: boolean;
  onSeek: (clientX: number, rect: DOMRect) => void;
  disabled: boolean;
}) {
  const bars = useMemo(() => {
    const a: number[] = [];
    let s = 7;
    for (let i = 0; i < 64; i++) {
      s = (s * 9301 + 49297) % 233280;
      const r = s / 233280;
      const env = 0.5 + 0.5 * Math.sin((i / 64) * Math.PI * 1.4);
      a.push(0.25 + r * 0.75 * env);
    }
    return a;
  }, []);

  const filledIdx = Math.floor(ratio * bars.length);

  return (
    <div
      onClick={(e) => {
        if (disabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        onSeek(e.clientX, rect);
      }}
      role="slider"
      aria-label="Seek audio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={{
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "8px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 56 }}>
        {bars.map((h, i) => {
          const filled = i / bars.length < ratio;
          return (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${Math.round(h * 100)}%`,
                background: disabled ? "#E5D8C2" : filled ? "#E0195B" : "#F0DFE4",
                borderRadius: 2,
                transition: "background .15s",
                transform:
                  playing && filled && i === filledIdx ? "scaleY(1.15)" : "scaleY(1)",
              }}
              aria-hidden
            />
          );
        })}
      </div>
      {!disabled && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: `${ratio * 100}%`,
            transform: "translate(-50%, -50%)",
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#fff",
            border: "2px solid #E0195B",
            boxShadow: "0 4px 12px rgba(224,25,91,.3)",
            overflow: "hidden",
            pointerEvents: "none",
            transition: playing ? "left .25s linear" : "none",
          }}
          aria-hidden
        >
          <Image
            src="/images/pooshie-portrait.jpeg"
            alt=""
            width={52}
            height={52}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 30%",
            }}
          />
        </span>
      )}
    </div>
  );
}

export function Listen() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ch = CHAPTERS[idx];
  const declaredTotal = parseDur(ch.dur);
  const [actualTotal, setActualTotal] = useState(declaredTotal);
  const total = ch.free && actualTotal > 0 ? actualTotal : declaredTotal;

  // Reset player when chapter changes
  useEffect(() => {
    setPos(0);
    setPlaying(false);
    setActualTotal(parseDur(ch.dur));
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, [idx, ch.dur]);

  // Wire <audio> events for the free chapter
  useEffect(() => {
    if (!ch.free) return;
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setPos(el.currentTime);
    const onMeta = () => {
      if (Number.isFinite(el.duration) && el.duration > 0) setActualTotal(el.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setPos(0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [ch.free]);

  const togglePlay = () => {
    if (!ch.free) return;
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const onSeek = (clientX: number, rect: DOMRect) => {
    if (!ch.free) return;
    const el = audioRef.current;
    if (!el) return;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const next = ratio * (Number.isFinite(el.duration) && el.duration > 0 ? el.duration : declaredTotal);
    el.currentTime = next;
    setPos(next);
  };

  const ratio = total ? Math.min(1, pos / total) : 0;

  return (
    <section
      id="listen"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFF8EE 0%, #FCE4EC 100%)",
        padding: "120px 0 140px",
      }}
      aria-labelledby="listen-heading"
    >
      <SoftCloud
        w={500}
        h={200}
        opacity={0.8}
        style={{ position: "absolute", top: 60, right: -100 }}
      />
      <SoftCloud
        w={420}
        h={180}
        opacity={0.7}
        style={{ position: "absolute", bottom: 100, left: -120 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
            <Pill bg="#fff" color="#E0195B">Free chapter</Pill>
            <h2
              id="listen-heading"
              className="display"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", margin: "20px 0 18px" }}
            >
              Listen to the
              <br />
              first <em>chapter</em> tonight
            </h2>
            <p
              className="body-prose-muted"
              style={{ fontSize: 19, maxWidth: 560, margin: "0 auto" }}
            >
              Press play. Tuck in. The other twelve chapters will be there
              when little eyes are ready for them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div
            className="listen-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 36,
              alignItems: "stretch",
              background: "#fff",
              borderRadius: 40,
              border: "1px solid #f0e3cd",
              boxShadow:
                "0 40px 80px -30px rgba(224,25,91,0.18), 0 6px 18px rgba(31,42,55,0.05)",
              overflow: "hidden",
            }}
          >
            {/* LEFT — Player */}
            <div
              className="listen-player"
              style={{
                position: "relative",
                padding: "44px 44px 36px",
                background: "#FFF8EE",
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              {/* Real audio element (only mounted for free chapters) */}
              {ch.free && (
                <audio
                  ref={audioRef}
                  src={CHAPTER_1_AUDIO_SRC}
                  preload="metadata"
                  aria-label={`Audio for chapter ${ch.n}: ${ch.title}`}
                />
              )}

              {/* Artwork */}
              <div style={{ position: "relative" }}>
                <div
                  className="stamp-frame"
                  style={{
                    aspectRatio: "16 / 11",
                    borderRadius: 28,
                    padding: 8,
                    position: "relative",
                  }}
                >
                  <Image
                    key={ch.art}
                    src={ch.art}
                    alt={`Chapter ${ch.n} artwork — ${ch.title}`}
                    fill
                    sizes="(max-width: 880px) 90vw, 600px"
                    style={{ objectFit: "cover", borderRadius: 22 }}
                  />
                </div>
                {ch.free && (
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      right: -16,
                      background: "#6BBE4F",
                      color: "#fff",
                      fontFamily: "var(--font-ui)",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      borderRadius: 999,
                      boxShadow: "0 8px 22px rgba(107,190,79,.4)",
                      transform: "rotate(6deg)",
                    }}
                  >
                    Free preview
                  </div>
                )}
              </div>

              {/* Title + chapter # */}
              <div>
                <span className="eyebrow" style={{ color: "#21A1C4" }}>
                  Chapter {String(ch.n).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 30,
                    lineHeight: 1.1,
                    marginTop: 8,
                    color: "#1F2A37",
                  }}
                >
                  <em style={{ fontStyle: "italic", color: "#E0195B", fontWeight: 400 }}>&ldquo;</em>
                  {ch.title}
                  <em style={{ fontStyle: "italic", color: "#E0195B", fontWeight: 400 }}>&rdquo;</em>
                </h3>
                <p
                  className="body-prose-muted"
                  style={{ marginTop: 10, fontSize: 16, fontStyle: "italic" }}
                >
                  {ch.blurb}
                </p>
              </div>

              <Waveform ratio={ratio} playing={playing && !!ch.free} onSeek={onSeek} disabled={!ch.free} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#7c6c5a",
                  letterSpacing: "0.1em",
                  marginTop: -16,
                }}
              >
                <span>{fmt(pos)}</span>
                <span>− {fmt(Math.max(0, total - pos))}</span>
              </div>

              <div
                className="listen-controls"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  justifyContent: "center",
                }}
              >
                <IconBtn icon="skip-back" ariaLabel="Previous 10 seconds" />
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!ch.free}
                  aria-label={playing ? "Pause" : "Play chapter 1"}
                  className="listen-play-btn"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    background: ch.free ? "#E0195B" : "#E5D8C2",
                    color: "#fff",
                    border: "none",
                    cursor: ch.free ? "pointer" : "not-allowed",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: ch.free ? "0 16px 36px rgba(224,25,91,.38)" : "none",
                    transition: "transform .15s, background .2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (ch.free) e.currentTarget.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (ch.free) e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {playing && ch.free ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                      <rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="#fff" />
                      <rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="#fff" />
                    </svg>
                  ) : (
                    <PlayGlyph size={22} color="#fff" />
                  )}
                  {ch.free && playing && (
                    <span
                      style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        animation: "pulse-ring 1.6s ease-out infinite",
                        pointerEvents: "none",
                      }}
                      aria-hidden
                    />
                  )}
                </button>
                <IconBtn icon="skip-fwd" ariaLabel="Next 10 seconds" />
              </div>

              {/* Lead form below the controls */}
              <div style={{ marginTop: 8, paddingTop: 24, borderTop: "1px solid #f0e3cd" }}>
                <LeadForm
                  context="listen"
                  copy="Want Pooshie tucked into your inbox? Get a bonus chapter and gentle updates."
                />
              </div>
            </div>

            {/* RIGHT — Chapter list */}
            <div
              className="chapter-panel"
              style={{
                background: "#fff",
                padding: "36px 12px 36px 28px",
                display: "flex",
                flexDirection: "column",
                maxHeight: 720,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  paddingRight: 16,
                  marginBottom: 14,
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1F2A37",
                    textTransform: "uppercase",
                    letterSpacing: "-0.005em",
                  }}
                >
                  All chapters
                </h4>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#7c6c5a",
                  }}
                >
                  13 · 2h 14m
                </span>
              </div>

              <div
                className="chapter-scroll"
                style={{ overflowY: "auto", paddingRight: 16, flex: 1 }}
              >
                {CHAPTERS.map((c, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={c.n}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-current={active ? "true" : undefined}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 14px",
                        marginBottom: 4,
                        background: active ? "#FCE4EC" : "transparent",
                        border: "none",
                        borderRadius: 16,
                        cursor: "pointer",
                        transition: "background .12s",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.background = "#FFF8EE";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: active ? "#E0195B" : "#FFF8EE",
                          color: active ? "#fff" : "#1F2A37",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                        aria-hidden
                      >
                        {active ? <PlayGlyph size={10} color="#fff" /> : String(c.n).padStart(2, "0")}
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            display: "block",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: 16,
                            color: active ? "#E0195B" : "#1F2A37",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.title}
                        </span>
                        <span
                          style={{
                            display: "block",
                            marginTop: 2,
                            fontFamily: "var(--font-ui)",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#7c6c5a",
                          }}
                        >
                          {c.dur} {c.free && "· free"}
                        </span>
                      </span>
                      {!c.free && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          style={{ flexShrink: 0, color: "#bca78b" }}
                          aria-hidden
                        >
                          <path
                            d="M7 10 V8 a5 5 0 0 1 10 0 v2 M5 10 h14 v10 H5 Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  paddingTop: 18,
                  paddingRight: 16,
                  borderTop: "1px solid #f0e3cd",
                  marginTop: 12,
                }}
              >
                <a
                  href="#get"
                  className="btn btn-pink"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Unlock all 13 chapters
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#7c6c5a",
                marginBottom: 18,
              }}
            >
              Listen on the platforms you already use
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <PlatformBadge name="Audible" sub="Stream" glyph="A" color="#F39C12" />
              <PlatformBadge name="Spotify" sub="Stream" glyph="S" color="#1DB954" />
              <PlatformBadge name="Apple Books" sub="Stream" glyph="" color="#1F2A37" />
              <PlatformBadge name="Google Play" sub="Stream" glyph="G" color="#21A1C4" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
