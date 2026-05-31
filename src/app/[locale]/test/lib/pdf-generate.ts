// Growtify AI — PDF Generation via puppeteer-core + @sparticuz/chromium
// Vercel serverless compatible. Singleton browser + retry.

import chromium from "@sparticuz/chromium-min";
import puppeteerCore, { type Browser } from "puppeteer-core";

// Remote brotli pack — chromium-min ships NO binary; it downloads + extracts this at
// runtime (cached in /tmp per warm Lambda). This makes PDF generation INDEPENDENT of
// Next/Vercel/Turbopack bundling+tracing (which silently dropped the bundled binary →
// 'bin does not exist' → PDF fail → report email never sent).
// Version MUST match puppeteer-core's Chrome (143). Self-host on R2/CDN for production
// hardening (avoids GitHub release rate-limits at cold start).
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";
import { generatePdfHtml } from "./pdf-html-template";
import { generatePdfHtml as generatePdfHtmlEn } from "./pdf-html-template-en";
import type { QuizState } from "./types";

/* -------------------------------------------------------------------------- */
/*  Singleton Browser                                                         */
/* -------------------------------------------------------------------------- */

let browserInstance: Browser | null = null;
let launching = false;

async function getBrowser(): Promise<Browser> {
  // Reuse if alive
  if (browserInstance) {
    try {
      await browserInstance.version();
      return browserInstance;
    } catch {
      browserInstance = null;
    }
  }

  // Prevent concurrent launches
  if (launching) {
    await new Promise((r) => setTimeout(r, 1000));
    if (browserInstance) return browserInstance;
  }

  launching = true;
  try {
    // Disable WebGL to reduce binary size requirements
    chromium.setGraphicsMode = false;
    const executablePath = await chromium.executablePath(CHROMIUM_PACK_URL);
    console.log("[pdf] chromium executablePath:", executablePath);

    browserInstance = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath,
      headless: true,
    });

    browserInstance.on("disconnected", () => {
      browserInstance = null;
    });

    return browserInstance;
  } finally {
    launching = false;
  }
}

/** Kill the browser (for cleanup or retry). */
async function killBrowser(): Promise<void> {
  if (browserInstance) {
    try {
      await browserInstance.close();
    } catch {
      // ignore
    }
    browserInstance = null;
  }
}

/* -------------------------------------------------------------------------- */
/*  PDF Generation with Retry                                                 */
/* -------------------------------------------------------------------------- */

const MAX_RETRIES = 2;
const PAGE_TIMEOUT = 60000;

/**
 * Generate PDF with retry. If first attempt fails (timeout, crash),
 * kills browser and retries with a fresh instance.
 */
export async function generateQuizPdf(state: QuizState, couponCode?: string, locale?: string): Promise<Buffer> {
  const html = (locale === "en" ? generatePdfHtmlEn : generatePdfHtml)(state, couponCode);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await renderPdf(html);
    } catch (err) {
      console.error(
        `[pdf] attempt ${attempt}/${MAX_RETRIES} failed:`,
        (err as Error).message,
      );
      await killBrowser();
      if (attempt === MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  throw new Error("PDF generation failed after retries");
}

async function renderPdf(html: string): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  page.setDefaultTimeout(PAGE_TIMEOUT);

  try {
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Brief wait for CSS layout to stabilize
    await new Promise((r) => setTimeout(r, 200));

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      timeout: PAGE_TIMEOUT,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Generate PDF from raw HTML string. Used by kurumsal quiz (different template).
 * Reuses the same browser singleton.
 */
export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await renderPdf(html);
    } catch (err) {
      console.error(
        `[pdf] attempt ${attempt}/${MAX_RETRIES} failed:`,
        (err as Error).message,
      );
      await killBrowser();
      if (attempt === MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("PDF generation failed after retries");
}

/**
 * Generate a filename for the PDF.
 */
export function getPdfFilename(firstName: string): string {
  const name = (firstName || "profesyonel")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u00e7\u011f\u0131\u00f6\u015f\u00fc-]/g, "");
  const date = new Date().toISOString().slice(0, 10);
  return `growtify-ai-rapor-${name}-${date}.pdf`;
}
