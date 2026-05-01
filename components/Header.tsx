"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PlayGlyph } from "./icons/PlayGlyph";

const links = [
  { label: "The Story", href: "#story" },
  { label: "Free Chapter", href: "#listen" },
  { label: "Friends", href: "#friends" },
  { label: "Get the Book", href: "#get" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,248,238,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(31,42,55,0.06)"
          : "1px solid transparent",
        transition:
          "background .3s var(--ease-soft), border-color .3s, backdrop-filter .3s",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "18px 36px",
        }}
      >
        <a
          href="#top"
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          aria-label="Pooshie home"
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              overflow: "hidden",
              background: "#FCE4EC",
              boxShadow: "0 4px 14px rgba(224,25,91,.22)",
              transition: "transform .3s var(--ease-soft)",
              transform: scrolled ? "scale(1)" : "scale(1.05)",
              position: "relative",
            }}
          >
            <Image
              src="/images/pooshie-portrait.jpeg"
              alt=""
              width={76}
              height={76}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }}
            />
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              color: "#E0195B",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            pooshie
          </span>
        </a>

        <nav
          className="header-nav"
          style={{ display: "flex", gap: 6, marginLeft: "auto" }}
          aria-label="Primary"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#listen"
          className="btn btn-pink btn-sm header-cta"
          style={{ marginLeft: 8 }}
        >
          <PlayGlyph size={10} color="#fff" /> Listen free
        </a>
      </div>
    </header>
  );
}
