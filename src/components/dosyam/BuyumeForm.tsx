"use client";

import { useMemo, useState } from "react";
import type { FieldDef } from "@/lib/dosyam/sections";

const PRIMARY = "#5d47f0";

interface Week {
  week_start: string;
  data: Record<string, number>;
  note: string | null;
}

function monday(d: Date): string {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = x.getUTCDay() || 7;
  x.setUTCDate(x.getUTCDate() - day + 1);
  return x.toISOString().slice(0, 10);
}

export default function BuyumeForm({ fields, weeks, readOnly }: { fields: FieldDef[]; weeks: Week[]; readOnly: boolean }) {
  const [list, setList] = useState(weeks);
  const [hafta, setHafta] = useState(monday(new Date()));
  const current = useMemo(() => list.find((w) => w.week_start === hafta), [list, hafta]);
  const [data, setData] = useState<Record<string, number | undefined>>(current?.data ?? {});
  const [note, setNote] = useState(current?.note ?? "");
  const [mesaj, setMesaj] = useState("");
  const [bekle, setBekle] = useState(false);
  const sayilar = fields.filter((f) => f.tur === "sayi" && !f.hesaplanan);

  function sec(h: string) {
    setHafta(h);
    const w = list.find((x) => x.week_start === h);
    setData(w?.data ?? {});
    setNote(w?.note ?? "");
    setMesaj("");
  }

  async function kaydet(e: React.FormEvent) {
    e.preventDefault();
    setBekle(true);
    const res = await fetch(`/api/dosyam/hafta/${hafta}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data, note }),
    });
    const j = (await res.json().catch(() => ({}))) as { ok?: boolean; mesaj?: string; gelen_ilgi?: number };
    setBekle(false);
    if (!j.ok) return setMesaj(j.mesaj ?? "Kaydedilemedi.");
    const saved = { week_start: hafta, data: { ...(data as Record<string, number>), gelen_ilgi: j.gelen_ilgi ?? 0 }, note };
    setList((l) => [saved, ...l.filter((w) => w.week_start !== hafta)].sort((a, b) => b.week_start.localeCompare(a.week_start)));
    setMesaj("Hafta kaydedildi.");
  }

  return (
    <div className="space-y-8">
      {!readOnly && (
        <form onSubmit={kaydet} className="space-y-4 rounded-2xl border border-gray-200 p-4">
          <label className="block text-sm font-semibold text-[#232323]">
            Hafta (pazartesi)
            <input type="date" value={hafta} onChange={(e) => e.target.value && sec(monday(new Date(`${e.target.value}T12:00:00`)))} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            {sayilar.map((f) => (
              <label key={f.anahtar} className="block text-xs text-gray-600">
                {f.etiket}
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={data[f.anahtar] ?? ""}
                  onChange={(e) => setData((d) => ({ ...d, [f.anahtar]: e.target.value === "" ? undefined : Number(e.target.value) }))}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-base"
                />
              </label>
            ))}
          </div>
          <label className="block text-xs text-gray-600">
            Not
            <input value={note} maxLength={600} onChange={(e) => setNote(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-base" />
          </label>
          <button disabled={bekle} className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60" style={{ background: PRIMARY }}>
            {current ? "Haftayı güncelle" : "Haftayı kaydet"}
          </button>
          {mesaj && <p className="text-sm text-gray-700">{mesaj}</p>}
        </form>
      )}
      <div>
        <h2 className="mb-3 font-bold text-[#232323]">Geçmiş haftalar</h2>
        {list.length === 0 ? (
          <p className="text-sm text-gray-500">Henüz hafta yok. İlk satır: son 30 gün, geriye dönük.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs text-gray-500">
                <tr>
                  <th className="px-3 py-2">Hafta</th>
                  <th className="px-3 py-2">Değilen kişi</th>
                  <th className="px-3 py-2">Gelen ilgi</th>
                  <th className="px-3 py-2">Görüşme</th>
                  <th className="px-3 py-2">Yeni müşteri</th>
                </tr>
              </thead>
              <tbody>
                {list.map((w) => (
                  <tr key={w.week_start} className="cursor-pointer border-t border-gray-100 hover:bg-gray-50" onClick={() => !readOnly && sec(w.week_start)}>
                    <td className="px-3 py-2">{new Date(`${w.week_start}T12:00:00`).toLocaleDateString("tr-TR")}</td>
                    <td className="px-3 py-2">{w.data.degilen_dogru_kisi ?? "–"}</td>
                    <td className="px-3 py-2">{w.data.gelen_ilgi ?? "–"}</td>
                    <td className="px-3 py-2">{w.data.gorusme ?? "–"}</td>
                    <td className="px-3 py-2">{w.data.yeni_musteri ?? "–"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
