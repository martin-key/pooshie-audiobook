"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PlayGlyph } from "./icons/PlayGlyph";

const links = [
  { label: "The Story", href: "#story" },
  { label: "Free Chapter", href: "#listen" },
  { label: "Friends", href: "#friends" },
  { label: "Get the Book", href: "#get" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled || menuOpen ? "rgba(255,248,238,0.92)" : "transparent",
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
            gap: 16,
            padding: "16px 36px",
          }}
        >
          <a
            href="#top"
            onClick={closeMenu}
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
            {links.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#listen"
            onClick={closeMenu}
            className="btn btn-pink btn-sm header-cta"
            style={{ marginLeft: "auto" }}
          >
            <PlayGlyph size={10} color="#fff" /> Listen free
          </a>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M6 6 L18 18 M18 6 L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M4 7 H20 M4 12 H20 M4 17 H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div
        id="mobile-drawer"
        className="menu-drawer"
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 24,
              color: "#E0195B",
              letterSpacing: "-0.01em",
            }}
          >
            pooshie
          </span>
          <button
            type="button"
            className="menu-toggle"
            style={{ display: "inline-flex" }}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column" }} aria-label="Mobile primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={closeMenu} className="menu-link">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#listen"
          onClick={closeMenu}
          className="btn btn-pink btn-lg"
          style={{ marginTop: 32, justifyContent: "center" }}
        >
          <PlayGlyph size={11} color="#fff" /> Listen to chapter 1
        </a>

        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 12,
            color: "#7c6c5a",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: "auto",
            paddingTop: 32,
            textAlign: "center",
          }}
        >
          13 chapters · 2h 14m · ages 4–8
        </p>
      </div>
    </>
  );
}
