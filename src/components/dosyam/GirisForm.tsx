"use client";

import { useEffect, useRef, useState } from "react";

const PRIMARY = "#5d47f0";

interface Props {
  ipucu?: string; // panelden gelen kişi kimliği: e-posta adımı atlanır, kod kendiliğinden gider
  devam?: string; // giriş sonrası açılacak sayfa (yoksa bu sayfa yenilenir)
  baslik?: string;
  aciklama?: string;
}

export default function GirisForm({ ipucu, devam, baslik = "Çalışma Dosyam", aciklama }: Props) {
  const [adim, setAdim] = useState<"bekle" | "email" | "kod">(ipucu ? "bekle" : "email");
  const [email, setEmail] = useState("");
  const [ch, setCh] = useState("");
  const [kod, setKod] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [bekle, setBekle] = useState(false);
  const istendi = useRef(false);

  async function post(url: string, body: unknown) {
    setBekle(true);
    try {
      const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      return (await res.json().catch(() => ({}))) as { ok?: boolean; mesaj?: string; ch?: string; maskeli?: string };
    } finally {
      setBekle(false);
    }
  }

  // Panelden gelindiyse: kodu kişinin kendi e-postasına hemen gönder.
  useEffect(() => {
    if (!ipucu || istendi.current) return;
    istendi.current = true;
    post("/api/dosyam/giris/ipucu", { k: ipucu }).then((r) => {
      if (r.ok && r.ch) {
        setCh(r.ch);
        setMesaj(`Kodu ${r.maskeli} adresine gönderdik.`);
        setAdim("kod");
      } else {
        setMesaj(r.mesaj ?? "");
        setAdim("email");
      }
    });
  }, [ipucu]);

  async function kodIste(e: React.FormEvent) {
    e.preventDefault();
    const r = await post("/api/dosyam/giris/kod", { email });
    setMesaj(r.mesaj ?? "");
    if (r.ok && r.ch) {
      setCh(r.ch);
      setAdim("kod");
    }
  }

  async function dogrula(e: React.FormEvent) {
    e.preventDefault();
    const r = await post("/api/dosyam/giris/dogrula", { ch, kod });
    if (r.ok) {
      if (devam && devam.startsWith("/")) window.location.href = devam;
      else window.location.reload();
    } else setMesaj(r.mesaj ?? "Giriş yapılamadı.");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold text-[#232323] mb-3">{baslik}</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        {aciklama ??
          "Derslerde ürettiğin her şey burada: kimliğin, teklifin, kurulum haritan, Büyüme Döngüm. Programa kayıtlı e-postanla gir."}
      </p>
      {adim === "bekle" && <p className="text-gray-500">Giriş kodun gönderiliyor…</p>}
      {adim === "email" && (
        <form onSubmit={kodIste} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            E-posta
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-base focus:border-[#5d47f0] focus:outline-none"
            />
          </label>
          <button disabled={bekle} className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60" style={{ background: PRIMARY }}>
            {bekle ? "Gönderiliyor…" : "Giriş kodu gönder"}
          </button>
        </form>
      )}
      {adim === "kod" && (
        <form onSubmit={dogrula} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            E-postana gelen 6 haneli kod
            <input
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              maxLength={6}
              required
              value={kod}
              onChange={(e) => setKod(e.target.value.replace(/\D/g, ""))}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-2xl tracking-[0.5em] focus:border-[#5d47f0] focus:outline-none"
            />
          </label>
          <button disabled={bekle || kod.length !== 6} className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60" style={{ background: PRIMARY }}>
            {bekle ? "Kontrol ediliyor…" : "Giriş yap"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAdim("email");
              setKod("");
            }}
            className="w-full text-sm text-gray-500 underline"
          >
            Başka e-posta / yeni kod
          </button>
        </form>
      )}
      {mesaj && <p className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">{mesaj}</p>}
      <p className="mt-8 text-xs text-gray-400">Bir kez giriş yaptığında bu tarayıcı seni program boyunca hatırlar.</p>
    </div>
  );
}
