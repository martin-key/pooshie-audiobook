/**
 * The site's public address, without a trailing slash. Every absolute URL the site prints
 * (canonical, hreflang, sitemap, robots.txt, Open Graph, JSON-LD, llms.txt) is built from it.
 * The old address, audiobook.pooshie.net, no longer exists in DNS.
 */
export const SITE_URL = (process.env.SITE_URL ?? "https://www.pooshieaudiobook.com").replace(/\/$/, "");
export const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL ?? "";
/** Google Tag Manager container. Set NEXT_PUBLIC_GTM_ID to override, or to "" to turn GTM off. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MRFH5P69";
