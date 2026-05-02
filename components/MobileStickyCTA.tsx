"use client";

import { useEffect, useState } from "react";
import { PlayGlyph } from "./icons/PlayGlyph";

/**
 * Sticky bottom bar visible on small screens only.
 * Hides automatically once the in-page Listen section is on screen
 * (so it doesn't compete with the real player) and reappears after.
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const isMobile = window.innerWidth <= 880;
      if (!isMobile) {
        setVisible(false);
        return;
      }
      const listen = document.getElementById("listen");
      const get = document.getElementById("get");
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.7;

      const inListen =
        listen &&
        (() => {
          const r = listen.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0;
        })();
      const inGet =
        get &&
        (() => {
          const r = get.getBoundingClientRect();
          return r.top < window.innerHeight * 0.5 && r.bottom > 0;
        })();

      setVisible(scrolledPastHero && !inListen && !inGet);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(255,248,238,0.92)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        borderTop: "1px solid rgba(31,42,55,0.08)",
        display: "flex",
        gap: 10,
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "transform .28s var(--ease-soft), opacity .28s",
      }}
      className="mobile-sticky-cta"
    >
      <a
        href="#listen"
        className="btn btn-pink"
        style={{
          flex: 1.4,
          justifyContent: "center",
          padding: "14px 18px",
          fontSize: 12,
          letterSpacing: "0.18em",
          boxShadow: "0 12px 28px rgba(224,25,91,.34)",
        }}
      >
        <PlayGlyph size={11} color="#fff" /> Listen free
      </a>
      <a
        href="#get"
        className="btn"
        style={{
          flex: 1,
          justifyContent: "center",
          padding: "14px 14px",
          fontSize: 12,
          letterSpacing: "0.16em",
          background: "var(--pooshie-ink)",
          color: "#fff",
          boxShadow: "0 10px 22px rgba(31,42,55,.22)",
        }}
      >
        $9.99
      </a>
    </div>
  );
}
