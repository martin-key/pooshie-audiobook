import { NextRequest, NextResponse } from "next/server";
import { N8N_WEBHOOK_URL } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// In-memory rate limit: 5 requests per IP per minute. Process-local — fine for a
// marketing site on a single Vercel/edge node. Swap for upstash if scaled.
const buckets = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.reset < now) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (b.count >= LIMIT) return false;
  b.count += 1;
  return true;
}

function noStore(json: unknown, init?: ResponseInit) {
  const res = NextResponse.json(json, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return noStore({ ok: false, error: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let body: { email?: unknown; context?: unknown; hp?: unknown };
  try {
    body = await req.json();
  } catch {
    return noStore({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: spammers fill every field; humans don't see this one.
  if (typeof body.hp === "string" && body.hp.length > 0) {
    return noStore({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const context = typeof body.context === "string" ? body.context.slice(0, 50) : "unknown";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return noStore({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  if (!N8N_WEBHOOK_URL) {
    console.warn("[lead] N8N_WEBHOOK_URL is not set — accepting submission but not forwarding.");
    return noStore({ ok: true, forwarded: false });
  }

  const payload = {
    email,
    context,
    ts: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent") ?? "",
    referer: req.headers.get("referer") ?? "",
  };

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 5000);

  try {
    const r = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });
    if (!r.ok) {
      console.error("[lead] n8n responded", r.status);
      return noStore({ ok: false, error: "We couldn't save that. Please try again." }, { status: 502 });
    }
    return noStore({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[lead] forward failed", err);
    return noStore({ ok: false, error: "We couldn't save that. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
