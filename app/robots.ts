import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "OAI-SearchBot",
];

// No `Host:` line: it is a non-standard directive, and the canonical host is already
// stated by the sitemap URLs and each page's canonical tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
