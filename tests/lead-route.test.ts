import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/lead/route";

function makeReq(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  }) as unknown as Parameters<typeof POST>[0];
}

describe("POST /api/lead", () => {
  const originalFetch = globalThis.fetch;
  const originalWebhook = process.env.N8N_WEBHOOK_URL;

  beforeEach(() => {
    process.env.N8N_WEBHOOK_URL = "";
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env.N8N_WEBHOOK_URL = originalWebhook;
  });

  it("rejects invalid email with 400", async () => {
    const res = await POST(makeReq({ email: "not-an-email", context: "test" }, { "x-forwarded-for": "1.1.1.1" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("silently accepts honeypot fills with 200 and ok:true", async () => {
    const res = await POST(makeReq({ email: "real@example.com", hp: "bot", context: "test" }, { "x-forwarded-for": "2.2.2.2" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it("accepts a valid email when webhook is unset (logs warning, doesn't forward)", async () => {
    const res = await POST(makeReq({ email: "valid@example.com", context: "test" }, { "x-forwarded-for": "3.3.3.3" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.forwarded).toBe(false);
  });

  it("rejects malformed JSON body with 400", async () => {
    const req = new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "4.4.4.4" },
      body: "not-json",
    }) as unknown as Parameters<typeof POST>[0];
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rate-limits the same IP after 5 requests in a window", async () => {
    const ip = "5.5.5.5";
    const ok = [];
    for (let i = 0; i < 5; i++) {
      const r = await POST(makeReq({ email: `a${i}@example.com`, context: "rl" }, { "x-forwarded-for": ip }));
      ok.push(r.status);
    }
    expect(ok.every((s) => s === 200)).toBe(true);
    const blocked = await POST(makeReq({ email: "blocked@example.com", context: "rl" }, { "x-forwarded-for": ip }));
    expect(blocked.status).toBe(429);
  });
});
