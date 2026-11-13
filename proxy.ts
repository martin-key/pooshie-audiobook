import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale, LOCALE_COOKIE, pickLocale } from "@/lib/i18n/config";

// Locale routing.
//   /            English (default locale, served unprefixed — rewritten to /en internally)
//   /de, /de/…   German, served as is
//   /en, /en/…   redirected to the unprefixed URL so English has a single address
// A first visit to "/" goes to the visitor's browser language when we have it;
// once they pick a language in the switcher, the cookie wins.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (hasLocale(first)) return NextResponse.next();

  if (pathname === "/") {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const preferred = hasLocale(saved) ? saved : pickLocale(request.headers.get("accept-language"));
    if (preferred !== DEFAULT_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferred}`;
      return NextResponse.redirect(url, 307);
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and anything that looks like a file (images, audio, robots.txt, …).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
