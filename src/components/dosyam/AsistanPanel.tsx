"use client";

import { useEffect, useRef, useState } from "react";

const PRIMARY = "#5d47f0";

interface Mesaj {
  rol: "user" | "assistant";
  metin: string;
  uyari?: boolean;
}

interface Durum {
  sohbetler: { id: string; tarih: string }[];
  aktif: { id: string; mesajlar: Mesaj[] } | null;
  kota: { kalan: number; kapali: boolean };
  onkosul: string | null;
  yontem: string | null;
  yontemi_gor: string[];
  kopyala: string | null;
  salt_okunur: boolean;
}

export default function AsistanPanel({
  bolum,
  onTaslak,
}: {
  bolum: string;
  onTaslak: (veri: Record<string, unknown>, uyarilar: string[]) => void;
}) {
  const [acik, setAcik] = useState(false);
  const [d, setD] = useState<Durum | null>(null);
  const [sohbetId, setSohbetId] = useState<string | null>(null);
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([]);
  const [yazi, setYazi] = useState("");
  const [bekle, setBekle] = useState(false);
  const [hata, setHata] = useState("");
  const [kalan, setKalan] = useState<number | null>(null);
  const alt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!acik || d) return;
    fetch(`/api/dosyam/asistan/${bolum}`)
      .then((r) => r.json())
      .then((j: Durum & { ok: boolean; mesaj?: string }) => {
        if (!j.ok) return setHata(j.mesaj ?? "Asistan açılamadı.");
        setD(j);
        setKalan(j.kota.kalan);
        if (j.aktif) {
          setSohbetId(j.aktif.id);
          setMesajlar(j.aktif.mesajlar);
        }
      })
      .catch(() => setHata("Asistan açılamadı."));
  }, [acik, d, bolum]);

  useEffect(() => {
    alt.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [mesajlar]);

  async function post(url: string, body: unknown) {
    setBekle(true);
    setHata("");
    try {
      const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      return (await r.json().catch(() => ({ ok: false }))) as Record<string, unknown>;
    } finally {
      setBekle(false);
    }
  }

  async function yeniSohbet() {
    const j = await post(`/api/dosyam/asistan/${bolum}`, { yeni: true });
    if (!j.ok) return setHata(String(j.mesaj ?? "Sohbet açılamadı."));
    setSohbetId(String(j.sohbet_id));
    setMesajlar(j.mesajlar as Mesaj[]);
  }

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    const metin = yazi.trim();
    if (!metin || !sohbetId) return;
    setMesajlar((m) => [...m, { rol: "user", metin }]);
    setYazi("");
    const j = await post(`/api/dosyam/asistan/${bolum}`, { sohbet_id: sohbetId, mesaj: metin });
    if (!j.ok) {
      setMesajlar((m) => m.slice(0, -1));
      setYazi(metin);
      return setHata(String(j.mesaj ?? "Gönderilemedi."));
    }
    if (j.engellendi && j.uyari) {
      // Kişisel veri / uzunluk: mesaj gönderilmedi, öğrenci düzeltsin.
      setMesajlar((m) => m.slice(0, -1));
      setYazi(metin);
      return setHata(String(j.metin));
    }
    setMesajlar((m) => [...m, { rol: "assistant", metin: String(j.metin) }]);
    if (typeof j.kalan === "number") setKalan(j.kalan);
  }

  async function taslak() {
    const j = await post(`/api/dosyam/asistan/${bolum}/taslak`, { sohbet_id: sohbetId });
    if (!j.ok) return setHata(String(j.mesaj ?? "Taslak çıkarılamadı."));
    onTaslak(j.veri as Record<string, unknown>, (j.uyarilar as string[]) ?? []);
  }

  async function sil() {
    if (!sohbetId || !confirm("Bu sohbet kalıcı olarak silinsin mi?")) return;
    const j = await post(`/api/dosyam/asistan/${bolum}/sil`, { sohbet_id: sohbetId });
    if (j.ok) {
      setSohbetId(null);
      setMesajlar([]);
      setD(null);
    }
  }

  if (!acik) {
    return (
      <button
        onClick={() => setAcik(true)}
        className="w-full rounded-2xl border border-[#5d47f0]/30 bg-[#5d47f0]/5 p-4 text-left"
      >
        <p className="font-semibold text-[#5d47f0]">Asistanla çalış →</p>
        <p className="text-sm text-gray-600">Sana soru sorarak bu bölümü birlikte çıkaralım. Taslağı sen onaylarsın.</p>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p className="font-semibold text-[#232323]">Growtify Asistanı</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {kalan !== null && <span>Bugün {kalan} mesaj hakkın var</span>}
          <button onClick={() => setAcik(false)} className="underline">
            Kapat
          </button>
        </div>
      </div>

      {!d && !hata && <p className="p-4 text-sm text-gray-500">Yükleniyor…</p>}

      {d?.onkosul && <p className="m-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{d.onkosul}</p>}

      {d && !d.onkosul && !sohbetId && (
        <div className="space-y-3 p-4">
          {d.yontem && <p className="text-sm text-gray-600">{d.yontem}</p>}
          <button
            onClick={yeniSohbet}
            disabled={bekle || d.salt_okunur || d.kota.kapali}
            className="rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60"
            style={{ background: PRIMARY }}
          >
            Sohbeti başlat
          </button>
          {d.kota.kapali && <p className="text-sm text-amber-700">Asistan şu an geçici olarak kapalı; formu kendin doldurabilirsin.</p>}
        </div>
      )}

      {sohbetId && (
        <>
          <div className="max-h-[28rem] space-y-3 overflow-y-auto p-4">
            {mesajlar.map((m, i) => (
              <div key={i} className={m.rol === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2 text-sm ${
                    m.rol === "user" ? "bg-[#5d47f0] text-white" : "bg-gray-100 text-[#232323]"
                  }`}
                >
                  {m.metin}
                </p>
              </div>
            ))}
            {bekle && <p className="text-xs text-gray-400">Asistan yazıyor…</p>}
            <div ref={alt} />
          </div>
          <form onSubmit={gonder} className="flex gap-2 border-t border-gray-100 p-3">
            <textarea
              value={yazi}
              onChange={(e) => setYazi(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) gonder(e);
              }}
              rows={2}
              maxLength={4000}
              placeholder="Cevabını yaz… (kişi adı, telefon, sağlık bilgisi yazma)"
              className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 text-base focus:border-[#5d47f0] focus:outline-none"
            />
            <button disabled={bekle || !yazi.trim()} className="self-end rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60" style={{ background: PRIMARY }}>
              Gönder
            </button>
          </form>
          <div className="flex flex-wrap gap-3 border-t border-gray-100 px-4 py-3 text-sm">
            <button onClick={taslak} disabled={bekle} className="rounded-xl border border-[#5d47f0] px-3 py-1.5 font-semibold text-[#5d47f0] disabled:opacity-60">
              Taslağı forma aktar
            </button>
            <button onClick={yeniSohbet} disabled={bekle} className="text-gray-500 underline">
              Yeni sohbet
            </button>
            <button onClick={sil} disabled={bekle} className="text-gray-500 underline">
              Bu sohbeti sil
            </button>
          </div>
        </>
      )}

      {hata && <p className="m-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">{hata}</p>}

      {d && (d.yontemi_gor.length > 0 || d.kopyala) && (
        <details className="border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
          <summary className="cursor-pointer font-medium text-[#232323]">Bu yöntemi kendi yapay zekânda kullan</summary>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {d.yontemi_gor.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          {d.kopyala && (
            <div className="mt-3">
              <p className="mb-1 text-xs text-gray-500">Kendi yapay zekâna kopyala:</p>
              <pre className="whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-xs">{d.kopyala}</pre>
              <button onClick={() => navigator.clipboard.writeText(d.kopyala ?? "")} className="mt-1 text-xs underline">
                Kopyala
              </button>
            </div>
          )}
        </details>
      )}
    </div>
  );
}
