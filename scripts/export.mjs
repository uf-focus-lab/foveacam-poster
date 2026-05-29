#!/usr/bin/env node
/**
 * Export the poster as a true-size A0 landscape PDF and/or PNG (1189 × 841 mm).
 *
 * Fully portable: serves the built dist/ straight from disk via Puppeteer
 * request interception (no HTTP server / open port) and renders with Puppeteer's
 * bundled Chromium (no system browser, no hard-coded paths). The PDF uses
 * `preferCSSPageSize`, so `@page { size: 1189mm 841mm }` in poster/index.css
 * is the single source of truth; the PNG is rasterised 1:1 from the print layout
 * at the requested DPI (deviceScaleFactor = dpi / 96).
 *
 * The format is chosen by the -o suffix: `.pdf` → PDF, `.png` → PNG, no suffix
 * (or -o omitted) → both. Default base name is `poster`.
 *
 * Usage:
 *   npm run export                 # → poster.pdf + poster.png
 *   npm run export -- -o out.pdf   # PDF only
 *   npm run export -- -o out.png   # PNG only
 *   npm run export -- -o out       # out.pdf + out.png
 *   npm run export -- --dpi 600    # raster DPI for PNG (default 300)
 *   npm run export -- --no-build   # reuse existing dist/
 */
import { fileURLToPath } from "node:url";
import { dirname, isAbsolute, resolve, extname, sep } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { build } from "vite";
import puppeteer from "puppeteer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// ── Args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
let out = "poster"; // no suffix → both PDF and PNG
let doBuild = true;
let dpi = 300; // raster DPI for PNG output
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "-o" || a === "--out") out = argv[++i];
  else if (a === "--dpi") dpi = Number(argv[++i]);
  else if (a === "--no-build") doBuild = false;
  else if (a === "-h" || a === "--help") {
    console.log(
      "Usage: npm run export [-- -o out[.pdf|.png]] [-- --dpi 300] [-- --no-build]",
    );
    process.exit(0);
  } else {
    console.error(`Unknown option: ${a}`);
    process.exit(2);
  }
}
if (!Number.isFinite(dpi) || dpi <= 0) {
  console.error(`✗ --dpi must be a positive number (got "${dpi}").`);
  process.exit(2);
}

// Output format(s) chosen by the -o suffix: .pdf → PDF, .png → PNG, none → both.
const ext = extname(out).toLowerCase();
if (ext && ext !== ".pdf" && ext !== ".png") {
  console.error(`✗ Unsupported output suffix "${ext}" (use .pdf, .png, or none).`);
  process.exit(2);
}
const base = ext ? out.slice(0, -4) : out;
const formats =
  ext === ".pdf" ? ["pdf"] : ext === ".png" ? ["png"] : ["pdf", "png"];
const baseAbs = isAbsolute(base) ? base : resolve(root, base);
const targets = formats.map((fmt) => ({ fmt, path: `${baseAbs}.${fmt}` }));

// ── Build (vite only; run `npm run build` separately for type-checking) ──────
if (doBuild) {
  console.log("▸ Building…");
  await build({ root, logLevel: "warn" });
}
if (!existsSync(resolve(root, "dist"))) {
  console.error("✗ dist/ missing — build first (drop --no-build).");
  process.exit(1);
}

// ── Render: serve dist/ from disk via request interception (no port) ─────────
const distDir = resolve(root, "dist");
const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
};

console.log(`▸ Rendering ${formats.map((f) => f.toUpperCase()).join(" + ")}…`);
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();

  // Fulfill every request from dist/ in-process — no listening server / port.
  // The synthetic origin's paths (incl. the app's absolute /…) map
  // straight onto files under dist/.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    let pathname;
    try {
      ({ pathname } = new URL(req.url()));
    } catch {
      return req.continue();
    }
    if (pathname.endsWith("/")) pathname += "index.html";
    const filePath = resolve(distDir, "." + decodeURIComponent(pathname));
    if (filePath !== distDir && !filePath.startsWith(distDir + sep)) {
      return req.respond({ status: 403, body: "forbidden" });
    }
    try {
      req.respond({
        status: 200,
        contentType:
          MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream",
        body: readFileSync(filePath),
      });
    } catch {
      req.respond({ status: 404, contentType: "text/plain", body: "not found" });
    }
  });

  await page.goto("http://poster.export/", {
    waitUntil: "networkidle0",
    timeout: 120_000,
  });
  await page.evaluateHandle("document.fonts.ready");

  for (const { fmt, path } of targets) {
    if (fmt === "pdf") {
      await page.pdf({
        path,
        printBackground: true,
        preferCSSPageSize: true, // honor @page { size: 1189mm 841mm }
        pageRanges: "1",
      });
      console.log(`✓ ${path}  (A0 vector, 3370 × 2384 pt)`);
    } else {
      // Rasterise the print layout 1:1 at the requested DPI. Print media gives
      // the poster at true A0 (transform reset, toolbar hidden); the DPI is
      // applied via the device scale factor (CSS px are 96 dpi).
      await page.emulateMediaType("print");
      const cssPxPerMm = 96 / 25.4;
      await page.setViewport({
        width: Math.ceil(1189 * cssPxPerMm),
        height: Math.ceil(841 * cssPxPerMm),
        deviceScaleFactor: dpi / 96,
      });
      const poster = await page.$(".poster");
      await poster.screenshot({ path });
      const px = Math.round((1189 / 25.4) * dpi);
      console.log(`✓ ${path}  (A0 raster @ ${dpi} dpi, ${px} px wide)`);
    }
  }
} finally {
  await browser.close();
}
