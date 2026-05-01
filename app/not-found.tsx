import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        gap: 18,
      }}
    >
      <span className="eyebrow">404 · lost in the meadow</span>
      <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
        That page <em>wandered off</em>
      </h1>
      <p className="body-prose-muted" style={{ maxWidth: 480 }}>
        Let&apos;s get you back to where Pooshie is waiting.
      </p>
      <Link href="/" className="btn btn-pink">
        Back to the audiobook
      </Link>
    </main>
  );
}
