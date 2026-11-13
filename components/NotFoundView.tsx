"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { DEFAULT_LOCALE, hasLocale, localePath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { Rich } from "./Rich";

export function NotFoundView({ copies }: { copies: Record<Locale, Dictionary["notFound"]> }) {
  const params = useParams<{ lang?: string }>();
  const locale = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const t = copies[locale];

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
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
        <Rich text={t.heading} />
      </h1>
      <p className="body-prose-muted" style={{ maxWidth: 480 }}>
        {t.body}
      </p>
      <Link href={localePath(locale)} className="btn btn-pink">
        {t.cta}
      </Link>
    </main>
  );
}
