export const SITE_URL = (process.env.SITE_URL ?? "https://audiobook.pooshie.net").replace(/\/$/, "");
export const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL ?? "";
/** Google Tag Manager container. Set NEXT_PUBLIC_GTM_ID to override, or to "" to turn GTM off. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MRFH5P69";
