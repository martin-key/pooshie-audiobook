import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATE_EVENT,
  consentBootstrapScript,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/consent";
import { ConsentBanner } from "@/components/ConsentBanner";
import { getDictionary } from "@/lib/i18n";

type W = Window & { dataLayer?: unknown[] };
const dl = () => ((window as W).dataLayer ?? []) as unknown[];
/** gtag() pushes Arguments objects; turn them into arrays for assertions. */
const commands = () =>
  dl()
    .filter((e) => Object.prototype.toString.call(e) === "[object Arguments]")
    .map((e) => Array.from(e as ArrayLike<unknown>));

beforeEach(() => {
  delete (window as W).dataLayer;
  window.localStorage.clear();
});

describe("consent bootstrap (runs in <head> before GTM)", () => {
  it("denies analytics and ads by default", () => {
    new Function(consentBootstrapScript())();
    expect(commands()).toEqual([
      [
        "consent",
        "default",
        {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          functionality_storage: "granted",
          security_storage: "granted",
          wait_for_update: 500,
        },
      ],
    ]);
  });

  it("re-applies a saved choice for returning visitors", () => {
    saveConsent({ analytics: true, ads: true });
    delete (window as W).dataLayer;
    new Function(consentBootstrapScript())();
    const [, update] = commands();
    expect(update).toEqual([
      "consent",
      "update",
      { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" },
    ]);
  });
});

describe("saveConsent", () => {
  it("stores the choice, updates Consent Mode and fires a dataLayer event", () => {
    saveConsent({ analytics: false, ads: false });
    expect(readConsent()).toEqual({ analytics: false, ads: false });
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY)!).v).toBe(1);
    expect(commands()).toEqual([
      ["consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }],
    ]);
    expect(dl()).toContainEqual({ event: CONSENT_UPDATE_EVENT, consent: { analytics: false, ads: false } });
  });
});

describe("ConsentBanner", () => {
  const t = getDictionary("de").consent;

  it("asks first-time visitors, records Accept all, and can be reopened", async () => {
    render(<ConsentBanner t={t} />);
    expect(screen.getByRole("dialog")).toHaveTextContent("Cookies, ganz sanft");

    await userEvent.click(screen.getByRole("button", { name: "Alle akzeptieren" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(readConsent()).toEqual({ analytics: true, ads: true });

    act(() => {
      window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("records Only necessary as a refusal", async () => {
    render(<ConsentBanner t={t} />);
    await userEvent.click(screen.getByRole("button", { name: "Nur notwendige" }));
    expect(readConsent()).toEqual({ analytics: false, ads: false });
  });

  it("stays hidden once a choice is saved", () => {
    saveConsent({ analytics: false, ads: false });
    render(<ConsentBanner t={t} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
