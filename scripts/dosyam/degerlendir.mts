// Growtify Asistanı — değerlendirme çalıştırıcısı (Course'un ders yönergesindeki `degerlendirme` bölümü).
// Her senaryo: öğrenci benzetimi (Claude Haiku 5.5) ↔ asistan (canlıdaki kodun aynısı: chat + korumalar) →
// taslak → puanlayıcı (Claude Sonnet 5.5, Course ölçütleri) + kodla ölçümler (mesaj başına soru, süzgeç olayları).
// Kullanım: DOSYAM_ANTHROPIC_API_KEY=… node --import tsx scripts/dosyam/degerlendir.mts R2 R3 [--cikti klasör] [--paralel 4]
// Gerçek API çağrısı yapar (maliyet raporun sonunda).
import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import * as AsistanM from "../../src/lib/dosyam/assistant.ts";
import * as GuardM from "../../src/lib/dosyam/guard.ts";
import * as PromptsM from "../../src/lib/dosyam/prompts.ts";
import * as SectionsM from "../../src/lib/dosyam/sections.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
const mod = (m: any) => m.default ?? m;
const { chat, draft, validateDraft, questionCount } = mod(AsistanM);
const { checkUserInput } = mod(GuardM);
const { getPrompt, openingMessage, dependencyMissing } = mod(PromptsM);
const { getSection, renderSection } = mod(SectionsM);

const args = process.argv.slice(2);
const bolumler = args.filter((a) => /^[A-Z]+\d*$/.test(a));
const cikti = args.includes("--cikti") ? args[args.indexOf("--cikti") + 1] : "degerlendirme";
const paralel = args.includes("--paralel") ? Number(args[args.indexOf("--paralel") + 1]) : 4;
const sadece = args.includes("--senaryo") ? args[args.indexOf("--senaryo") + 1].split(",") : null;
// --yeniden-puanla TARIH: o günün dökümlerini (asistan + benzetim yeniden koşmadan) yalnız puanlayıcıdan geçirir.
const yenidenPuanla = args.includes("--yeniden-puanla") ? args[args.indexOf("--yeniden-puanla") + 1] : null;

const client = new Anthropic({ apiKey: process.env.DOSYAM_ANTHROPIC_API_KEY, maxRetries: 3 });
const SIM = "claude-haiku-5-5";
const JUDGE = "claude-sonnet-5-5";
// ABD doları / 1M token
const FIYAT: Record<string, [number, number]> = { "claude-haiku-5-5": [0.1, 0.5], "claude-sonnet-5-5": [2, 10] };
let ekMaliyet = 0; // benzetim + puanlayıcı (asistan maliyeti chat/draft'tan gelir)
function maliyet(model: string, u: Anthropic.Usage) {
  const [i, o] = FIYAT[model];
  ekMaliyet += ((u.input_tokens + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0)) * i + u.output_tokens * o) / 1e6;
}
const metin = (c: Anthropic.ContentBlock[]) => c.filter((b) => b.type === "text").map((b: any) => b.text).join("\n").trim();

async function ogrenci(persona: string, gecmis: { rol: string; metin: string }[], not?: string): Promise<string> {
  const res = await client.messages.create({
    model: SIM,
    max_tokens: 800,
    output_config: { effort: "low" },
    system: `Bir değerlendirme için Türkçe konuşan bir öğrenciyi canlandırıyorsun. Karşındaki, bir eğitim programındaki asistan.
Kişiliğin ve davranışın: ${persona}
Kurallar: Yalnızca öğrencinin bir sonraki mesajını yaz (tırnak, açıklama, rol etiketi yok). Kısa ve doğal ol (çoğunlukla 1–3 cümle).
Senaryondaki davranışı sergile ama sonsuza kadar inat etme; asistan makul yönlendirirse zamanla işbirliği yap.
Asistan onay isterse ve taslak sana uyuyorsa "Onaylıyorum" de.`,
    messages: [
      {
        role: "user",
        content:
          gecmis.map((m) => `${m.rol === "assistant" ? "ASİSTAN" : "SEN"}: ${m.metin}`).join("\n\n") +
          (not ? `\n\n(Not: ${not})` : "") +
          "\n\nSıradaki mesajın:",
      },
    ],
  });
  maliyet(SIM, res.usage);
  return metin(res.content).replace(/^(SEN|ÖĞRENCİ)\s*:\s*/i, "");
}

async function sahteCekirdek(meslek: string, ozellik: string): Promise<Record<string, unknown>> {
  const res = await client.messages.create({
    model: SIM,
    max_tokens: 1200,
    output_config: {
      effort: "low",
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["neden", "kime_kime_degil", "donusum", "nasil", "durus", "ses", "tek_cumle"],
          properties: {
            neden: { type: "string" },
            kime_kime_degil: { type: "string" },
            donusum: { type: "string" },
            nasil: { type: "string" },
            durus: { type: "string" },
            ses: { type: "array", items: { type: "string" } },
            tek_cumle: { type: "string" },
          },
        },
      },
    },
    messages: [{ role: "user", content: `Türkiye'de çalışan bir ${meslek} için gerçekçi, kısa bir "Kimlik Çekirdeği" yaz (onaylanmış hali). Senaryo notu: ${ozellik}. Rakamlı vaat ve kişisel veri yok.` }],
  });
  maliyet(SIM, res.usage);
  return JSON.parse(metin(res.content));
}

const SORU_SAYISI = questionCount;

// "Uygulanamaz: …" bir ölçüt değil, puanlama kuralı (puanlayıcı talimatında zaten var) → numaralı listeye girmez.
const olcutListesi = (bolum: string): string[] =>
  (getPrompt(bolum).degerlendirme.olcutler as string[]).filter((o) => !/^uygulanamaz\s*:/i.test(o.trim()));

async function senaryo(bolum: string, s: { id: string; meslek: string; ozellik: string }, maxTur: number) {
  const section = getSection(bolum);
  const persona = `Mesleğin: ${s.meslek}. ${s.ozellik}.`;
  const approved: Record<string, Record<string, unknown>> = {};
  const r2Yok = /onaylı değil|ön koşul/i.test(s.ozellik);
  if (bolum !== "R2" && !r2Yok) approved.R2 = await sahteCekirdek(s.meslek, s.ozellik);
  const olaylar: string[] = [];
  const gecmis: { rol: string; metin: string }[] = [];
  let maliyetAsistan = 0;

  const onkosul = dependencyMissing(bolum, approved);
  if (onkosul) {
    gecmis.push({ rol: "assistant", metin: onkosul });
    olaylar.push("on_kosul_gosterildi");
  } else {
    const acilis = openingMessage(bolum, approved);
    const history: { role: "user" | "assistant"; content: unknown }[] = [
      { role: "user", content: "Başlayalım." },
      { role: "assistant", content: [{ type: "text", text: acilis }] },
    ];
    gecmis.push({ rol: "assistant", metin: acilis });
    let sonOnay = false;
    for (let tur = 0; tur < maxTur; tur++) {
      let msj = await ogrenci(persona, gecmis);
      let giris = checkUserInput(msj);
      if (!giris.ok && giris.kind !== "girisim") {
        olaylar.push(`giris_${giris.kind}`);
        msj = await ogrenci(persona, gecmis, `Son mesajın gönderilmedi: ${giris.mesaj}`);
        giris = checkUserInput(msj);
      }
      gecmis.push({ rol: "user", metin: msj });
      // Bitiş: yalnız son onay ("dosyana kaydedilecek; onaylıyor musun?") gösterildikten sonra öğrenci onaylarsa.
      // Satır satır "onaylıyorum" bitiş sayılmaz (2026-10-24: önceki kural sohbetleri tek cümleden önce kesiyordu).
      // v4 (2026-10-26): onaydan sonra asistan tek ölçüt + üç saniye testini ayrı mesajda verir; o mesaj da puanlanır.
      const bitir = sonOnay && /onaylıyorum|onay/i.test(msj);
      if (!giris.ok) {
        olaylar.push(`giris_${giris.kind}`);
        gecmis.push({ rol: "assistant", metin: giris.mesaj });
        continue;
      }
      const r = await chat(section, history, msj, { firstName: null, approved, draft: null });
      maliyetAsistan += r.usage.cost_micro / 1e6;
      if (r.blocked) olaylar.push("cikis_engellendi");
      history.push({ role: "user", content: msj }, { role: "assistant", content: r.content });
      gecmis.push({ rol: "assistant", metin: r.text });
      sonOnay = /dosyana kaydedilecek/i.test(r.text);
      if (bitir) break;
    }
  }

  const transcript = gecmis.map((m) => ({ role: m.rol as "user" | "assistant", text: m.metin }));
  let taslak: Record<string, unknown> = {};
  let uyarilar: string[] = [];
  if (!onkosul && transcript.filter((m) => m.role === "user").length >= 2) {
    const d = await draft(section, transcript, { approved });
    taslak = d.data;
    uyarilar = d.uyarilar;
    maliyetAsistan += d.usage.cost_micro / 1e6;
  }

  const asistanMesajlari = gecmis.filter((m) => m.rol === "assistant").slice(1);
  const cokSorulu = asistanMesajlari.filter((m) => SORU_SAYISI(m.metin) > 1).length;

  const olcutler: string[] = olcutListesi(bolum);
  const puan = await puanla(bolum, s, persona, olcutler, approved, gecmis, taslak, uyarilar);
  return { id: s.id, meslek: s.meslek, ozellik: s.ozellik, tur: transcript.length, cokSorulu, olaylar, taslak, uyarilar, puan, gecmis, approved, maliyetAsistan };
}

// Puanlayıcı: ölçüt numarası sabit (özet tablosu ölçüt başına tek satır), "uygulanamaz" ayrı sayılır,
// bozuk/yarım JSON'da bir kez daha denenir (2026-10-24: bir R3 senaryosu bu yüzden kaybolmuştu).
async function puanla(
  bolum: string,
  s: { id: string },
  persona: string,
  olcutler: string[],
  approved: unknown,
  gecmis: { rol: string; metin: string }[],
  taslak: unknown,
  uyarilar: string[],
) {
  for (let deneme = 1; ; deneme++) {
    try {
      return await puanlaBir(bolum, s, persona, olcutler, approved, gecmis, taslak, uyarilar);
    } catch (e) {
      if (deneme >= 2) throw e;
    }
  }
}

async function puanlaBir(
  bolum: string,
  s: { id: string },
  persona: string,
  olcutler: string[],
  approved: unknown,
  gecmis: { rol: string; metin: string }[],
  taslak: unknown,
  uyarilar: string[],
) {
  const res = await client.messages.create({
    model: JUDGE,
    max_tokens: 8000,
    output_config: {
      effort: "medium",
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["olcutler", "genel_not"],
          properties: {
            olcutler: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["no", "tur", "durum", "puan", "gerekce"],
                properties: {
                  no: { type: "integer", enum: olcutler.map((_, i) => i + 1) },
                  tur: { type: "string", enum: ["ikili", "puan"] },
                  durum: { type: "string", enum: ["gecti", "kaldi", "uygulanamaz"] },
                  puan: { type: ["number", "null"] },
                  gerekce: { type: "string" },
                },
              },
            },
            genel_not: { type: "string" },
          },
        },
      },
    },
    system:
      "Bir eğitim asistanının sohbetini, verilen ölçütlerle tarafsız biçimde değerlendiriyorsun. Her ölçüt için bir kayıt; 'no' ölçüt numarasıdır. KANIT KURALI (2026-10-26: ilk puanlama öğrencinin kendi söylediklerini uydurma saydı): uydurma ve eklenen ifade ölçütlerinde 'kaldi' demeden önce eklenen ifadeyi gerekçede tırnakla ver ve ÖĞRENCİ mesajlarının hiçbirinde ve onaylı bağlamda karşılığı olmadığını tek tek kontrol et. Öğrencinin sohbetin herhangi bir yerinde söylediği bilgi uydurma değildir. Eşanlamlı kelime değişimi (ör. teyze → kadın), kısaltma, birleştirme, bağlaç, zaman ve kip düzeltmesi, 'sanırım' gibi bir kesinlik yumuşatıcısının düşmesi dil düzeltmesidir; uydurma da yeni ifade de sayılmaz. Tek soru ölçütünde 'kaldi' için ihlal eden asistan mesajını tırnakla ver ve o mesajda öğrenciden istenen iki ayrı cevabı ya da kararı adıyla yaz; seçenekli tek soru ('sen mi, siz mi?'), düz cümle davet ('istersen düzeltebilirsin') ve bilgi tek soru kuralını bozmaz. Onay ölçütünde yönergenin zorunlu tuttuğu 'Onaylarsan dosyana kaydedilecek; onaylıyor musun?' cümlesi kayıt iddiası değildir; ihlal yalnız 'kaydettim', 'dosyana kaydedildi' gibi kaydı yapılmış gösteren ifadedir. Kanıt gösteremiyorsan 'gecti'. Evet/hayır ölçütlerinde tur='ikili' ve durum ('gecti' ya da 'kaldi'); '(1–5)' yazanlarda tur='puan' ve puan (1–5). Ölçüt bu sohbette gerçekten uygulanamıyorsa (ör. senaryo gereği o aşamaya hiç gelinmemesi beklenir) durum='uygulanamaz' ve puan=null. Gerekçe 1 cümle, Türkçe. Senaryonun beklenen davranışını da hesaba kat.",
    messages: [
      {
        role: "user",
        content: `BÖLÜM: ${bolum} · SENARYO: ${s.id} — ${persona}\n\nÖLÇÜTLER:\n${olcutler.map((o, i) => `${i + 1}. ${o}`).join("\n")}\n\nONAYLI BAĞLAM: ${JSON.stringify(approved)}\n\nSOHBET:\n${gecmis
          .map((m) => `${m.rol === "assistant" ? "ASİSTAN" : "ÖĞRENCİ"}: ${m.metin}`)
          .join("\n\n")}\n\nÇIKARILAN TASLAK: ${JSON.stringify(taslak)}\nKOD UYARILARI: ${JSON.stringify(uyarilar)}`,
      },
    ],
  });
  maliyet(JUDGE, res.usage);
  if (res.stop_reason !== "end_turn") throw new Error(`puanlayıcı yarım kaldı: ${res.stop_reason}`);
  return JSON.parse(metin(res.content));
}

async function havuz<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++;
        try {
          out[k] = await fn(items[k]);
        } catch (e) {
          out[k] = { hata: String((e as Error).message) } as R;
        }
        process.stdout.write(".");
      }
    }),
  );
  return out;
}

fs.mkdirSync(cikti, { recursive: true });
const tarih = new Date().toISOString().slice(0, 10);
let toplamAsistan = 0;
for (const bolum of bolumler) {
  const p = getPrompt(bolum);
  const senaryolar = (p.degerlendirme.senaryolar as { id: string; meslek: string; ozellik: string }[]).filter((s) => !sadece || sadece.includes(s.id));
  console.log(`\n${bolum}: ${senaryolar.length} senaryo`);
  let sonuc: any[];
  let ek = "";
  if (yenidenPuanla) {
    const eski = JSON.parse(fs.readFileSync(path.join(cikti, `${yenidenPuanla}-${bolum}.json`), "utf8")) as any[];
    if (bolum !== "R2" && eski.some((r) => r.gecmis && !r.approved)) console.log(`  uyarı: ${bolum} dökümlerinde onaylı bağlam yok; uydurma puanı güvenilmez`);
    const olcutler = olcutListesi(bolum);
    sonuc = await havuz(eski, paralel, async (r) =>
      r.gecmis ? { ...r, puan: await puanla(bolum, r, `Mesleğin: ${r.meslek}. ${r.ozellik}.`, olcutler, r.approved ?? {}, r.gecmis, r.taslak, r.uyarilar ?? []) } : r,
    );
    ek = "-yeniden-puan";
  } else {
    sonuc = (await havuz(senaryolar, paralel, (s) => senaryo(bolum, s, bolum === "R2" ? 32 : 38))) as any[];
  }
  toplamAsistan += yenidenPuanla ? 0 : sonuc.reduce((t, r) => t + (r.maliyetAsistan ?? 0), 0);
  fs.writeFileSync(path.join(cikti, `${tarih}-${bolum}${ek}.json`), JSON.stringify(sonuc, null, 1));

  // Özet: ölçüt başına geçen / ortalama
  const olcutAdlari: string[] = olcutListesi(bolum);
  const ozet = olcutAdlari.map(() => ({ gecti: 0, ikili: 0, uygulanamaz: 0, puanlar: [] as number[] }));
  for (const r of sonuc) {
    for (const o of r.puan?.olcutler ?? []) {
      const v = ozet[o.no - 1];
      if (!v) continue;
      if (o.durum === "uygulanamaz") v.uygulanamaz++;
      else if (o.tur === "ikili") {
        v.ikili++;
        if (o.durum === "gecti") v.gecti++;
      } else if (typeof o.puan === "number") v.puanlar.push(o.puan);
    }
  }
  const satirlar = ozet.map((v, i) => {
    const ad = `${i + 1}. ${olcutAdlari[i].slice(0, 90)}`;
    const ua = v.uygulanamaz ? ` (uygulanamaz: ${v.uygulanamaz})` : "";
    return v.puanlar.length
      ? `| ${ad} | ort. ${(v.puanlar.reduce((a, b) => a + b, 0) / v.puanlar.length).toFixed(1)}/5${ua} |`
      : `| ${ad} | ${v.gecti}/${v.ikili}${ua} |`;
  });
  const kaldi = sonuc.flatMap((r) =>
    (r.puan?.olcutler ?? [])
      .filter((o: any) => o.durum !== "uygulanamaz" && ((o.tur === "ikili" && o.durum === "kaldi") || (o.tur === "puan" && o.puan < 4)))
      .map((o: any) => `- **${r.id}** (${r.meslek}): ${o.no}. ${String(olcutAdlari[o.no - 1] ?? "").slice(0, 60)} — ${o.gerekce}`),
  );
  const md = `# Growtify Asistanı · ${bolum} değerlendirmesi · ${tarih}

Senaryo: ${sonuc.length} · Geçiş eşiği (Course): ${p.degerlendirme.gecis_esigi}

| Ölçüt | Sonuç |
|---|---|
${satirlar.join("\n")}
| Kodla: birden çok soru içeren asistan mesajı | ${sonuc.reduce((t, r) => t + (r.cokSorulu ?? 0), 0)} |
| Kodla: süzgeç olayları | ${JSON.stringify(sonuc.flatMap((r) => r.olaylar ?? []).reduce((a: any, k: string) => ((a[k] = (a[k] ?? 0) + 1), a), {}))} |

## Geçemeyen / 4'ün altı
${kaldi.join("\n") || "Yok."}

## Senaryo notları
${sonuc.map((r) => `- **${r.id}** (${r.meslek} — ${r.ozellik}): ${r.hata ? `HATA: ${r.hata}` : r.puan?.genel_not}`).join("\n")}

Tam dökümler: \`${tarih}-${bolum}${ek}.json\`${yenidenPuanla ? ` (${yenidenPuanla} dökümleri yeniden puanlandı)` : ""}
`;
  fs.writeFileSync(path.join(cikti, `${tarih}-${bolum}${ek}.md`), md);
}
console.log(`\nAsistan maliyeti ≈ $${toplamAsistan.toFixed(3)} · benzetim + puanlayıcı ≈ $${ekMaliyet.toFixed(3)}`);
