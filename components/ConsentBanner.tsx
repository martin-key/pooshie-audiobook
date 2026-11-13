"use client";

import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";
import type { Dictionary } from "@/lib/i18n";

/**
 * Cookie banner for Google Consent Mode. Shows until the visitor picks one of two
 * equally weighted options, and again whenever the footer's "Cookie settings" link
 * is used. Nothing that stores data runs before "Accept all".
 */
export function ConsentBanner({ t }: { t: Dictionary["consent"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (all: boolean) => {
    saveConsent({ analytics: all, ads: all });
    setOpen(false);
  };

  return (
    <div className="consent-banner" role="dialog" aria-modal="false" aria-labelledby="consent-title" aria-describedby="consent-body">
      <p id="consent-title" className="consent-title">
        {t.title}
      </p>
      <p id="consent-body" className="consent-body">
        {t.body}
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-ghost" onClick={() => choose(false)}>
          {t.reject}
        </button>
        <button type="button" className="btn btn-pink" onClick={() => choose(true)}>
          {t.accept}
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so visitors can change or withdraw consent. */
export function ConsentSettingsLink({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
        cursor: "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
