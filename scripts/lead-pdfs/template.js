/**
 * Lead Magnet PDF HTML Template
 *
 * İçerik objesini (content/*.js) alır, marka uyumlu HTML döner.
 * CSS tamamen inline — Puppeteer/Chromium'da render edilir.
 * Renk paleti website ile birebir aynı (#5d47f0, #C9FF85).
 */

const PRIMARY = "#5d47f0"; // Growtify mor
const ACCENT = "#C9FF85"; // Accent (CTA, highlight)
const TEXT = "#1e293b";
const MUTED = "#64748b";
const BG_LIGHT = "#f8fafc";
const BG_CARD = "#f1f5f9";
const BORDER = "#e2e8f0";

function renderTOC(toc) {
  return toc
    .map(
      (item, i) => `
    <div class="toc-row">
      <span class="toc-no">${String(i + 1).padStart(2, "0")}</span>
      <span class="toc-title">${item.title}</span>
      <span class="toc-dots"></span>
      <span class="toc-page">${item.page}</span>
    </div>`
    )
    .join("");
}

function renderTools(tools) {
  return tools.items
    .map(
      (t, i) => `
    <div class="tool-card">
      <div class="tool-header">
        <span class="tool-no">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${t.category}</div>
        </div>
      </div>
      <div class="tool-row"><strong>Ne için:</strong> ${t.whatFor}</div>
      <div class="tool-row"><strong>Fiyat:</strong> ${t.pricing}</div>
      <div class="tool-row sector-example">${t.sectorExample}</div>
      <div class="tool-row try-it"><strong>Hemen dene:</strong> ${t.tryIt}</div>
    </div>`
    )
    .join("");
}

function renderScenarios(scenarios) {
  return scenarios.items
    .map(
      (s) => `
    <div class="scenario-card">
      <div class="scenario-header">
        <span class="scenario-no">${s.number}</span>
        <div>
          <div class="scenario-sector">${s.sector}</div>
          <div class="scenario-problem">${s.problem}</div>
        </div>
      </div>
      <div class="scenario-steps">
        ${s.solution
          .map(
            (step, i) => `
          <div class="step-row">
            <span class="step-no">${i + 1}</span>
            <span class="step-body">${step}</span>
          </div>`
          )
          .join("")}
      </div>
      <div class="scenario-result"><strong>Sonuç:</strong> ${s.result}</div>
    </div>`
    )
    .join("");
}

function renderPlan(plan) {
  return plan.days
    .map(
      (d) => `
    <div class="day-card">
      <div class="day-header">
        <div class="day-label">${d.day}</div>
        <div class="day-meta">${d.label} · ${d.focus}</div>
      </div>
      <ul class="day-tasks">
        ${d.tasks.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    </div>`
    )
    .join("");
}

function renderHTML(content) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>${content.title} — ${content.brand}</title>
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: ${TEXT};
  line-height: 1.6;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.page {
  width: 210mm;
  min-height: 297mm;
  padding: 24mm 22mm;
  position: relative;
  page-break-after: always;
  background: #fff;
}
.page:last-child { page-break-after: auto; }

/* ═══════ KAPAK ═══════ */
.cover {
  padding: 0;
  background: linear-gradient(135deg, ${PRIMARY} 0%, #7c6af5 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover-inner {
  padding: 40mm 22mm;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cover-brand {
  font-size: 14px;
  opacity: 0.85;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12mm;
}
.cover-title {
  font-size: 42px;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 4mm;
}
.cover-subtitle {
  font-size: 32px;
  font-weight: 800;
  color: ${ACCENT};
  margin-bottom: 10mm;
}
.cover-tagline {
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
  max-width: 140mm;
}
.cover-footer {
  padding: 10mm 22mm;
  border-top: 1px solid rgba(255,255,255,0.2);
  font-size: 12px;
  opacity: 0.75;
  display: flex;
  justify-content: space-between;
}

/* ═══════ İÇERİK SAYFALARI ═══════ */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6mm;
  margin-bottom: 10mm;
  border-bottom: 2px solid ${PRIMARY};
}
.page-header .brand {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${PRIMARY};
}
.page-header .section {
  font-size: 11px;
  color: ${MUTED};
}
.page-number {
  position: absolute;
  bottom: 12mm;
  right: 22mm;
  font-size: 10px;
  color: ${MUTED};
}
.page-number-left {
  position: absolute;
  bottom: 12mm;
  left: 22mm;
  font-size: 10px;
  color: ${MUTED};
}

.h1 {
  font-size: 28px;
  font-weight: 800;
  color: ${TEXT};
  margin-bottom: 6mm;
  line-height: 1.2;
}
.h2 {
  font-size: 18px;
  font-weight: 700;
  color: ${PRIMARY};
  margin: 8mm 0 4mm;
}
.body-p {
  font-size: 13px;
  margin-bottom: 4mm;
  color: #334155;
}

.callout {
  background: ${BG_CARD};
  border-left: 4px solid ${PRIMARY};
  padding: 6mm 7mm;
  border-radius: 6px;
  margin: 8mm 0;
}
.callout-heading {
  font-weight: 700;
  color: ${TEXT};
  margin-bottom: 2mm;
  font-size: 13px;
}
.callout-body {
  color: #475569;
  font-size: 12px;
  line-height: 1.65;
}

/* ═══════ İÇİNDEKİLER ═══════ */
.toc-row {
  display: flex;
  align-items: center;
  padding: 4mm 0;
  border-bottom: 1px dashed ${BORDER};
  font-size: 13px;
}
.toc-no {
  font-weight: 800;
  color: ${PRIMARY};
  min-width: 10mm;
}
.toc-title { flex: 1; color: ${TEXT}; }
.toc-dots { flex: 1; border-bottom: 1px dotted ${MUTED}; margin: 0 3mm; }
.toc-page { color: ${MUTED}; font-weight: 600; }

/* ═══════ ARAÇLAR ═══════ */
.tool-card {
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 8px;
  padding: 5mm 6mm;
  margin-bottom: 5mm;
  page-break-inside: avoid;
}
.tool-header {
  display: flex;
  align-items: flex-start;
  gap: 4mm;
  margin-bottom: 3mm;
  padding-bottom: 3mm;
  border-bottom: 1px solid ${BORDER};
}
.tool-no {
  background: ${PRIMARY};
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  padding: 2mm 3mm;
  border-radius: 4px;
  min-width: 10mm;
  text-align: center;
}
.tool-name {
  font-size: 15px;
  font-weight: 800;
  color: ${TEXT};
}
.tool-category {
  font-size: 11px;
  color: ${MUTED};
  text-transform: uppercase;
  letter-spacing: 1px;
}
.tool-row {
  font-size: 11.5px;
  margin-bottom: 2mm;
  color: #334155;
  line-height: 1.55;
}
.tool-row strong { color: ${TEXT}; }
.sector-example {
  background: ${BG_LIGHT};
  padding: 3mm 4mm;
  border-radius: 4px;
  border-left: 3px solid ${ACCENT};
  margin: 2mm 0;
}
.try-it {
  color: ${PRIMARY};
  font-weight: 600;
  font-size: 11px;
}

/* ═══════ SENARYOLAR ═══════ */
.scenario-card {
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 8px;
  padding: 5mm 6mm;
  margin-bottom: 6mm;
  page-break-inside: avoid;
}
.scenario-header {
  display: flex;
  gap: 4mm;
  align-items: flex-start;
  margin-bottom: 4mm;
}
.scenario-no {
  font-size: 26px;
  font-weight: 900;
  color: ${PRIMARY};
  line-height: 1;
  min-width: 14mm;
}
.scenario-sector {
  font-size: 14px;
  font-weight: 800;
  color: ${TEXT};
  margin-bottom: 1mm;
}
.scenario-problem {
  font-size: 11.5px;
  color: ${MUTED};
  line-height: 1.55;
  font-style: italic;
}
.scenario-steps { margin: 3mm 0; }
.step-row {
  display: flex;
  gap: 3mm;
  margin-bottom: 2.5mm;
  align-items: flex-start;
}
.step-no {
  background: ${BG_CARD};
  color: ${PRIMARY};
  font-weight: 800;
  font-size: 11px;
  padding: 1mm 2mm;
  border-radius: 3px;
  min-width: 6mm;
  text-align: center;
}
.step-body {
  font-size: 11.5px;
  color: #334155;
  line-height: 1.55;
  flex: 1;
}
.scenario-result {
  background: ${ACCENT};
  color: ${TEXT};
  padding: 3mm 4mm;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 600;
  margin-top: 3mm;
}

/* ═══════ 7 GÜN PLAN ═══════ */
.day-card {
  background: #fff;
  border: 1px solid ${BORDER};
  border-radius: 6px;
  padding: 4mm 5mm;
  margin-bottom: 4mm;
  page-break-inside: avoid;
}
.day-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 2mm;
  margin-bottom: 2mm;
  border-bottom: 1px solid ${BORDER};
}
.day-label {
  font-size: 14px;
  font-weight: 800;
  color: ${PRIMARY};
}
.day-meta {
  font-size: 10.5px;
  color: ${MUTED};
  text-transform: uppercase;
  letter-spacing: 1px;
}
.day-tasks {
  padding-left: 5mm;
}
.day-tasks li {
  font-size: 11.5px;
  color: #334155;
  margin-bottom: 1.5mm;
  line-height: 1.55;
}

/* ═══════ CTA ═══════ */
.cta-page {
  background: linear-gradient(135deg, ${PRIMARY} 0%, #7c6af5 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cta-heading {
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 6mm;
  color: #fff;
}
.cta-body {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 4mm;
  color: rgba(255,255,255,0.92);
}
.cta-offer {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 10px;
  padding: 8mm;
  margin: 8mm 0;
}
.cta-offer-heading {
  font-size: 18px;
  font-weight: 800;
  color: ${ACCENT};
  margin-bottom: 3mm;
}
.cta-offer-desc {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 6mm;
  color: rgba(255,255,255,0.9);
}
.cta-button {
  display: inline-block;
  background: ${ACCENT};
  color: ${TEXT};
  padding: 4mm 8mm;
  border-radius: 6px;
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
}
.cta-url {
  display: block;
  margin-top: 3mm;
  font-size: 11px;
  color: rgba(255,255,255,0.7);
  font-family: 'Courier New', monospace;
}
.cta-closing {
  font-size: 12px;
  line-height: 1.65;
  color: rgba(255,255,255,0.85);
  margin-top: 8mm;
  padding-top: 6mm;
  border-top: 1px solid rgba(255,255,255,0.2);
}
.cta-signature {
  margin-top: 4mm;
  font-weight: 700;
  color: #fff;
}
</style>
</head>
<body>

<!-- PAGE 1: KAPAK -->
<div class="page cover">
  <div class="cover-inner">
    <div class="cover-brand">${content.brand.toUpperCase()}</div>
    <div class="cover-title">${content.title}</div>
    <div class="cover-subtitle">${content.subtitle}</div>
    <div class="cover-tagline">${content.tagline}</div>
  </div>
  <div class="cover-footer">
    <span>${content.author}</span>
    <span>${content.date}</span>
  </div>
</div>

<!-- PAGE 2: GİRİŞ -->
<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Giriş</span>
  </div>
  <h1 class="h1">${content.intro.heading}</h1>
  ${content.intro.body.map((p) => `<p class="body-p">${p}</p>`).join("")}
  <div class="callout">
    <div class="callout-heading">${content.intro.callout.heading}</div>
    <div class="callout-body">${content.intro.callout.body}</div>
  </div>
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">2</div>
</div>

<!-- PAGE 3: İÇİNDEKİLER -->
<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">İçindekiler</span>
  </div>
  <h1 class="h1">İçindekiler</h1>
  <div style="margin-top:10mm;">
    ${renderTOC(content.toc)}
  </div>
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">3</div>
</div>

<!-- PAGES 4-5: 5 AI ARACI -->
<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 1 · 5 AI Aracı</span>
  </div>
  <h1 class="h1">${content.tools.heading}</h1>
  <p class="body-p">${content.tools.intro}</p>
  ${renderTools(content.tools).split("</div>\n    <div class=\"tool-card\">").slice(0, 3).join("</div>\n    <div class=\"tool-card\">")}${content.tools.items.slice(0, 3).length === 3 ? "</div>" : ""}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">4</div>
</div>

<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 1 · 5 AI Aracı (devam)</span>
  </div>
  ${(function() {
    const remaining = content.tools.items.slice(3);
    return remaining
      .map(
        (t, i) => `
    <div class="tool-card">
      <div class="tool-header">
        <span class="tool-no">${String(i + 4).padStart(2, "0")}</span>
        <div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${t.category}</div>
        </div>
      </div>
      <div class="tool-row"><strong>Ne için:</strong> ${t.whatFor}</div>
      <div class="tool-row"><strong>Fiyat:</strong> ${t.pricing}</div>
      <div class="tool-row sector-example">${t.sectorExample}</div>
      <div class="tool-row try-it"><strong>Hemen dene:</strong> ${t.tryIt}</div>
    </div>`
      )
      .join("");
  })()}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">5</div>
</div>

<!-- PAGES 6-7: SENARYOLAR -->
<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 2 · Uygulama Senaryoları</span>
  </div>
  <h1 class="h1">${content.scenarios.heading}</h1>
  <p class="body-p">${content.scenarios.intro}</p>
  ${(function() {
    return content.scenarios.items
      .slice(0, 2)
      .map(
        (s) => `
    <div class="scenario-card">
      <div class="scenario-header">
        <span class="scenario-no">${s.number}</span>
        <div>
          <div class="scenario-sector">${s.sector}</div>
          <div class="scenario-problem">${s.problem}</div>
        </div>
      </div>
      <div class="scenario-steps">
        ${s.solution
          .map(
            (step, i) => `
          <div class="step-row">
            <span class="step-no">${i + 1}</span>
            <span class="step-body">${step}</span>
          </div>`
          )
          .join("")}
      </div>
      <div class="scenario-result"><strong>Sonuç:</strong> ${s.result}</div>
    </div>`
      )
      .join("");
  })()}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">6</div>
</div>

<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 2 · Uygulama Senaryoları (devam)</span>
  </div>
  ${(function() {
    return content.scenarios.items
      .slice(2)
      .map(
        (s) => `
    <div class="scenario-card">
      <div class="scenario-header">
        <span class="scenario-no">${s.number}</span>
        <div>
          <div class="scenario-sector">${s.sector}</div>
          <div class="scenario-problem">${s.problem}</div>
        </div>
      </div>
      <div class="scenario-steps">
        ${s.solution
          .map(
            (step, i) => `
          <div class="step-row">
            <span class="step-no">${i + 1}</span>
            <span class="step-body">${step}</span>
          </div>`
          )
          .join("")}
      </div>
      <div class="scenario-result"><strong>Sonuç:</strong> ${s.result}</div>
    </div>`
      )
      .join("");
  })()}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">7</div>
</div>

<!-- PAGES 8-9: 7 GÜN PLAN -->
<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 3 · 7 Günlük Plan</span>
  </div>
  <h1 class="h1">${content.plan.heading}</h1>
  <p class="body-p">${content.plan.intro}</p>
  ${(function() {
    return content.plan.days
      .slice(0, 4)
      .map(
        (d) => `
    <div class="day-card">
      <div class="day-header">
        <div class="day-label">${d.day}</div>
        <div class="day-meta">${d.label} · ${d.focus}</div>
      </div>
      <ul class="day-tasks">
        ${d.tasks.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    </div>`
      )
      .join("");
  })()}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">8</div>
</div>

<div class="page">
  <div class="page-header">
    <span class="brand">${content.brand.toUpperCase()}</span>
    <span class="section">Bölüm 3 · 7 Günlük Plan (devam)</span>
  </div>
  ${(function() {
    return content.plan.days
      .slice(4)
      .map(
        (d) => `
    <div class="day-card">
      <div class="day-header">
        <div class="day-label">${d.day}</div>
        <div class="day-meta">${d.label} · ${d.focus}</div>
      </div>
      <ul class="day-tasks">
        ${d.tasks.map((t) => `<li>${t}</li>`).join("")}
      </ul>
    </div>`
      )
      .join("");
  })()}
  <div class="page-number-left">${content.brand} · ${content.date}</div>
  <div class="page-number">9</div>
</div>

<!-- PAGE 10: CTA -->
<div class="page cta-page">
  <h1 class="cta-heading">${content.cta.heading}</h1>
  ${content.cta.body.map((p) => `<p class="cta-body">${p}</p>`).join("")}
  <div class="cta-offer">
    <div class="cta-offer-heading">${content.cta.offer.heading}</div>
    <div class="cta-offer-desc">${content.cta.offer.description}</div>
    <a href="${content.cta.offer.url}" class="cta-button">${content.cta.offer.buttonText}</a>
    <div class="cta-url">${content.cta.offer.url}</div>
  </div>
  <div class="cta-closing">${content.cta.closing}</div>
  <div class="cta-signature">— ${content.cta.signature}</div>
</div>

</body>
</html>`;
}

module.exports = { renderHTML };
