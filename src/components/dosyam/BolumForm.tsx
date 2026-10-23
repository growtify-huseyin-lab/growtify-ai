"use client";

import { useState } from "react";
import type { FieldDef } from "@/lib/dosyam/sections";
import AsistanPanel from "./AsistanPanel";

const PRIMARY = "#5d47f0";
type Val = unknown;
type Data = Record<string, Val>;

interface Props {
  id: string;
  fields: FieldDef[];
  refs: Record<string, string>; // referans alanları: "R2.kime_kime_degil" → değer
  initial: Data;
  version: number; // son sürüm (0 = hiç yok)
  status: "taslak" | "onayli" | null;
  approvedAt: string | null;
  readOnly: boolean;
  asistan?: boolean; // bu bölümde Growtify Asistanı var mı (ders yönergesi tanımlı)
  ust?: React.ReactNode; // sayfa başlığı (asistan açıkken formla birlikte sola kayar)
}

const input = "w-full rounded-xl border border-gray-300 px-3 py-2 text-base focus:border-[#5d47f0] focus:outline-none disabled:bg-gray-50";

function Field({ f, value, onChange, disabled }: { f: FieldDef; value: Val; onChange: (v: Val) => void; disabled: boolean }) {
  switch (f.tur) {
    case "uzun_metin":
      return <textarea rows={4} className={input} placeholder={f.ornek} disabled={disabled} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "sayi":
      return <input type="number" inputMode="decimal" className={input} disabled={disabled} value={(value as number | undefined) ?? ""} onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))} />;
    case "tarih":
      return <input type="date" className={input} disabled={disabled} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "secim": {
      const opts = f.secenekler ?? [];
      if (f.coklu) {
        const cur = Array.isArray(value) ? (value as string[]) : [];
        return (
          <div className="space-y-1">
            {opts.map((o) => (
              <label key={o} className="flex items-start gap-2 text-sm">
                <input type="checkbox" disabled={disabled} checked={cur.includes(o)} onChange={(e) => onChange(e.target.checked ? [...cur, o] : cur.filter((x) => x !== o))} />
                {o}
              </label>
            ))}
          </div>
        );
      }
      return (
        <select className={input} disabled={disabled} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value || undefined)}>
          <option value="">Seç…</option>
          {opts.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    }
    case "liste": {
      const n = Math.min(f.adet ?? f.adet_max ?? 5, 30);
      const cur = Array.isArray(value) ? (value as string[]) : [];
      return (
        <ol className="space-y-2">
          {Array.from({ length: n }, (_, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-6 text-right text-sm text-gray-400">{i + 1}.</span>
              <input
                className={input}
                disabled={disabled}
                value={cur[i] ?? ""}
                onChange={(e) => {
                  const next = [...cur];
                  next[i] = e.target.value;
                  onChange(next);
                }}
              />
            </li>
          ))}
        </ol>
      );
    }
    case "tablo": {
      const cols = f.sutunlar ?? [];
      const n = Math.min(f.satirlar?.length ?? f.adet ?? 5, 60);
      const cur = Array.isArray(value) ? (value as Data[]) : [];
      return (
        <div className="space-y-3">
          {Array.from({ length: n }, (_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-3">
              <p className="mb-2 text-xs font-semibold text-gray-500">{f.satirlar?.[i] ?? `${i + 1}. satır`}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {cols.map((c) => (
                  <label key={c.anahtar} className="block text-xs text-gray-600">
                    {c.etiket}
                    <Field
                      f={c}
                      disabled={disabled}
                      value={cur[i]?.[c.anahtar]}
                      onChange={(v) => {
                        const next = [...cur];
                        next[i] = { ...(next[i] ?? {}), [c.anahtar]: v };
                        onChange(next);
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    default:
      return <input className={input} placeholder={f.ornek} disabled={disabled} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }
}

export default function BolumForm({ id, fields, refs, initial, version, status, approvedAt, readOnly, asistan, ust }: Props) {
  const [asistanAcik, setAsistanAcik] = useState(false);
  const asistanVar = Boolean(asistan && !readOnly);
  const [data, setData] = useState<Data>(initial);
  const [ver, setVer] = useState(version);
  const [durum, setDurum] = useState(status);
  const [onayTarihi, setOnayTarihi] = useState(approvedAt);
  const [degisti, setDegisti] = useState(false);
  const [mesaj, setMesaj] = useState("");
  const [eksik, setEksik] = useState<string[]>([]);
  const [bekle, setBekle] = useState(false);

  async function kaydet(): Promise<number | null> {
    const res = await fetch(`/api/dosyam/bolum/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data, expected_version: ver }),
    });
    const j = (await res.json().catch(() => ({}))) as { ok?: boolean; mesaj?: string; submission?: { version: number; status: "taslak" } };
    if (!j.ok || !j.submission) {
      setMesaj(j.mesaj ?? "Kaydedilemedi.");
      return null;
    }
    setVer(j.submission.version);
    setDurum("taslak");
    setDegisti(false);
    return j.submission.version;
  }

  async function taslak() {
    setBekle(true);
    setMesaj("");
    if ((await kaydet()) !== null) setMesaj("Taslak kaydedildi.");
    setBekle(false);
  }

  async function onayla() {
    setBekle(true);
    setMesaj("");
    setEksik([]);
    const v = degisti || durum !== "taslak" ? await kaydet() : ver;
    if (v !== null) {
      const res = await fetch(`/api/dosyam/bolum/${id}/onay`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ version: v }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; mesaj?: string; eksik?: string[]; submission?: { approved_at: string } };
      if (j.ok) {
        setDurum("onayli");
        setOnayTarihi(j.submission?.approved_at ?? new Date().toISOString());
        setMesaj("Onaylandı. Bu bölüm dosyana işlendi.");
      } else {
        setMesaj(j.mesaj ?? "Onaylanamadı.");
        setEksik(j.eksik ?? []);
      }
    }
    setBekle(false);
  }

  // Asistanın taslağı forma gelir ama kaydedilmez: öğrenci kontrol eder, kaydeder, onaylar.
  function taslakAl(veri: Record<string, unknown>, uyarilar: string[]) {
    setData((d) => ({ ...d, ...veri }));
    setDegisti(true);
    setEksik([]);
    setMesaj(
      `Asistanın taslağı forma aktarıldı. Kontrol et, gerekirse düzelt, sonra "Taslağı kaydet" ya da "Onayla".` +
        (uyarilar.length ? `\nDüzeltilmesi gerekenler:\n- ${uyarilar.join("\n- ")}` : ""),
    );
  }

  return (
    <div className={asistanVar && asistanAcik ? "lg:grid lg:grid-cols-[minmax(0,42rem)_420px] lg:justify-center lg:gap-8" : "mx-auto max-w-2xl"}>
    <div className="space-y-6">
      {ust}
      {asistanVar && !asistanAcik && (
        <button
          onClick={() => setAsistanAcik(true)}
          className="w-full rounded-2xl border border-[#5d47f0]/30 bg-[#5d47f0]/5 p-4 text-left"
        >
          <p className="font-semibold text-[#5d47f0]">Asistanla çalış →</p>
          <p className="text-sm text-gray-600">Sana soru sorarak bu bölümü birlikte çıkaralım. Taslağı sen onaylarsın.</p>
        </button>
      )}
      <p className="text-sm text-gray-500">
        {durum === "onayli" && !degisti
          ? `✓ Onaylı${onayTarihi ? ` · ${new Date(onayTarihi).toLocaleDateString("tr-TR")}` : ""}`
          : durum === "taslak" || degisti
            ? "Taslak — onaylayana kadar dosyana işlenmez."
            : "Boş"}
      </p>
      {fields.map((f) => (
        <div key={f.anahtar} className={eksik.includes(f.anahtar) ? "rounded-xl ring-2 ring-red-300 p-2 -m-2" : ""}>
          {f.soru && <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-[#5d47f0]/70">{f.etiket}</p>}
          <p className="font-semibold text-[#232323]">
            {f.soru ?? f.etiket}
            {f.zorunlu && !f.sonradan_doldurulur ? <span className="text-red-500"> *</span> : null}
          </p>
          {f.aciklama && <p className="text-sm text-gray-600">{f.aciklama}</p>}
          {f.olcu && <p className="mb-2 text-xs text-gray-400">{f.aciklama ? `Uzunluk: ${f.olcu}` : f.olcu}</p>}
          {f.sonradan_doldurulur && <p className="mb-2 text-xs text-gray-400">Bunu sonra, sonucu gördüğünde doldurursun.</p>}
          {f.tur === "referans" ? (
            <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700 whitespace-pre-line">
              {(f.kaynak_alanlar ?? []).map((k) => refs[k]).filter(Boolean).join("\n") || "Kaynak bölüm henüz onaylanmadı."}
            </p>
          ) : (
            <Field
              f={f}
              disabled={readOnly || bekle}
              value={data[f.anahtar]}
              onChange={(v) => {
                setData((d) => ({ ...d, [f.anahtar]: v }));
                setDegisti(true);
              }}
            />
          )}
        </div>
      ))}
      {readOnly ? (
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Dosyan şu an salt okunur: görüntüleyebilir ve kopyalayabilirsin.</p>
      ) : (
        <div className="sticky bottom-0 -mx-4 flex gap-3 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
          <button onClick={taslak} disabled={bekle} className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 disabled:opacity-60">
            Taslağı kaydet
          </button>
          <button
            onClick={onayla}
            disabled={bekle || (durum === "onayli" && !degisti)}
            className="flex-1 rounded-xl py-3 font-semibold text-white disabled:opacity-60"
            style={{ background: PRIMARY }}
          >
            {durum === "onayli" && !degisti ? "Onaylı ✓" : "Onayla"}
          </button>
        </div>
      )}
      {mesaj && <p className="whitespace-pre-line rounded-xl bg-gray-50 p-4 text-sm text-gray-700">{mesaj}</p>}
    </div>
    {asistanVar && (
      <AsistanPanel
        bolum={id}
        acik={asistanAcik}
        onKapat={() => setAsistanAcik(false)}
        onTaslak={(veri, uyarilar) => {
          taslakAl(veri, uyarilar);
          // Telefonda panel formu örtüyor: taslak gelince kapanır ki öğrenci alanları görsün.
          if (typeof window !== "undefined" && window.innerWidth < 1024) setAsistanAcik(false);
        }}
      />
    )}
    {asistanVar && !asistanAcik && (
      <button
        onClick={() => setAsistanAcik(true)}
        className="fixed bottom-24 right-4 z-40 rounded-full px-5 py-3 font-semibold text-white shadow-lg"
        style={{ background: PRIMARY }}
      >
        Asistan
      </button>
    )}
    </div>
  );
}
