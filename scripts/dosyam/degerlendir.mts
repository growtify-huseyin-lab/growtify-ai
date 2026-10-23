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
      if (sonOnay && /onaylıyorum|onay/i.test(msj)) break;
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

  const olcutler: string[] = getPrompt(bolum).degerlendirme.olcutler;
  const res = await client.messages.create({
    model: JUDGE,
    max_tokens: 4000,
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
                required: ["olcut", "tur", "gecti", "puan", "gerekce"],
                properties: {
                  olcut: { type: "string" },
                  tur: { type: "string", enum: ["ikili", "puan"] },
                  gecti: { type: ["boolean", "null"] },
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
      "Bir eğitim asistanının sohbetini, verilen ölçütlerle tarafsız ve katı biçimde değerlendiriyorsun. Her ölçüt için: evet/hayır ölçütlerinde tur='ikili' ve gecti; '(1–5)' yazanlarda tur='puan' ve puan (1–5). Gerekçe 1 cümle, Türkçe. Senaryonun beklenen davranışını da hesaba kat.",
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
  const puan = JSON.parse(metin(res.content));
  return { id: s.id, meslek: s.meslek, ozellik: s.ozellik, tur: transcript.length, cokSorulu, olaylar, taslak, uyarilar, puan, gecmis, maliyetAsistan };
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
  const sonuc = (await havuz(senaryolar, paralel, (s) => senaryo(bolum, s, bolum === "R2" ? 32 : 38))) as any[];
  toplamAsistan += sonuc.reduce((t, r) => t + (r.maliyetAsistan ?? 0), 0);
  fs.writeFileSync(path.join(cikti, `${tarih}-${bolum}.json`), JSON.stringify(sonuc, null, 1));

  // Özet: ölçüt başına geçen / ortalama
  const ozet = new Map<string, { gecti: number; ikili: number; puanlar: number[] }>();
  for (const r of sonuc) {
    for (const o of r.puan?.olcutler ?? []) {
      const k = String(o.olcut).slice(0, 80);
      const v = ozet.get(k) ?? { gecti: 0, ikili: 0, puanlar: [] };
      if (o.tur === "ikili") {
        v.ikili++;
        if (o.gecti) v.gecti++;
      } else if (typeof o.puan === "number") v.puanlar.push(o.puan);
      ozet.set(k, v);
    }
  }
  const satirlar = [...ozet.entries()].map(([k, v]) =>
    v.ikili ? `| ${k} | ${v.gecti}/${v.ikili} |` : `| ${k} | ort. ${(v.puanlar.reduce((a, b) => a + b, 0) / Math.max(1, v.puanlar.length)).toFixed(1)}/5 |`,
  );
  const kaldi = sonuc
    .flatMap((r) => (r.puan?.olcutler ?? []).filter((o: any) => (o.tur === "ikili" && !o.gecti) || (o.tur === "puan" && o.puan < 4)).map((o: any) => `- **${r.id}** (${r.meslek}): ${o.olcut} — ${o.gerekce}`));
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

Tam dökümler: \`${tarih}-${bolum}.json\`
`;
  fs.writeFileSync(path.join(cikti, `${tarih}-${bolum}.md`), md);
}
console.log(`\nAsistan maliyeti ≈ $${toplamAsistan.toFixed(3)} · benzetim + puanlayıcı ≈ $${ekMaliyet.toFixed(3)}`);
