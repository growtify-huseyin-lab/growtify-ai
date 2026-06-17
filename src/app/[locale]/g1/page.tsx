// /g1 — DeepGap AI Maturity assessment. Two secure entry modes:
//   ?ft=<firebase id token>  — from the GHL portal (g1-link.js injects the member's
//                              live Firebase token; verified against Google's keys).
//   ?t=<hmac token>          — from a GHL-workflow-minted signed deep link (fallback).
// Either path yields a trusted contactId; we then issue our own short-lived HMAC
// session token that the client uses for /api/g1/submit.
import { verifyG1Token, signG1Token } from "@/lib/g1/token";
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
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

  let sessionToken = "";
  let ret = "";
  let name = "";

  if (ft) {
    // Firebase path — verify the portal member token, then mint our own session token.
    const fb = await verifyFirebaseIdToken(ft);
    if (!fb.ok) return <ErrorView reason={fb.reason} />;
    const contactId = fb.uid as string;
    ret = safeRet(retParam);
    name = fb.name || nameParam || (fb.email ? fb.email.split("@")[0] : "");
    sessionToken = signG1Token({ sub: contactId, email: fb.email, name, ret }, 60 * 60 * 6);
  } else if (t) {
    // HMAC path — already a trusted signed token; pass through.
    const v = verifyG1Token(t);
    if (!v.ok) return <ErrorView reason={v.reason} />;
    ret = v.payload.ret ?? "";
    name = v.payload.name ?? "";
    sessionToken = t;
  } else {
    return <ErrorView reason="no_token" />;
  }

  const config = loadG1Config(sector, locale);
  return (
    <G1Client
      config={config}
      token={sessionToken}
      sector={sector ?? null}
      ret={ret || null}
      name={name}
      locale={locale}
    />
  );
}
