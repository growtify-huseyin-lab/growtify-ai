// Growtify AI — Kurumsal Quiz PDF Template (Puppeteer)
// 2 pages: Cover + Dimension Scores | Persona + Recommendations + CTA

import type { KurumsalQuizState, KurumsalPersona } from "./types-kurumsal";
import { getDimensionBreakdown, getPainBreakdown } from "./scoring-kurumsal";

const PRIMARY = "#2563EB";
const PRIMARY_LIGHT = "#60A5FA";
const DARK = "#1a1a2e";
const GRAY = "#64748b";
const GREEN = "#22C55E";
const RED = "#EF4444";
const YELLOW = "#F59E0B";

// Inline SVG icons (Puppeteer on Vercel has no emoji font — SVGs render perfectly)
function svg(path: string, color: string, size = 18): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><${path}/></svg>`;
}
const ICONS = {
  seedling: (c: string, s?: number) => svg('path d="M7 20h10M12 20v-8m0 0C12 8 8 6 4 7m8 5c0-4 4-6 8-5"', c, s),
  search: (c: string, s?: number) => svg('circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"', c, s),
  gear: (c: string, s?: number) => svg('circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"', c, s),
  rocket: (c: string, s?: number) => svg('path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m3 3a22 22 0 0 0 4-11 22 22 0 0 0-11 4l7 7z"', c, s),
  building: (c: string, s?: number) => svg('rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01"', c, s),
  users: (c: string, s?: number) => svg('path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"', c, s),
  target: (c: string, s?: number) => svg('circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"', c, s),
  clipboard: (c: string, s?: number) => svg('path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"', c, s),
  chart: (c: string, s?: number) => svg('line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"', c, s),
  calendar: (c: string, s?: number) => svg('rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"', c, s),
};

const PERSONA_INFO: Record<KurumsalPersona, { icon: string; iconBg: string; subtitle: string; desc: string }> = {
  Baslangic: {
    icon: ICONS.seedling("#fff"), iconBg: "#22C55E",
    subtitle: "AI Fark\u0131ndal\u0131k A\u015famas\u0131",
    desc: "Organizasyonunuz AI yolculuğunun başında. Doğru temeller atıldığında hızlı ilerleme potansiyeli yüksek.",
  },
  Kesif: {
    icon: ICONS.search("#fff"), iconBg: "#F59E0B",
    subtitle: "AI Deneyimleme A\u015famas\u0131",
    desc: "AI araçlarını deniyorsunuz ama sistematik yaklaşım eksik. Doğru yol haritası ile hızlanabilirsiniz.",
  },
  Uygulama: {
    icon: ICONS.gear("#fff"), iconBg: "#2563EB",
    subtitle: "AI Operasyonu A\u015famas\u0131",
    desc: "AI çözümleri aktif kullanılıyor. Ölçeklendirme ve yönetişim üzerine odaklanma zamanı.",
  },
  Lider: {
    icon: ICONS.rocket("#fff"), iconBg: "#7C3AED",
    subtitle: "AI D\u00f6n\u00fc\u015f\u00fcm\u00fc A\u015famas\u0131",
    desc: "AI stratejik rekabet avantajı olarak kullanılıyor. Yeni fırsatları keşfetme zamanı.",
  },
};

const PAIN_LEVEL_TR: Record<string, { label: string; color: string }> = {
  low: { label: "Düşük", color: GREEN },
  medium: { label: "Orta", color: YELLOW },
  high: { label: "Yüksek", color: RED },
};

const SECTOR_LABELS: Record<string, string> = {
  saas: "SaaS & Teknoloji", eticaret: "E-Ticaret & Perakende",
  finans: "Finans & Bankacılık", saglik: "Sağlık & İlaç",
  hukuk: "Hukuk & Danışmanlık", uretim: "Üretim & Lojistik",
  egitim: "Eğitim", diger: "Diğer",
};

const GOAL_LABELS: Record<string, string> = {
  verimlilik: "Operasyonel verimlilik", gelir: "Gelir artışı",
  maliyet: "Maliyet düşürme", deneyim: "Müşteri deneyimi",
  rekabet: "Rekabet avantajı",
};

const DEPT_LABELS: Record<string, string> = {
  pazarlama: "Pazarlama", satis: "Satış", musteri_hizmetleri: "Müşteri Hizmetleri",
  finans: "Finans", operasyon: "Operasyon", ik: "İnsan Kaynakları", it: "IT",
};

function barColor(pct: number): string {
  if (pct >= 66) return GREEN;
  if (pct >= 33) return YELLOW;
  return RED;
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generateKurumsalPdfHtml(state: KurumsalQuizState): string {
  const now = new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  const dimensions = getDimensionBreakdown(state);
  const pains = getPainBreakdown(state);
  const persona = PERSONA_INFO[state.persona] ?? PERSONA_INFO.Baslangic;
  const painLevel = PAIN_LEVEL_TR[state.painLevel] ?? PAIN_LEVEL_TR.medium;
  const avgDimension = Math.round(dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length * 10);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: ${DARK}; font-size: 12px; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; min-height: 297mm; position: relative; overflow: hidden; page-break-after: always; }
  .page:last-child { page-break-after: auto; }

  /* PAGE 1 */
  .p1-header {
    background: linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 60%, #3B82F6 100%);
    color: white; padding: 44px 50px 36px; position: relative; overflow: hidden;
  }
  .p1-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.06); }
  .p1-badge { display: inline-block; background: rgba(255,255,255,0.15); border-radius: 50px; padding: 5px 18px; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
  .p1-title { font-size: 28px; font-weight: 900; margin-bottom: 6px; }
  .p1-subtitle { font-size: 14px; opacity: 0.8; }
  .p1-name-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px; }
  .p1-name { font-size: 22px; font-weight: 800; }
  .p1-date { font-size: 11px; opacity: 0.6; }
  .p1-body { padding: 30px 50px 40px; }

  .score-row { display: flex; gap: 16px; margin-bottom: 28px; }
  .score-card { flex: 1; border-radius: 16px; padding: 20px; text-align: center; position: relative; }
  .score-card-primary { background: linear-gradient(135deg, ${PRIMARY}12, ${PRIMARY}08); border: 1.5px solid ${PRIMARY}25; }
  .score-card-neutral { background: #f1f5f9; border: 1.5px solid #e2e8f0; }
  .score-val { font-size: 36px; font-weight: 900; line-height: 1; }
  .score-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${GRAY}; margin-top: 6px; }

  .section-title { font-size: 16px; font-weight: 800; color: ${DARK}; margin-bottom: 4px; }
  .section-sub { font-size: 11px; color: ${GRAY}; margin-bottom: 16px; }

  .dim-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .dim-label { width: 140px; font-size: 11px; font-weight: 600; color: #475569; }
  .dim-track { flex: 1; height: 14px; background: #f1f5f9; border-radius: 7px; overflow: hidden; }
  .dim-fill { height: 14px; border-radius: 7px; }
  .dim-val { width: 40px; font-size: 11px; font-weight: 700; color: ${GRAY}; text-align: right; }

  .pain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
  .pain-card { background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 14px; }
  .pain-card-label { font-size: 10px; font-weight: 600; color: ${RED}; margin-bottom: 4px; }
  .pain-card-val { font-size: 20px; font-weight: 900; color: ${DARK}; }

  .details-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; margin-top: 20px; }
  .detail-box { background: #f8fafc; border-radius: 12px; padding: 14px; }
  .detail-icon { font-size: 18px; margin-bottom: 4px; }
  .detail-label { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${GRAY}; }
  .detail-val { font-size: 12px; font-weight: 700; color: ${DARK}; margin-top: 2px; }

  .p1-footer { position: absolute; bottom: 12px; left: 40px; right: 40px; font-size: 7px; color: #94a3b8; text-align: center; line-height: 1.5; }

  /* PAGE 2 */
  .p2 { background: white; padding: 40px 50px; }
  .p2-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 2px solid #f1f5f9; }
  .p2-brand { font-size: 14px; font-weight: 800; color: ${PRIMARY}; }
  .p2-pagetitle { font-size: 10px; color: ${GRAY}; }

  .persona-card {
    background: linear-gradient(135deg, ${PRIMARY}08, ${PRIMARY}04);
    border: 1.5px solid ${PRIMARY}20; border-radius: 20px;
    padding: 24px; margin-bottom: 20px;
  }
  .persona-emoji { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; color: white; margin-bottom: 10px; }
  .persona-name { font-size: 20px; font-weight: 900; color: ${PRIMARY}; margin-bottom: 4px; }
  .persona-sub { font-size: 12px; color: ${GRAY}; font-style: italic; margin-bottom: 12px; }
  .persona-desc { font-size: 12px; color: #475569; line-height: 1.7; }

  .rec-box { display: flex; gap: 14px; align-items: flex-start; background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 10px; }
  .rec-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; background: ${PRIMARY}15; }
  .rec-title { font-size: 12px; font-weight: 700; color: ${DARK}; margin-bottom: 2px; }
  .rec-body { font-size: 11px; color: ${GRAY}; line-height: 1.6; }

  .cta-bar {
    background: linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT});
    border-radius: 16px; padding: 24px;
    color: white; text-align: center; margin-top: 20px;
  }
  .cta-name { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
  .cta-sub { font-size: 11px; opacity: 0.85; margin-bottom: 12px; }
  .cta-btn { display: inline-block; background: white; color: ${PRIMARY}; font-size: 13px; font-weight: 800; border-radius: 24px; padding: 10px 32px; }
  .cta-url { font-size: 10px; opacity: 0.5; margin-top: 8px; }

  .p2-footer { position: absolute; bottom: 12px; left: 40px; right: 40px; font-size: 7px; color: #94a3b8; text-align: center; line-height: 1.5; }

  .dept-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .dept-tag { background: ${PRIMARY}10; border: 1px solid ${PRIMARY}25; border-radius: 20px; padding: 4px 14px; font-size: 10px; font-weight: 600; color: ${PRIMARY}; }
</style>
</head>
<body>

<!-- PAGE 1: COVER + DIMENSIONS + PAIN -->
<div class="page" style="background:white;">
  <div class="p1-header">
    <div class="p1-badge">Kurumsal Rapor</div>
    <div class="p1-title">AI Olgunluk Değerlendirme Raporu</div>
    <div class="p1-subtitle">Kurumsal AI hazırlık seviyeniz</div>
    <div class="p1-name-row">
      <div class="p1-name">${esc(state.firstName || "Profesyonel")}</div>
      <div class="p1-date">${now}</div>
    </div>
  </div>

  <div class="p1-body">
    <!-- Score Cards -->
    <div class="score-row">
      <div class="score-card score-card-primary" style="flex:1.5">
        <div class="score-val" style="color:${PRIMARY}">%${avgDimension}</div>
        <div class="score-label">Ortalama Olgunluk</div>
      </div>
      <div class="score-card score-card-neutral">
        <div class="score-val" style="font-size:24px;"><div style="width:40px;height:40px;border-radius:10px;background:${persona.iconBg};display:flex;align-items:center;justify-content:center;margin:0 auto;">${persona.icon}</div></div>
        <div style="font-size:13px; font-weight:800; color:${DARK}; margin-top:4px;">${esc(persona.subtitle)}</div>
        <div class="score-label">Olgunluk Seviyesi</div>
      </div>
      <div class="score-card score-card-neutral">
        <div class="score-val" style="font-size:18px; color:${painLevel.color}">${esc(painLevel.label)}</div>
        <div class="score-label">Zorluk Seviyesi</div>
      </div>
    </div>

    <!-- 5 Dimension Bars -->
    <div class="section-title">5 Boyutta AI Olgunluk</div>
    <div class="section-sub">10 \u00fczerinden puan — y\u00fcksek de\u011ferler daha y\u00fcksek olgunluk g\u00f6sterir</div>
    ${dimensions.map((d) => {
      const pct = Math.round((d.score / d.max) * 100);
      return `
    <div class="dim-item">
      <div class="dim-label">${esc(d.label)}</div>
      <div class="dim-track"><div class="dim-fill" style="width:${pct}%;background:${barColor(pct)}"></div></div>
      <div class="dim-val">${d.score}/${d.max}</div>
    </div>`;
    }).join("")}

    <!-- Pain Areas -->
    <div style="margin-top:24px;">
      <div class="section-title" style="font-size:14px;">Zorluk Alanlar\u0131</div>
      <div class="section-sub">5 \u00fczerinden — y\u00fcksek de\u011ferler daha fazla zorluk g\u00f6sterir</div>
      <div class="pain-grid">
        ${pains.map((p) => `
        <div class="pain-card">
          <div class="pain-card-label">${esc(p.label)}</div>
          <div class="pain-card-val">${p.score}/${p.max}</div>
        </div>`).join("")}
      </div>
    </div>

    <!-- Detail Grid -->
    <div class="details-grid">
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${PRIMARY}15;display:flex;align-items:center;justify-content:center;">${ICONS.building(PRIMARY, 14)}</div>
        <div class="detail-label">Sekt\u00f6r</div>
        <div class="detail-val">${esc(SECTOR_LABELS[state.sector ?? ""] ?? state.sector ?? "Belirtilmedi")}</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${GREEN}15;display:flex;align-items:center;justify-content:center;">${ICONS.users(GREEN, 14)}</div>
        <div class="detail-label">Ekip</div>
        <div class="detail-val">${esc(state.companySize ?? "Belirtilmedi")}</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${YELLOW}15;display:flex;align-items:center;justify-content:center;">${ICONS.target(YELLOW, 14)}</div>
        <div class="detail-label">Hedef</div>
        <div class="detail-val">${esc(GOAL_LABELS[state.q_goal ?? ""] ?? "Belirtilmedi")}</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:#7C3AED15;display:flex;align-items:center;justify-content:center;">${ICONS.clipboard("#7C3AED", 14)}</div>
        <div class="detail-label">\u00d6ncelik</div>
        <div class="detail-val">${state.q_priority_depts?.length ?? 0} departman</div>
      </div>
    </div>

    ${state.q_priority_depts?.length ? `
    <div style="margin-top:16px;">
      <div style="font-size:12px; font-weight:700; color:${DARK}; margin-bottom:8px;">\u00d6ncelikli Departmanlar</div>
      <div class="dept-tags">
        ${state.q_priority_depts.map((d) => `<div class="dept-tag">${esc(DEPT_LABELS[d] ?? d)}</div>`).join("")}
      </div>
    </div>` : ""}
  </div>

  <div class="p1-footer">Bu rapor Growtify.ai Kurumsal AI Olgunluk De\u011ferlendirmesi'ne verilen cevaplara dayal\u0131 otomatik bir analizdir. Profesyonel, hukuki veya mali dan\u0131\u015fmanl\u0131k niteli\u011fi ta\u015f\u0131maz. Sonu\u00e7lar verilen cevaplara dayalı olup nesnel bir \u00f6l\u00e7\u00fcm de\u011fildir. Ki\u015fisel verileriniz 6698 say\u0131l\u0131 KVKK kapsam\u0131nda i\u015flenmektedir. \u00a9 ${new Date().getFullYear()} Growtify \u2014 growtify.ai</div>
</div>

<!-- PAGE 2: PERSONA + RECOMMENDATIONS + CTA -->
<div class="page p2" style="position:relative;">
  <div class="p2-header">
    <div class="p2-brand">Growtify.ai</div>
    <div class="p2-pagetitle">${esc(state.firstName)} \u2014 Kurumsal AI Olgunluk Analizi</div>
  </div>

  <!-- Persona Card -->
  <div class="persona-card">
    <div class="persona-emoji" style="background:${persona.iconBg};">${persona.icon}</div>
    <div class="persona-name">${esc(persona.subtitle)}</div>
    <div class="persona-sub">${esc(state.persona === "Baslangic" ? "Ba\u015flang\u0131\u00e7" : state.persona === "Kesif" ? "Ke\u015fif" : state.persona === "Uygulama" ? "Uygulama" : "Lider")} Seviyesi</div>
    <div class="persona-desc">${esc(persona.desc)}</div>
  </div>

  <!-- Recommendations -->
  <div class="section-title" style="font-size:15px;">Size \u00d6zel \u00d6neriler</div>
  <div style="margin-top:12px; margin-bottom:20px;">
    <div class="rec-box">
      <div class="rec-icon" style="background:${PRIMARY}15;display:flex;align-items:center;justify-content:center;">${ICONS.calendar(PRIMARY)}</div>
      <div>
        <div class="rec-title">AI Strateji De\u011ferlendirmesi</div>
        <div class="rec-body">30 dakikal\u0131k \u00fccretsiz strateji g\u00f6r\u00fc\u015fmesi ile ba\u015flayal\u0131m. Ekibinizi, hedeflerinizi ve mevcut durumunuzu birlikte de\u011ferlendirelim.</div>
      </div>
    </div>
    <div class="rec-box">
      <div class="rec-icon" style="background:${GREEN}15;display:flex;align-items:center;justify-content:center;">${ICONS.chart(GREEN)}</div>
      <div>
        <div class="rec-title">ROI \u00d6l\u00e7\u00fcm \u00c7er\u00e7evesi</div>
        <div class="rec-body">AI yat\u0131r\u0131mlar\u0131n\u0131z\u0131n geri d\u00f6n\u00fc\u015f\u00fcn\u00fc \u00f6l\u00e7mek i\u00e7in sistematik bir yap\u0131 kurman\u0131z\u0131 \u00f6neriyoruz.</div>
      </div>
    </div>
    <div class="rec-box">
      <div class="rec-icon" style="background:${YELLOW}15;display:flex;align-items:center;justify-content:center;">${ICONS.users(YELLOW)}</div>
      <div>
        <div class="rec-title">Ekip Yetkinlik Haritas\u0131</div>
        <div class="rec-body">Ekibinizin AI yetkinliklerini haritalay\u0131n ve e\u011fitim ihtiya\u00e7lar\u0131n\u0131 belirleyin.</div>
      </div>
    </div>
  </div>

  <!-- GROWT Method -->
  <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px;">
    <div style="font-size:13px; font-weight:800; color:${DARK}; margin-bottom:12px;">GROWT Method ile D\u00f6n\u00fc\u015f\u00fcm</div>
    <div style="display:flex; gap:8px;">
      ${["G", "R", "O", "W", "T"].map((letter, i) => {
        const colors = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#5d47f0"];
        const names = ["Gap Analysis", "Roadmap", "Operationalize", "Win", "Transform"];
        return `<div style="flex:1; text-align:center; background:${colors[i]}15; border-radius:10px; padding:10px;">
          <div style="font-size:20px; font-weight:900; color:${colors[i]};">${letter}</div>
          <div style="font-size:8px; font-weight:600; color:${GRAY}; margin-top:2px;">${names[i]}</div>
        </div>`;
      }).join("")}
    </div>
  </div>

  <!-- CTA -->
  <div class="cta-bar">
    <div class="cta-name">\u00dccretsiz Strateji G\u00f6r\u00fc\u015fmesi</div>
    <div class="cta-sub">30 dakikal\u0131k ke\u015fif g\u00f6r\u00fc\u015fmesi \u2014 ekibiniz, hedefleriniz ve yol haritan\u0131z</div>
    <a href="https://app.growtify.app/widget/bookings/kurumsal-on-gorusme" class="cta-btn" style="text-decoration:none;color:${PRIMARY};">G\u00f6r\u00fc\u015fme Planla &rarr;</a>
    <div class="cta-url">app.growtify.app/widget/bookings/kurumsal-on-gorusme</div>
  </div>

  <div class="p2-footer">Bu rapor Growtify.ai Kurumsal AI Olgunluk De\u011ferlendirmesi'ne verilen cevaplara dayal\u0131 otomatik bir analizdir. \u0130statistikler ve oranlar test cevaplar\u0131ndan hesaplanm\u0131\u015ft\u0131r. Ki\u015fisel verileriniz 6698 say\u0131l\u0131 KVKK kapsam\u0131nda i\u015flenmekte olup \u00fc\u00e7\u00fcnc\u00fc taraflarla payla\u015f\u0131lmamaktad\u0131r. \u00a9 ${new Date().getFullYear()} Growtify \u2014 growtify.ai</div>
</div>

</body>
</html>`;
}
