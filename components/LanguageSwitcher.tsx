"use client";

import { LOCALE_COOKIE, LOCALE_META, LOCALES, localePath, type Locale } from "@/lib/i18n/config";

type Props = {
  locale: Locale;
  /** Accessible name for the group, e.g. "Language". */
  label: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * EN · DE pill. Remembers the choice in a cookie (so the proxy stops redirecting
 * by browser language) and keeps the current #section when switching.
 */
export function LanguageSwitcher({ locale, label, className = "", style }: Props) {
  const onPick = (e: React.MouseEvent<HTMLAnchorElement>, next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    e.preventDefault();
    if (next !== locale) window.location.assign(localePath(next) + window.location.hash);
  };

  return (
    <nav aria-label={label} className={`lang-switch ${className}`.trim()} style={style}>
      {LOCALES.map((l) => (
        <a
          key={l}
          href={localePath(l)}
          hrefLang={LOCALE_META[l].htmlLang}
          lang={LOCALE_META[l].htmlLang}
          aria-label={LOCALE_META[l].label}
          aria-current={l === locale ? "true" : undefined}
          onClick={(e) => onPick(e, l)}
        >
          {LOCALE_META[l].short}
        </a>
      ))}
    </nav>
  );
}
