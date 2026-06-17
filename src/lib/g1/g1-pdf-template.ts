// G1 / DeepGap — branded PDF report HTML (rendered to A4 by puppeteer via the
// shared generatePdfFromHtml). Mirrors the /test report's brand language: same
// palette (#5d47f0 indigo + #C9FF85 accent), gradient header, score cards, brand
// footer. Content is the G1 synthesis: profile, gap, per-dimension bars, weakest +
// first move, cost-of-inaction, and the G→T before/after on a retake.
import type { G1BeforeAfter, G1Synthesis } from "./types";

const PRIMARY = "#5d47f0";
const PRIMARY_LIGHT = "#9886fe";
const ACCENT = "#C9FF85";
const DARK = "#1a1a2e";
const GRAY = "#64748b";
const GREEN = "#16a34a";
const RED = "#dc2626";

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function deltaChip(delta: number): string {
  const color = delta > 0 ? GREEN : delta < 0 ? RED : GRAY;
  const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "▬";
  const sign = delta > 0 ? "+" : "";
  return `<span style="color:${color};font-weight:700;font-size:10px">${arrow} ${sign}${delta}</span>`;
}

// One dimension row: label, a 0-5 bar with the sector benchmark tick, score + delta.
function dimRow(d: G1Synthesis["dimensions"][number]): string {
  const pct = Math.max(0, Math.min(100, (d.score / 5) * 100));
  const benchPct = Math.max(0, Math.min(100, (d.benchmark / 5) * 100));
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px">
    <div style="width:150px;font-size:11px;color:#334155;font-weight:600">${esc(d.label)}</div>
    <div style="flex:1;position:relative;height:12px;background:#eef0fb;border-radius:6px;overflow:hidden">
      <div style="position:absolute;left:0;top:0;height:100%;width:${pct}%;background:linear-gradient(90deg,${PRIMARY},${PRIMARY_LIGHT});border-radius:6px"></div>
      <div style="position:absolute;left:${benchPct}%;top:-2px;height:16px;width:2px;background:${DARK};opacity:.45"></div>
    </div>
    <div style="width:74px;text-align:right;font-size:11px;color:${GRAY}">
      <b style="color:${DARK}">${d.score}</b>/5 ${deltaChip(d.delta)}
    </div>
  </div>`;
}

export interface G1PdfData {
  name: string;
  sectorLabel: string;
  synth: G1Synthesis;
  beforeAfter?: G1BeforeAfter | null;
}

export function generateG1PdfHtml({ name, sectorLabel, synth, beforeAfter }: G1PdfData): string {
  const now = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const w = synth.weakest;

  const costBlock = synth.cost
    ? `<div style="margin-top:16px;padding:14px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:12px">
        <div style="font-weight:800;color:#9a3412;font-size:12px;margin-bottom:6px">Hareketsizliğin Bedeli</div>
        <div style="font-size:11px;color:#7c2d12;margin-bottom:6px">${esc(synth.cost.intro)}</div>
        <ul style="margin:0;padding-left:16px;color:#7c2d12;font-size:11px;line-height:1.7">
          ${synth.cost.lines.map((l) => `<li>${esc(l)}</li>`).join("")}
        </ul>
        <div style="font-size:10px;color:#9a3412;font-style:italic;margin-top:6px">${esc(synth.cost.closing)}</div>
      </div>`
    : "";

  const beforeAfterBlock = beforeAfter
    ? `<div style="margin-top:16px;padding:14px 16px;background:${PRIMARY}0d;border:1.5px solid ${PRIMARY}33;border-radius:12px">
        <div style="font-weight:800;color:${PRIMARY};font-size:12px;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Önce → Sonra · ${beforeAfter.attempt}. ölçüm</div>
        <div style="display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:8px">
          <div style="text-align:center"><div style="font-size:9px;color:${GRAY}">Önce</div><div style="font-size:20px;font-weight:800;color:${GRAY}">${beforeAfter.before}/5</div></div>
          <div style="font-size:18px;color:#cbd5e1">→</div>
          <div style="text-align:center"><div style="font-size:9px;color:${PRIMARY}">Sonra</div><div style="font-size:20px;font-weight:800;color:${DARK}">${beforeAfter.after}/5</div></div>
          <div style="font-size:14px">${deltaChip(beforeAfter.delta)}</div>
        </div>
      </div>`
    : "";

  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif; color:${DARK}; font-size:12px; line-height:1.5; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .page { width:100%; min-height:1123px; background:white; position:relative; }
  .header { background:linear-gradient(135deg,${PRIMARY} 0%,${PRIMARY_LIGHT} 60%,#7c6cf0 100%); color:white; padding:40px 50px 32px; position:relative; overflow:hidden; }
  .header::before { content:''; position:absolute; top:-60px; right:-60px; width:200px; height:200px; border-radius:50%; background:rgba(255,255,255,.06); }
  .badge { display:inline-block; background:rgba(255,255,255,.15); border-radius:50px; padding:5px 18px; font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px; }
  .title { font-size:30px; font-weight:900; margin-bottom:4px; }
  .subtitle { font-size:13px; opacity:.9; }
  .name-row { margin-top:18px; display:flex; justify-content:space-between; align-items:flex-end; }
  .name { font-size:16px; font-weight:700; }
  .date { font-size:11px; opacity:.8; }
  .body { padding:26px 50px 70px; }
  .cards { display:flex; gap:12px; margin-bottom:22px; }
  .card { flex:1; border-radius:16px; padding:16px; text-align:center; }
  .card-primary { background:linear-gradient(135deg,${PRIMARY}12,${PRIMARY}08); border:1.5px solid ${PRIMARY}25; }
  .card-accent { background:${ACCENT}22; border:1.5px solid ${ACCENT}; }
  .card-neutral { background:#f1f5f9; border:1.5px solid #e2e8f0; }
  .card-val { font-size:26px; font-weight:900; color:${PRIMARY}; }
  .card-label { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:${GRAY}; margin-top:4px; }
  .section-title { font-size:16px; font-weight:800; color:${DARK}; margin:22px 0 4px; }
  .gap { font-size:12px; color:#334155; line-height:1.8; }
  .weak { margin-top:8px; padding:14px 16px; background:#f7f7fb; border-radius:12px; }
  .weak-k { font-size:9px; text-transform:uppercase; letter-spacing:.5px; color:#94a3b8; }
  .footer { position:absolute; bottom:18px; left:50px; right:50px; font-size:8px; color:#94a3b8; text-align:center; line-height:1.6; border-top:1px solid #eef0f5; padding-top:10px; }
</style></head><body>
<div class="page">
  <div class="header">
    <div class="badge">AI Olgunluk Profili</div>
    <div class="title">${esc(synth.levelLabel)}</div>
    <div class="subtitle">Kişisel AI olgunluk değerlendirmen — ${esc(sectorLabel)}</div>
    <div class="name-row">
      <div class="name">${esc(name || "Profesyonel")}</div>
      <div class="date">${now}</div>
    </div>
  </div>
  <div class="body">
    <div class="cards">
      <div class="card card-primary"><div class="card-val">${synth.overall}/5</div><div class="card-label">Genel Skor</div></div>
      <div class="card card-accent"><div class="card-val" style="color:${DARK};font-size:18px;line-height:1.3">${esc(synth.levelLabel)}</div><div class="card-label">Seviyen</div></div>
      <div class="card card-neutral"><div class="card-val" style="color:${GRAY}">${synth.sectorOverallBenchmark}/5</div><div class="card-label">Sektör Ort.</div></div>
    </div>

    <div class="section-title">Senin Gap'in</div>
    <p class="gap">${esc(synth.gapParagraph)}</p>

    ${beforeAfterBlock}

    <div class="section-title">Boyut Boyut Profilin</div>
    <div style="margin-top:6px">${synth.dimensions.map(dimRow).join("")}</div>
    <div style="font-size:9px;color:#94a3b8;margin-top:2px">Dikey çizgi = sektör ortalaması.</div>

    <div class="section-title">En Zayıf Halkan</div>
    <div class="weak">
      <div style="font-weight:800;color:${DARK}">${esc(w.label)} · ${w.score}/5</div>
      <div style="font-size:11px;color:#475569;margin-top:4px;line-height:1.7">${esc(w.means)}</div>
      <div class="weak-k" style="margin-top:10px">İlk Hamlen</div>
      <div style="font-size:11px;color:${DARK};margin-top:2px;line-height:1.7">${esc(w.next)}</div>
    </div>

    ${costBlock}
  </div>
  <div class="footer">Bu rapor Growtify.ai AI Olgunluk değerlendirmesine verilen cevaplara dayalı otomatik bir analizdir. Profesyonel danışmanlık yerine geçmez; sonuçlar bireysel algıya dayalıdır. Kişisel verileriniz KVKK kapsamında işlenmektedir. © ${new Date().getFullYear()} Growtify — growtify.ai · GROWT Method ile AI dönüşümü</div>
</div>
</body></html>`;
}
