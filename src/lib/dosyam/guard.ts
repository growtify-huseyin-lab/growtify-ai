// Growtify Asistanı — kod katmanı korumalar (CEO 2026-10-24: "açık vermemeli, asla").
// Modelin talimatlara uymasına GÜVENİLMEZ: giriş modele gitmeden, çıkış öğrenciye gitmeden burada süzülür.
// 1) Kişisel veri: telefon, e-posta, TC kimlik, IBAN, kart → mesaj gönderilmez.
// 2) Talimat sızdırma / sistemi çözme / rol kırma girişimleri → modele gitmez, sabit cevap.
// 3) Çıkış: iç yönerge parçası, iz cümlesi (canary) ya da iç sistem/sağlayıcı adları → cevap gösterilmez.

export const MAX_USER_CHARS = 4000;

export type InputCheck =
  | { ok: true }
  | { ok: false; kind: "bos" | "uzun" | "kisisel_veri" | "girisim"; mesaj: string };

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i")
    .replace(/\s+/g, " ");

// --- kişisel veri -------------------------------------------------------------------

function tcknValid(d: string): boolean {
  if (!/^[1-9]\d{10}$/.test(d)) return false;
  const n = d.split("").map(Number);
  const t10 = ((n[0] + n[2] + n[4] + n[6] + n[8]) * 7 - (n[1] + n[3] + n[5] + n[7])) % 10;
  const t11 = n.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  return ((t10 + 10) % 10) === n[9] && t11 === n[10];
}

function luhn(d: string): boolean {
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let x = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) {
      x *= 2;
      if (x > 9) x -= 9;
    }
    sum += x;
  }
  return sum % 10 === 0;
}

export function findPersonalData(text: string): string[] {
  const found = new Set<string>();
  if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text)) found.add("e-posta");
  if (/(?:\+?90[\s.-]?)?\(?0?5\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}\b/.test(text)) found.add("telefon");
  if (/\bTR\s?\d{2}(?:\s?\d{4}){5}\s?\d{2}\b/i.test(text)) found.add("IBAN");
  for (const m of text.match(/\b\d{11}\b/g) ?? []) if (tcknValid(m)) found.add("TC kimlik numarası");
  for (const m of text.match(/\b(?:\d[ -]?){13,19}\b/g) ?? []) {
    const d = m.replace(/\D/g, "");
    if (d.length >= 13 && d.length <= 19 && luhn(d)) found.add("kart numarası");
  }
  return [...found];
}

// --- talimat sızdırma / sistemi çözme / rol kırma -------------------------------------
// Yanlış pozitif ucuzdur (öğrenci cümlesini yeniden yazar); yanlış negatifi çıkış süzgeci yakalar.

const ATTEMPT_PATTERNS: RegExp[] = [
  // talimat/yönerge/sistem mesajını isteme
  /\b(system|sistem)\s*(prompt|mesaj|talimat|yonerge|komut)/,
  /\bprompt(un|unu|unuzu|u|lar|lari)?\b.*\b(goster|yaz|paylas|ver|nedir|ne)\b/,
  /\b(talimat|yonerge|kural|komut)(lar)?(in|ini|inizi|iniz)\b(?:\s+\S+){0,2}\s+(goster|yaz|paylas|tekrarla|soyle|listele|kopyala|nedir|neler|ne)\b/,
  /\b(sana|seni)\s*(verilen|yazilan|programlayan|olusturan)\b.*\b(talimat|kural|metin|komut|yonerge)/,
  /\b(ilk|onceki|ustteki|yukaridaki)\s*(mesaj|talimat|metin)(i|lari|lerin)?\s*(tekrarla|yaz|goster|kopyala)/,
  // kuralları yok say / rol kır
  /\b(onceki|tum|butun|yukaridaki)\s*(talimat|kural|yonerge)(lar)?(i|ini|lari)?\s*(unut|yok say|gormezden gel|iptal|kaldir)/,
  /\b(ignore|disregard|forget)\b.*\b(instruction|rule|prompt|above|previous)/,
  /\b(developer|dev|god|dan|jailbreak)\s*mod/,
  /\bjailbreak\b/,
  /\b(sen artik|artik sen|bundan sonra sen)\b.*\b(degilsin|davran|rolunde|rolune|olacaksin|kuralsiz)/,
  /\b(sen|asistan|yapay zeka)\b.*\b(kurallari|kural|sinir|filtre)(lari)?\s*(olmayan|yok|siz|kaldir)/,
  /\b(sen|asistan|yapay zeka)\b.*\b(kuralsiz|sinirsiz|filtresiz|sansursuz)\b/,
  /\b(act as|pretend|roleplay as|you are now)\b/,
  // teknik iç yapı / model / sağlayıcı
  /\b(hangi|ne)\s*(yapay zeka|llm|dil modeli|altyapi)/,
  // Öğrenci kendi işinde ChatGPT vb. kullandığını anlatabilir (ders bunu öğretiyor); yalnız ASİSTANIN kimliği sorulursa.
  /\b(sen|asistan)\b.*\b(claude|anthropic|gpt|openai|gemini|llama|sonnet|opus|haiku)\b/,
  /\b(claude|anthropic|gpt|openai|gemini|llama|sonnet|opus|haiku)\b.*\b(misin|musun|mi sin|sin\b|kullaniyor musun|ile mi calisiyorsun)/,
  /\b(api\s*(key|anahtar)|endpoint|kaynak kod|source code|backend)\b/,
  /\b(reverse engineer|tersine muhendis|nasil calisiyorsun|nasil programlandin|kodunu|algoritman)\b/,
  /\b(cloudflare|vercel|gohighlevel|highlevel|ghl\b|supabase|firebase)/,
  // kodlama/genel amaçlı kullanım (ders dışı ağır istekler)
  /```|<script|<\/?system>|\{\{.*\}\}|\[\[.*\]\]/,
];

export const SABIT_CEVAP_GIRISIM =
  "Ben Growtify Asistanıyım ve yalnızca bu dersin çalışmasında sana eşlik ediyorum. Kendi yapımla ya da iç işleyişimle ilgili bilgi paylaşmıyorum. Dersimize dönelim: kaldığımız sorudan devam edelim mi?";

export function checkUserInput(text: string): InputCheck {
  const t = text.trim();
  if (!t) return { ok: false, kind: "bos", mesaj: "Bir şey yazmadın." };
  if (t.length > MAX_USER_CHARS) {
    return { ok: false, kind: "uzun", mesaj: `Mesajın çok uzun (en fazla ${MAX_USER_CHARS} karakter). Kısaltıp tekrar gönder.` };
  }
  const pii = findPersonalData(t);
  if (pii.length) {
    return {
      ok: false,
      kind: "kisisel_veri",
      mesaj: `Mesajında kişisel bilgi var (${pii.join(", ")}). Bunu buraya yazma; örnek vereceksen "bir danışanım" demen yeter. Bilgiyi çıkarıp tekrar gönder.`,
    };
  }
  const n = norm(t);
  if (ATTEMPT_PATTERNS.some((re) => re.test(n))) return { ok: false, kind: "girisim", mesaj: SABIT_CEVAP_GIRISIM };
  return { ok: true };
}

// --- çıkış süzgeci ------------------------------------------------------------------

const FORBIDDEN_OUTPUT: RegExp[] = [
  /\b(system prompt|sistem (mesaji|talimati|yonergesi)|yonergem(de|e gore)?|talimatlarim(da|a gore)?)\b/,
  // Kendi sağlayıcımızın adları (öğrenciye "kendi yapay zekânda" derken ChatGPT vb. anılabilir).
  /\b(claude|anthropic|sonnet|opus|haiku)\b/,
  /\b(cloudflare|vercel|api anahtar|api key|endpoint|gohighlevel|highlevel|firebase)\b/,
  /\b(gizli isaret|canary)\b/,
];

export const SABIT_CEVAP_SIZINTI =
  "Bu cevabı gösteremiyorum. Dersimize dönelim: kaldığımız yerden devam edelim mi? İstersen son cevabını tekrar yaz.";

// internalText: modele verilen iç yönerge (öğrenciye açık metinler HARİÇ). 8 kelimelik ardışık bir parça
// cevapta aynen geçiyorsa sızıntı sayılır.
export function checkModelOutput(text: string, internalText: string, canary: string): { ok: true } | { ok: false; neden: string } {
  const n = norm(text);
  if (canary && n.includes(norm(canary))) return { ok: false, neden: "canary" };
  if (FORBIDDEN_OUTPUT.some((re) => re.test(n))) return { ok: false, neden: "yasak_terim" };
  const words = norm(internalText).replace(/[^\p{L}\p{N} ]/gu, " ").split(" ").filter(Boolean);
  const out = ` ${n.replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ")} `;
  for (let i = 0; i + 8 <= words.length; i += 2) {
    const chunk = ` ${words.slice(i, i + 8).join(" ")} `;
    if (out.includes(chunk)) return { ok: false, neden: "yonerge_parcasi" };
  }
  return { ok: true };
}
