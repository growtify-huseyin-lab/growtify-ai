// /g1 — DeepGap AI Maturity assessment. Entered from a GHL lesson via a signed
// deep-link (?t=...). Token is verified server-side here; the quiz UI is client-side.
import { verifyG1Token } from "@/lib/g1/token";
import { loadG1Config } from "@/lib/g1/config";
import G1Client from "./G1Client";

export const dynamic = "force-dynamic"; // token lives in the query string

export default async function G1Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const token = typeof sp.t === "string" ? sp.t : "";
  const sector = typeof sp.sector === "string" ? sp.sector : undefined;

  const v = verifyG1Token(token);
  if (!v.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center bg-white">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-3 text-[#232323]">Erişim doğrulanamadı</h1>
          <p className="text-gray-600 leading-relaxed">
            Bu değerlendirmeyi GoHighLevel ders ekranındaki bağlantıdan açman
            gerekiyor. Bağlantının süresi dolmuş olabilir; dersi yenileyip tekrar
            dene.
            {process.env.NODE_ENV !== "production" ? ` (sebep: ${v.reason})` : ""}
          </p>
        </div>
      </main>
    );
  }

  const config = loadG1Config(sector, locale);
  return (
    <G1Client
      config={config}
      token={token}
      sector={sector ?? null}
      ret={v.payload.ret ?? null}
      name={v.payload.name ?? ""}
      locale={locale}
    />
  );
}
