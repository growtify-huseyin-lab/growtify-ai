import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// G1 assessment variant: locale detection OFF. The course lesson link encodes the
// intended locale (TR link "growtify.ai/g1" = Turkish assessment). next-intl's
// default locale detection was 307-redirecting /g1 -> /en/g1 for any visitor whose
// NEXT_LOCALE cookie / Accept-Language was English, so TR-course members with an
// English browser got the English assessment + English result. For G1 we honor the
// URL locale and never auto-redirect based on the visitor's preference.
const intlG1 = createMiddleware({ ...routing, localeDetection: false });

// Matches /g1, /g1/..., /en/g1, /en/g1/... (but NOT /g1foo).
const G1_PATH = /^\/(en\/)?g1(\/.*)?$/;

// Off-locale segment canonicalization (SEO-S2-BILINGUAL-ALIGNMENT-AUDIT-001).
// Each bilingual route exists as two physical dirs (e.g. /sektor + /sectors), so the
// wrong-locale variant resolves and creates duplicate content. We 301 it to the correct
// per-locale URL. Maps are disjoint (a target segment is never a source for the same
// locale) → no redirect loops.
//
// EN side (under /en): a Turkish first-segment → its English counterpart.
const EN_FIX: Record<string, string> = {
  sektor: "sectors",
  hakkimizda: "about",
  iletisim: "contact",
  rehber: "guide",
  gelismeler: "news",
  kurumsal: "enterprise",
  "gizlilik-politikasi": "privacy-policy",
  "kullanim-kosullari": "terms-of-service",
  "iade-politikasi": "refund-policy",
  "cerez-politikasi": "cookie-policy",
  // KVKK is TR-only (UK GDPR covers EN) → fold the EN request into privacy-policy.
  "kvkk-aydinlatma": "privacy-policy",
  // EN has no Turkish use-case segment → fold /en/kullanim-alani into /en/use-case.
  "kullanim-alani": "use-case",
};
// TR side (root, default locale, no /en prefix): an English first-segment → Turkish.
const TR_FIX: Record<string, string> = {
  sectors: "sektor",
  about: "hakkimizda",
  contact: "iletisim",
  guide: "rehber",
  news: "gelismeler",
  enterprise: "kurumsal",
  "privacy-policy": "gizlilik-politikasi",
  "terms-of-service": "kullanim-kosullari",
  "refund-policy": "iade-politikasi",
  "cookie-policy": "cerez-politikasi",
  // pSEO use-case pages use the Turkish /kullanim-alani segment on TR.
  "use-case": "kullanim-alani",
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // G1 assessment — honor the URL locale, skip locale-detection redirect.
  if (G1_PATH.test(pathname)) {
    return intlG1(req);
  }

  // EN: /en/{seg}/...
  const en = pathname.match(/^\/en\/([^/]+)(\/.*)?$/);
  if (en && EN_FIX[en[1]]) {
    const url = req.nextUrl.clone();
    url.pathname = `/en/${EN_FIX[en[1]]}${en[2] ?? ""}`;
    return NextResponse.redirect(url, 301);
  }

  // TR (root): /{seg}/... — skip the /en prefix (handled above).
  const tr = pathname.match(/^\/([^/]+)(\/.*)?$/);
  if (tr && tr[1] !== "en" && TR_FIX[tr[1]]) {
    const url = req.nextUrl.clone();
    url.pathname = `/${TR_FIX[tr[1]]}${tr[2] ?? ""}`;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except: api routes, Next internals, Vercel internals,
  // and files with an extension (static assets, images, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
