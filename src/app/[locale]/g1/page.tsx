// /g1 — DeepGap AI Maturity assessment. Two secure entry modes:
//   ?ft=<firebase id token>  — from the GHL portal (g1-link.js injects the member's
//                              live Firebase token; verified against Google's keys).
//   ?t=<hmac token>          — from a GHL-workflow-minted signed deep link (fallback).
// Either path carries a trusted identity; the same token is re-verified by
// /api/g1/submit (no separate session secret needed — the Firebase token IS the
// auth, valid for the whole ~5-10 min sitting; HMAC for the fallback path).
import { verifyG1Token } from "@/lib/g1/token";
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
import { getG1Contact } from "@/lib/g1/ghl-g1";
import { loadG1Config } from "@/lib/g1/config";
import G1Client from "./G1Client";

export const dynamic = "force-dynamic"; // identity lives in the query string

// `ret` ("Derse Dön") only comes pre-signed on the HMAC path; on the Firebase path
// it's a query param, so constrain it to a growtify.ai host to avoid open redirects.
function safeRet(url: string): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.protocol === "https:" && /(^|\.)growtify\.ai$/.test(u.hostname)) {
      return u.toString();
    }
  } catch {
    /* not a URL */
  }
  return "";
}

function ErrorView({ reason }: { reason?: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center bg-white">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-3 text-[#232323]">Erişim doğrulanamadı</h1>
        <p className="text-gray-600 leading-relaxed">
          Bu değerlendirmeyi kurs içindeki bağlantıdan açman gerekiyor. Oturumun
          yenilenmiş olabilir; dersi yenileyip bağlantıya tekrar tıkla.
          {process.env.NODE_ENV !== "production" ? ` (sebep: ${reason})` : ""}
        </p>
      </div>
    </main>
  );
}

export default async function G1Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const ft = typeof sp.ft === "string" ? sp.ft : "";
  const t = typeof sp.t === "string" ? sp.t : "";
  const sector = typeof sp.sector === "string" ? sp.sector : undefined;
  const retParam = typeof sp.ret === "string" ? sp.ret : "";
  const nameParam = typeof sp.name === "string" ? sp.name : "";

  let authToken = "";
  let authMode: "firebase" | "hmac" = "firebase";
  let ret = "";
  let name = "";
  let email = "";

  if (ft) {
    // Firebase path — verify the portal member token; pass it through so submit
    // re-verifies it (no intermediate secret needed).
    const fb = await verifyFirebaseIdToken(ft);
    if (!fb.ok) return <ErrorView reason={fb.reason} />;
    authToken = ft;
    authMode = "firebase";
    ret = safeRet(retParam);
    // Resolve the GHL contact so the member sees their own name/email (the test
    // opened as them) and we confirm sub === contactId (found = binding correct).
    const c = await getG1Contact(fb.uid as string);
    name = c.firstName || fb.name || nameParam || (fb.email ? fb.email.split("@")[0] : "");
    email = c.email || fb.email || "";
  } else if (t) {
    // HMAC path — trusted signed deep link; pass through.
    const v = verifyG1Token(t);
    if (!v.ok) return <ErrorView reason={v.reason} />;
    authToken = t;
    authMode = "hmac";
    ret = v.payload.ret ?? "";
    name = v.payload.name ?? "";
    email = v.payload.email ?? "";
  } else {
    return <ErrorView reason="no_token" />;
  }

  const config = loadG1Config(sector, locale);
  return (
    <G1Client
      config={config}
      authToken={authToken}
      authMode={authMode}
      ret={ret || null}
      name={name}
      email={email}
      locale={locale}
    />
  );
}
