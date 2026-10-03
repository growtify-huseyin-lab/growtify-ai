// GHL panelinin (panel.growtify.ai) İngilizce metin kataloğunu indirir.
// Oturum gerekmez: katalog giriş sayfasında da tam yükleniyor.
//
// Kullanım (repo kökünden):
//   npm i --no-save puppeteer-core
//   node scripts/panel-i18n/dump-en-catalog.mjs /tmp/panel-en.new.json
import fs from "fs";
import os from "os";
import path from "path";
import puppeteer from "puppeteer-core";

const out = process.argv[2] || "panel-en.new.json";
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const prof = fs.mkdtempSync(path.join(os.tmpdir(), "panel-cat-"));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, userDataDir: prof, args: ["--no-first-run", "--lang=en-US"] });
try {
  const page = await browser.newPage();
  // Bizim Türkçe katmanımız yüklenmesin: saf İngilizce katalog lazım.
  await page.setRequestInterception(true);
  page.on("request", (r) => (r.url().startsWith("https://growtify.ai/portal/") ? r.abort() : r.continue()));
  await page.goto("https://panel.growtify.ai/login", { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));
  const json = await page.evaluate(() => {
    const app = document.getElementById("__nuxt")?.__vue_app__;
    const prov = app?._context?.provides || {};
    for (const s of Object.getOwnPropertySymbols(prov)) {
      const g = prov[s]?.global;
      if (g && typeof g.getLocaleMessage === "function") return JSON.stringify(g.getLocaleMessage("en"));
    }
    return null;
  });
  if (!json) throw new Error("Panelin i18n kataloğu bulunamadı (GHL yapıyı değiştirmiş olabilir).");
  const cat = JSON.parse(json);
  let n = 0;
  (function count(o) { for (const v of Object.values(o)) typeof v === "object" ? count(v) : n++; })(cat);
  fs.writeFileSync(out, JSON.stringify(cat, null, 1) + "\n");
  console.log(`${n} metin → ${out}`);
} finally {
  await browser.close();
  fs.rmSync(prof, { recursive: true, force: true });
}
