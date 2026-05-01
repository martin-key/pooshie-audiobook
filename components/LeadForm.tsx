"use client";

import { useState } from "react";

type Props = {
  context: string;
  copy?: string;
  variant?: "light" | "dark";
};

export function LeadForm({ context, copy, variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setErrMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, context, hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        setState("error");
        setErrMsg(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setErrMsg("Network error — please try again.");
    }
  };

  const isDark = variant === "dark";
  const inputBg = isDark ? "rgba(255,255,255,0.1)" : "#fff";
  const inputColor = isDark ? "#fff" : "#1F2A37";
  const inputBorder = isDark ? "rgba(255,255,255,0.25)" : "#e9dcc6";
  const placeholderColor = isDark ? "rgba(255,255,255,0.55)" : "#9aa1a8";
  const copyColor = isDark ? "rgba(255,255,255,0.78)" : "#4B5563";

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          background: isDark ? "rgba(107,190,79,0.18)" : "#EDF7E8",
          border: `1px solid ${isDark ? "rgba(107,190,79,0.4)" : "#cce8c2"}`,
          color: isDark ? "#bff0a8" : "#3a6b27",
          borderRadius: 16,
          padding: "16px 20px",
          fontFamily: "var(--font-ui)",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        Thank you. We&apos;ll be in touch soon — keep an ear out for Pooshie.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
      aria-label="Subscribe for Pooshie updates"
    >
      {copy && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.5,
            color: copyColor,
            margin: 0,
          }}
        >
          {copy}
        </p>
      )}

      <style>{`
        .lead-input::placeholder { color: ${placeholderColor}; }
      `}</style>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="lead-input"
          style={{
            flex: "1 1 220px",
            minWidth: 0,
            padding: "14px 18px",
            borderRadius: 999,
            border: `1px solid ${inputBorder}`,
            background: inputBg,
            color: inputColor,
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            outline: "none",
          }}
        />
        {/* honeypot — hidden from sighted users + screen readers */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          aria-hidden
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
            width: 1,
            height: 1,
            opacity: 0,
          }}
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn btn-pink"
          style={{ flex: "0 0 auto" }}
        >
          {state === "submitting" ? "Sending…" : "Send me Pooshie"}
        </button>
      </div>

      {state === "error" && (
        <p
          role="alert"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: isDark ? "#FFB4C7" : "#B7124A",
            margin: 0,
          }}
        >
          {errMsg}
        </p>
      )}
    </form>
  );
}
