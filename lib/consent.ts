// Cookie consent for Google Tag Manager, using Google Consent Mode v2.
//
// Everything that stores data (analytics, ads) is denied until the visitor
// accepts in the banner. The choice is kept in localStorage — remembering it is
// strictly necessary, so it needs no consent itself — and re-applied before GTM
// loads on every later page view.

export const CONSENT_STORAGE_KEY = "pooshie-consent";
const CONSENT_VERSION = 1;

/** Custom dataLayer event, so GTM triggers can react the moment consent changes. */
export const CONSENT_UPDATE_EVENT = "cookie_consent_update";

/** Fired on window to reopen the banner (the footer's "Cookie settings" link). */
export const OPEN_CONSENT_EVENT = "pooshie:open-consent";

export type ConsentChoice = { analytics: boolean; ads: boolean };

type StoredConsent = ConsentChoice & { v: number; ts: string };

/** Consent Mode values for a choice (ad_user_data / ad_personalization follow ads). */
export function consentState(choice: ConsentChoice): Record<string, "granted" | "denied"> {
  const g = (on: boolean) => (on ? "granted" : "denied");
  return {
    analytics_storage: g(choice.analytics),
    ad_storage: g(choice.ads),
    ad_user_data: g(choice.ads),
    ad_personalization: g(choice.ads),
  };
}

/**
 * Inline <head> script: sets the Consent Mode defaults (everything denied) and,
 * for returning visitors, applies their saved choice — all before GTM loads.
 */
export function consentBootstrapScript(): string {
  const denied = consentState({ analytics: false, ads: false });
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    `gtag('consent','default',${JSON.stringify({
      ...denied,
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    })});`,
    "try{",
    `var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');`,
    `if(c&&c.v===${CONSENT_VERSION}){gtag('consent','update',{`,
    "analytics_storage:c.analytics?'granted':'denied',",
    "ad_storage:c.ads?'granted':'denied',",
    "ad_user_data:c.ads?'granted':'denied',",
    "ad_personalization:c.ads?'granted':'denied'});}",
    "}catch(e){}",
  ].join("");
}

/** The visitor's saved choice, or null if they haven't chosen yet (or storage is blocked). */
export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.v !== CONSENT_VERSION) return null;
    return { analytics: !!parsed.analytics, ads: !!parsed.ads };
  } catch {
    return null;
  }
}

/** Saves the choice and tells Google tags about it right away. */
export function saveConsent(choice: ConsentChoice): void {
  const stored: StoredConsent = { ...choice, v: CONSENT_VERSION, ts: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked (private mode etc.): the choice still applies to this page view.
  }
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  const dataLayer = w.dataLayer;
  // gtag() must push the `arguments` object itself — Consent Mode ignores plain arrays.
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  gtag("consent", "update", consentState(choice));
  dataLayer.push({ event: CONSENT_UPDATE_EVENT, consent: choice });
}
