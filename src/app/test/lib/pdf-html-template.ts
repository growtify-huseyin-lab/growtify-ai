// Growtify AI — HTML PDF Template (Puppeteer)
// 2 pages, premium design with infographics and visual elements.

import type { QuizState, Persona } from "./types";

const PRIMARY = "#5d47f0";
const PRIMARY_LIGHT = "#9886fe";
const ACCENT = "#C9FF85";
const DARK = "#1a1a2e";
const GRAY = "#64748b";
const GREEN = "#22C55E";
const RED = "#EF4444";
const YELLOW = "#F59E0B";
const BLUE = "#3B82F6";

const PAIN_LABELS: Record<string, string> = {
  q_time: "Zaman Yönetimi", q_procrastination: "Erteleme", q_focus: "Odaklanma",
  q_comparison: "Karşılaştırma", q_fomo: "Kaçırma Korkusu", q_progress: "İlerleme Hissi",
  q_uncertainty: "Belirsizlik", q_overwhelm: "İş Yükü", q_decision: "Karar Verememe",
  q_fear: "Başarısızlık Korkusu", q_selfworth: "Öz Değer", q_social: "Sosyal Baskı",
  q_overthink: "Aşırı Düşünme", q_motivation: "Motivasyon",
};

// Inline SVG icons (Puppeteer on Vercel has no emoji font — SVGs render perfectly)
function svg(path: string, color: string, size = 18): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><${path}/></svg>`;
}
const ICONS = {
  search: (c: string, s?: number) => svg('circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"', c, s),
  bolt: (c: string, s?: number) => svg('polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"', c, s),
  wrench: (c: string, s?: number) => svg('path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"', c, s),
  rocket: (c: string, s?: number) => svg('path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3m3 3a22 22 0 0 0 4-11 22 22 0 0 0-11 4l7 7z"', c, s),
  building: (c: string, s?: number) => svg('rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01"', c, s),
  target: (c: string, s?: number) => svg('circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"', c, s),
  clock: (c: string, s?: number) => svg('circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"', c, s),
  clipboard: (c: string, s?: number) => svg('path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"', c, s),
  chart: (c: string, s?: number) => svg('line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"', c, s),
  lightbulb: (c: string, s?: number) => svg('line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"', c, s),
};

const PERSONA_INFO: Record<Persona, { icon: string; iconBg: string; subtitle: string; desc: string }> = {
  "Meraklı Gözlemci": {
    icon: ICONS.search("#fff"), iconBg: "#22C55E",
    subtitle: "Merak var, adım henüz yok — en güçlü başlangıç noktası",
    desc: "AI dünyasına ilgiyle bakıyorsun. GROWT Method ile neredesin ve hangi küçük adımla başlamalısın sorusunu birlikte cevaplayacağız.",
  },
  "Aktif Deneyici": {
    icon: ICONS.bolt("#fff"), iconBg: "#F59E0B",
    subtitle: "Deneme var, sistem yok — doğru yol haritasına ihtiyacın var",
    desc: "Bazı araçları denedin ama sonuçlar dağınık. Doğru araç, doğru sıra ve net bir plan ile deneme-yanılma dönemini bitireceksin.",
  },
  Uygulamacı: {
    icon: ICONS.wrench("#fff"), iconBg: "#2563EB",
    subtitle: "Kullanıyorsun ama parçalı — sisteme dönüştürme vakti",
    desc: "AI araçlarıyla çalışıyorsun ama bütünleşik değil. Dağınık uygulamaları sistematik bir yapıya dönüştürerek gerçek verimlilik kazanacaksın.",
  },
  "AI Lideri": {
    icon: ICONS.rocket("#fff"), iconBg: "#7C3AED",
    subtitle: "İleri düzeydesin — ölçülebilir sonuçlara bağlama vakti",
    desc: "AI'ı aktif kullanıyorsun. Şimdi mevcut kazanımlarını sistematik hale getirip ölçülebilir iş büyütme sonuçlarına dönüştüreceksin.",
  },
};

const PAIN_LEVEL_TR: Record<string, { label: string; color: string }> = {
  low: { label: "Düşük", color: GREEN },
  medium: { label: "Orta", color: YELLOW },
  high: { label: "Yüksek", color: RED },
};

const SECTOR_LABELS: Record<string, string> = {
  saglik: "Sağlık", hukuk: "Hukuk", guzellik: "Güzellik & Estetik", emlak: "Emlak",
  e_ticaret: "E-Ticaret", dis: "Diş Hekimliği", muhasebe: "Muhasebe", eczacilik: "Eczacılık",
  turizm: "Turizm", mimarlik: "Mimarlık", egitim: "Eğitim", fitness: "Fitness",
  sigorta: "Sigorta", restoran: "Restoran", veteriner: "Veteriner", diger: "Diğer",
};

const AREA_LABELS: Record<string, string> = {
  icerik: "İçerik Üretimi", musteri: "Müşteri İletişimi", satis: "Satış Süreçleri",
  analiz: "Veri Analizi", egitim: "Danışan Materyalleri", tasarim: "Tasarım & Görseller",
  operasyon: "Operasyonel Otomasyon", finans: "Finans & Muhasebe",
};

const HABIT_LABELS: Record<string, string> = {
  son_dakika: "Son Dakikaya Bırakma", telefon: "Sürekli Telefon Kontrolü",
  multitasking: "Çoklu Görev Yapma", mukemmeliyetcilik: "Aşırı Mükemmeliyetçilik",
  oz_sabotaj: "Öz Sabotaj",
};

const GOAL_LABELS: Record<string, string> = {
  yeni_gelir: "Yeni gelir kapısı açmak",
  zaman: "Haftada 10+ saat kazanmak",
  musteri: "Daha fazla müşteri çekmek",
  otomasyon: "İşleri otomatikleştirmek",
  bilgi: "AI'da uzmanlaşmak",
};

interface PainItem { key: string; label: string; value: number; max: number; pct: number; }

function getPainScores(state: QuizState): PainItem[] {
  return [
    { key: "q_time", value: state.q_time, max: 5 },
    { key: "q_procrastination", value: state.q_procrastination, max: 5 },
    { key: "q_focus", value: state.q_focus, max: 5 },
    { key: "q_comparison", value: state.q_comparison, max: 5 },
    { key: "q_fomo", value: state.q_fomo, max: 5 },
    { key: "q_progress", value: state.q_progress, max: 10 },
    { key: "q_uncertainty", value: state.q_uncertainty, max: 10 },
    { key: "q_overwhelm", value: state.q_overwhelm, max: 10 },
    { key: "q_decision", value: state.q_decision, max: 10 },
    { key: "q_fear", value: state.q_fear, max: 10 },
    { key: "q_selfworth", value: state.q_selfworth, max: 10 },
    { key: "q_social", value: state.q_social, max: 10 },
    { key: "q_overthink", value: state.q_overthink, max: 10 },
    { key: "q_motivation", value: state.q_motivation, max: 10 },
  ].map((item) => ({
    ...item,
    label: PAIN_LABELS[item.key] ?? item.key,
    pct: Math.round((item.value / item.max) * 100),
  }));
}

function barColor(pct: number): string {
  if (pct <= 33) return GREEN;
  if (pct <= 66) return YELLOW;
  return RED;
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generatePdfHtml(state: QuizState): string {
  const now = new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  const painScores = getPainScores(state);
  const top3 = [...painScores].sort((a, b) => b.pct - a.pct).slice(0, 3);
  const bottom3 = [...painScores].sort((a, b) => a.pct - b.pct).slice(0, 3);
  const persona = PERSONA_INFO[state.persona] ?? PERSONA_INFO["Meraklı Gözlemci"];
  const painLevel = PAIN_LEVEL_TR[state.painLevel] ?? PAIN_LEVEL_TR.medium;
  // Max theoretical score ~136 (all max values with weights). Normalize to 0-100%.
  const maxScore = 5 * 6 + 10 * 8; // 30 + 80 = 110 (rough practical max)
  const scorePct = Math.min(100, Math.round((state.totalScore / maxScore) * 100));

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<style>
  /* System font stack — no external fetch, instant render */
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; color: ${DARK}; font-size: 12px; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  .page { width: 210mm; min-height: 297mm; position: relative; overflow: hidden; page-break-after: always; }
  .page:last-child { page-break-after: auto; }

  /* ===== PAGE 1 ===== */
  .p1 { background: white; }
  .p1-header {
    background: linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 60%, #7c6cf0 100%);
    color: white; padding: 44px 50px 36px; position: relative; overflow: hidden;
  }
  .p1-header::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; border-radius: 50%; background: rgba(255,255,255,0.06); }
  .p1-header::after { content: ''; position: absolute; bottom: -40px; left: 30%; width: 160px; height: 160px; border-radius: 50%; background: rgba(255,255,255,0.04); }
  .p1-badge { display: inline-block; background: rgba(255,255,255,0.15); border-radius: 50px; padding: 5px 18px; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
  .p1-title { font-size: 30px; font-weight: 900; margin-bottom: 6px; }
  .p1-subtitle { font-size: 14px; opacity: 0.8; }
  .p1-name-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 20px; }
  .p1-name { font-size: 24px; font-weight: 800; }
  .p1-date { font-size: 11px; opacity: 0.6; }

  .p1-body { padding: 30px 50px 40px; }

  /* Score cards */
  .score-row { display: flex; gap: 16px; margin-bottom: 28px; }
  .score-card { flex: 1; border-radius: 16px; padding: 20px; text-align: center; position: relative; overflow: hidden; }
  .score-card-primary { background: linear-gradient(135deg, ${PRIMARY}12, ${PRIMARY}08); border: 1.5px solid ${PRIMARY}25; }
  .score-card-accent { background: ${ACCENT}15; border: 1.5px solid ${ACCENT}60; }
  .score-card-neutral { background: #f1f5f9; border: 1.5px solid #e2e8f0; }
  .score-val { font-size: 36px; font-weight: 900; line-height: 1; }
  .score-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${GRAY}; margin-top: 6px; }

  /* Persona card */
  .persona-card {
    background: linear-gradient(135deg, ${PRIMARY}08, ${PRIMARY}04);
    border: 1.5px solid ${PRIMARY}20; border-radius: 20px;
    padding: 28px; margin-bottom: 24px; position: relative;
  }
  .persona-emoji { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900; color: white; margin-bottom: 10px; }
  .persona-name { font-size: 22px; font-weight: 900; color: ${PRIMARY}; margin-bottom: 4px; }
  .persona-sub { font-size: 12px; color: ${GRAY}; font-style: italic; margin-bottom: 14px; }
  .persona-desc { font-size: 12px; color: #475569; line-height: 1.7; }

  /* Details grid */
  .details-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; }
  .detail-box { background: #f8fafc; border-radius: 12px; padding: 14px; }
  .detail-icon { font-size: 18px; margin-bottom: 4px; }
  .detail-label { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${GRAY}; }
  .detail-val { font-size: 12px; font-weight: 700; color: ${DARK}; margin-top: 2px; }

  .p1-footer { position: absolute; bottom: 12px; left: 40px; right: 40px; font-size: 7px; color: #94a3b8; text-align: center; line-height: 1.5; }

  /* ===== PAGE 2 ===== */
  .p2 { background: white; padding: 40px 50px; }
  .p2-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 2px solid #f1f5f9; }
  .p2-brand { font-size: 14px; font-weight: 800; color: ${PRIMARY}; }
  .p2-pagetitle { font-size: 10px; color: ${GRAY}; }

  .section-title { font-size: 18px; font-weight: 800; color: ${DARK}; margin-bottom: 4px; }
  .section-sub { font-size: 11px; color: ${GRAY}; margin-bottom: 18px; }

  /* Pain bars */
  .pain-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; margin-bottom: 24px; }
  .pain-item { display: flex; align-items: center; gap: 8px; }
  .pain-label { width: 90px; font-size: 9px; font-weight: 600; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pain-track { flex: 1; height: 10px; background: #f1f5f9; border-radius: 5px; overflow: hidden; }
  .pain-fill { height: 10px; border-radius: 5px; }
  .pain-val { width: 32px; font-size: 10px; font-weight: 700; color: ${GRAY}; text-align: right; }

  /* Insight cards */
  .insights-row { display: flex; gap: 12px; margin-bottom: 24px; }
  .insight-card { flex: 1; border-radius: 14px; padding: 18px; }
  .insight-red { background: #fef2f2; border: 1px solid #fecaca; }
  .insight-green { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .insight-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .insight-title-red { color: ${RED}; }
  .insight-title-green { color: ${GREEN}; }
  .insight-item { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .insight-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .insight-text { font-size: 11px; font-weight: 600; color: #334155; }
  .insight-pct { font-size: 10px; color: ${GRAY}; }

  /* Recommendations */
  .rec-section { margin-bottom: 20px; }
  .rec-box { display: flex; gap: 14px; align-items: flex-start; background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 10px; }
  .rec-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .rec-icon-purple { background: ${PRIMARY}15; }
  .rec-icon-green { background: ${GREEN}15; }
  .rec-icon-yellow { background: ${YELLOW}15; }
  .rec-title { font-size: 12px; font-weight: 700; color: ${DARK}; margin-bottom: 2px; }
  .rec-body { font-size: 11px; color: ${GRAY}; line-height: 1.6; }

  /* CTA */
  .cta-bar {
    background: linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT});
    border-radius: 16px; padding: 20px 24px;
    display: flex; justify-content: space-between; align-items: center; color: white;
    margin-top: 16px; gap: 16px; flex-wrap: nowrap;
  }
  .cta-left { flex-shrink: 1; min-width: 0; }
  .cta-name { font-size: 15px; font-weight: 800; }
  .cta-sub { font-size: 10px; opacity: 0.8; margin-top: 2px; }
  .cta-right { flex-shrink: 0; text-align: center; }
  .cta-url { font-size: 14px; font-weight: 700; background: rgba(255,255,255,0.2); border-radius: 24px; padding: 8px 20px; }

  .p2-footer { position: absolute; bottom: 12px; left: 40px; right: 40px; font-size: 7px; color: #94a3b8; text-align: center; line-height: 1.5; }
</style>
</head>
<body>

<!-- PAGE 1: COVER + SCORE + PERSONA -->
<div class="page p1">
  <div class="p1-header">
    <div class="p1-badge">Kişisel Rapor</div>
    <div class="p1-title">AI Dijital Olgunluk Raporu</div>
    <div class="p1-subtitle">Kişisel değerlendirme sonuçların</div>
    <div class="p1-name-row">
      <div class="p1-name">${esc(state.firstName || "Profesyonel")}</div>
      <div class="p1-date">${now}</div>
    </div>
  </div>

  <div class="p1-body">
    <!-- Score Cards -->
    <div class="score-row">
      <div class="score-card score-card-primary" style="flex:1.5">
        <div class="score-val" style="color:${PRIMARY}">%${scorePct}</div>
        <div class="score-label">AI Olgunluk Seviyesi</div>
      </div>
      <div class="score-card score-card-neutral">
        <div class="score-val" style="font-size:22px;"><div style="width:40px;height:40px;border-radius:10px;background:${persona.iconBg};display:flex;align-items:center;justify-content:center;margin:0 auto;">${persona.icon}</div></div>
        <div style="font-size:14px; font-weight:800; color:${DARK}; margin-top:4px;">${esc(state.persona)}</div>
        <div class="score-label">Profil</div>
      </div>
    </div>

    <!-- Persona Card -->
    <div class="persona-card">
      <div class="persona-name">${esc(state.persona)}</div>
      <div class="persona-sub">${esc(persona.subtitle)}</div>
      <div class="persona-desc">${esc(persona.desc)}</div>
    </div>

    <!-- Detail Grid -->
    <div class="details-grid">
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${PRIMARY}15;display:flex;align-items:center;justify-content:center;">${ICONS.building(PRIMARY, 14)}</div>
        <div class="detail-label">Sektör</div>
        <div class="detail-val">${esc(SECTOR_LABELS[state.sector ?? ""] ?? state.sector ?? "Belirtilmedi")}</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${YELLOW}15;display:flex;align-items:center;justify-content:center;">${ICONS.target(YELLOW, 14)}</div>
        <div class="detail-label">Hedef</div>
        <div class="detail-val">${esc(GOAL_LABELS[state.q_goal ?? ""] ?? "Belirtilmedi")}</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:${GREEN}15;display:flex;align-items:center;justify-content:center;">${ICONS.clock(GREEN, 14)}</div>
        <div class="detail-label">Günlük</div>
        <div class="detail-val">${state.commitment ?? 30} dk</div>
      </div>
      <div class="detail-box">
        <div class="detail-icon" style="width:28px;height:28px;border-radius:8px;background:#7C3AED15;display:flex;align-items:center;justify-content:center;">${ICONS.clipboard("#7C3AED", 14)}</div>
        <div class="detail-label">Alan Sayısı</div>
        <div class="detail-val">${state.q_areas?.length ?? 0} alan</div>
      </div>
    </div>

    <!-- İlgi Alanları -->
    ${state.q_areas?.length ? `
    <div style="margin-top:24px;">
      <div style="font-size:13px; font-weight:700; color:${DARK}; margin-bottom:10px;">Yardım almak istediğin alanlar</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${state.q_areas.map((area) => `<div style="background:${PRIMARY}10; border:1px solid ${PRIMARY}25; border-radius:20px; padding:6px 16px; font-size:11px; font-weight:600; color:${PRIMARY};">${esc(AREA_LABELS[area] ?? area)}</div>`).join("")}
      </div>
    </div>` : ""}

    <!-- Farkında olunacak alışkanlıklar -->
    ${state.q_habits?.length ? `
    <div style="margin-top:20px;">
      <div style="font-size:13px; font-weight:700; color:${DARK}; margin-bottom:10px;">Farkında olman gereken alışkanlıklar</div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">
        ${state.q_habits.map((habit) => `<div style="background:#fef2f2; border:1px solid #fecaca; border-radius:20px; padding:6px 16px; font-size:11px; font-weight:600; color:${RED};">${esc(HABIT_LABELS[habit] ?? habit)}</div>`).join("")}
      </div>
    </div>` : ""}

    <!-- Motivasyon mesajı -->
    <div style="margin-top:28px; background:linear-gradient(135deg, ${ACCENT}20, ${ACCENT}08); border:1.5px solid ${ACCENT}50; border-radius:16px; padding:20px;">
      <div style="width:32px;height:32px;border-radius:8px;background:${ACCENT}30;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">${ICONS.lightbulb(DARK, 16)}</div>
      <div style="font-size:13px; font-weight:700; color:${DARK}; margin-bottom:6px;">Unutma</div>
      <div style="font-size:12px; color:#475569; line-height:1.7;">Doğru zamanda doğru adımı atmak, her şeyi bilmekten daha önemli. Bu rapor senin başlangıç noktanı gösteriyor — gerisi sana bağlı. Günde ${state.commitment ?? 30} dakika bile fark yaratır.</div>
    </div>
  </div>

  <div class="p1-footer">Bu rapor Growtify.ai AI Dijital Olgunluk Testi'ne verilen cevaplara dayalı otomatik bir değerlendirmedir. Profesyonel, hukuki, mali veya tıbbi danışmanlık niteliği taşımaz ve yerine geçmez. Sonuçlar bireysel algıya dayalıdır, nesnel bir ölçüm değildir. Raporda yer alan öneriler genel bilgi amaçlıdır. Kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmektedir. © ${new Date().getFullYear()} Growtify — growtify.ai</div>
</div>

<!-- PAGE 2: ANALYSIS + RECOMMENDATIONS -->
<div class="page p2" style="position:relative;">
  <div class="p2-header">
    <div class="p2-brand">Growtify.ai</div>
    <div class="p2-pagetitle">${esc(state.firstName)} — Detaylı Analiz</div>
  </div>

  <div class="section-title">14 Alanda Değerlendirme</div>
  <div class="section-sub">Yüksek değerler daha fazla zorluk yaşadığın alanları gösteriyor</div>

  <div class="pain-grid">
    ${painScores.map((item) => `
      <div class="pain-item">
        <div class="pain-label">${esc(item.label)}</div>
        <div class="pain-track"><div class="pain-fill" style="width:${item.pct}%;background:${barColor(item.pct)}"></div></div>
        <div class="pain-val">${item.value}/${item.max}</div>
      </div>`).join("")}
  </div>

  <!-- Insights: Top 3 vs Bottom 3 -->
  <div class="insights-row">
    <div class="insight-card insight-red">
      <div class="insight-title insight-title-red">En Yüksek Zorluk</div>
      ${top3.map((item) => `
        <div class="insight-item">
          <div class="insight-dot" style="background:${RED}"></div>
          <div class="insight-text">${esc(item.label)}</div>
          <div class="insight-pct">%${item.pct}</div>
        </div>`).join("")}
    </div>
    <div class="insight-card insight-green">
      <div class="insight-title insight-title-green">En Güçlü Alanlar</div>
      ${bottom3.map((item) => `
        <div class="insight-item">
          <div class="insight-dot" style="background:${GREEN}"></div>
          <div class="insight-text">${esc(item.label)}</div>
          <div class="insight-pct">%${item.pct}</div>
        </div>`).join("")}
    </div>
  </div>

  <!-- Recommendations -->
  <div class="section-title" style="font-size:15px;">Sana Özel Öneriler</div>
  <div class="rec-section">
    <div class="rec-box">
      <div class="rec-icon rec-icon-purple" style="display:flex;align-items:center;justify-content:center;">${ICONS.target(PRIMARY)}</div>
      <div>
        <div class="rec-title">Günlük ${state.commitment ?? 30} Dakika Ayır</div>
        <div class="rec-body">GROWT Method ile yapılandırılmış şekilde ilerle. İlk adım: mevcut durumunu anlamak ve doğru AI araçlarını belirlemek.</div>
      </div>
    </div>
    <div class="rec-box">
      <div class="rec-icon rec-icon-green" style="display:flex;align-items:center;justify-content:center;">${ICONS.lightbulb(GREEN)}</div>
      <div>
        <div class="rec-title">Farkında Ol</div>
        <div class="rec-body">${state.q_habits?.length
          ? `Kendi belirlediğin alışkanlıklar: ${esc(state.q_habits.join(", "))}. Farkındalık ilerlemenin ilk adımı.`
          : "Küçük adımlarla başla. Mükemmel planı beklemek yerine bugün bir şey dene."}</div>
      </div>
    </div>
    <div class="rec-box">
      <div class="rec-icon rec-icon-yellow" style="display:flex;align-items:center;justify-content:center;">${ICONS.chart(YELLOW)}</div>
      <div>
        <div class="rec-title">Ölçmeye Başla</div>
        <div class="rec-body">Haftada kazandığın zamanı, tamamladığın görevleri ve AI ile ürettiğin çıktıları takip et. Ölçemediğin şeyi iyileştiremezsin.</div>
      </div>
    </div>
  </div>

  <!-- CTA Bar -->
  <div class="cta-bar" style="flex-direction:column; text-align:center;">
    <div class="cta-name">GROWT Programı</div>
    <div class="cta-sub">5 seviye · 26 modül · Kendi hızında ilerle</div>
    <a href="https://growtify.ai/test" style="background:white; color:${PRIMARY}; font-size:13px; font-weight:800; border-radius:24px; padding:10px 32px; margin-top:12px; display:inline-block; text-decoration:none;">Hemen Başla &rarr;</a>
    <div style="font-size:10px; opacity:0.5; margin-top:6px;">growtify.ai</div>
  </div>

  <div class="p2-footer">Bu rapor Growtify.ai AI Dijital Olgunluk Testi'ne verilen cevaplara dayalı otomatik bir değerlendirmedir. Profesyonel, hukuki, mali veya tıbbi danışmanlık niteliği taşımaz ve yerine geçmez. Sonuçlar bireysel algıya dayalıdır, nesnel bir ölçüm değildir. İstatistikler ve oranlar test cevaplarından hesaplanmıştır. Kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmekte olup üçüncü taraflarla paylaşılmamaktadır. © ${new Date().getFullYear()} Growtify — growtify.ai</div>
</div>

</body>
</html>`;
}
