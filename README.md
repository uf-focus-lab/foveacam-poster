# Adaptive Foveated Computational Cameras — A0 poster

## Develop

```bash
npm install
npm run dev        # http://localhost:5173 — live preview, scales to fit
npm run check      # type-check only (vue-tsc --noEmit)
npm run build      # type-check + bundle to dist/
npm run preview    # render preview.png (A0 @ 96 dpi) — quick visual check
npm run serve      # serve the production build (vite preview)
```

> Node 18–22 recommended.

## Print / export (PDF + PNG)

- **One command (portable):**
  ```bash
  npm run export                 # → poster.pdf + poster.png (both)
  npm run export -- -o out.pdf   # PDF only  (format follows the suffix)
  npm run export -- -o out.png   # PNG only
  npm run export -- --dpi 600    # raster DPI for PNG (default 300)
  npm run export -- --no-build   # reuse existing dist/
  ```
  Builds, then renders `dist/` with **Puppeteer's bundled Chromium** (no system
  browser needed), serving the files in-process via request interception (no
  open port). The **format follows the `-o` suffix** — `.pdf`, `.png`, or none
  = both. The **PDF** honors `@page { size: 1189mm 841mm }` (`preferCSSPageSize`)
  → a single true-size A0 page (`pdfinfo poster.pdf` →
  `3370.08 x 2383.92 pts`). The **PNG** is rasterised 1:1 from the print layout
  at `--dpi` (300 dpi → 14044 × 9934 px).
- **From the browser:** open the page, click **Print / PDF** in the toolbar
  (top-right), choose "Save as PDF", paper size **A0**, margins **None**,
  background graphics **on**.

The on-screen toolbar (Fit / 100% / ± / Print) is hidden in print and never
appears in the PDF.

## Structure

```
lib/sizes.ts        ← size(n|str)→CSS length (number = mm); aliased as "lib"
scripts/
  svg-loader.ts     ← Vite plugin: .svg → style-scoped inline Vue component
  export.mjs        ← `npm run export` → poster.pdf (Puppeteer)
  check.sh          ← type-check wrapper for non-interactive shells
  png-to-webp.sh    ← convert a directory's PNGs → WebP (cwebp -q 90)
framework/
  PosterFrame.vue   ← pan/zoom + toolbar “hub”, wraps poster content
poster/
  index.vue         ← poster content (header + body)
  layout/           ← structural regions: Header, Body (named slots)
  panels/           ← content filling Body slots: History (left timeline)
  components/       ← reusable leaves: Timeline, TimelineItem
  assets/*.svg      ← vector figures, imported as Vue components (crisp at A0)
  index.css         ← A0 canvas, font/colour vars, print rules
public/     ← raster assets (all WebP): history/ iros/ duo/ logos/
```

**To change wording or swap a figure, edit the relevant region directly** —
there is no central content file. The header banner lives in `poster/index.vue`;
the history timeline in `panels/History.vue`. Vector figures are `import`ed where
used (the `svg-loader` compiles each `.svg` into a style-scoped inline SVG
component); rasters are referenced by path under `public/` (e.g.
`/history/mems-chip.webp`).

## Layout

- **Left column (dark):** a decade of foveated sensing as a **vertical
  timeline** — each milestone has a date, venue, title, abstract, and
  thumbnail; per-item accent colour sweeps a gradient down the rail. The two
  most recent works point (→) to the panels on the right.
- **Right two-thirds (in progress):** **FoveaCam++** (IROS 2024) on top and
  **FoveaCam Duo** (ICCP 2026) below — currently placeholder regions
  (`foveacam-plus` / `foveacam-duo` slots in `Body.vue`).

## Conventions

- **Lengths in mm; type in `em`** anchored to a mm base font (`--fs-base` on
  `.poster`), so `1em` is a fixed physical size. Use `lib/sizes` for size props.
- **Typography:** a UI sans-serif (`--font-ui`) is the default for titles and
  labels; **Times New Roman** (`--font-serif`) is reserved for running prose
  via the `.prose` class.
- **Rasters are WebP.** Convert any new PNG/JPG with
  `bash scripts/png-to-webp.sh <dir>` and reference the `.webp`. Prefer SVG
  (imported as a component) wherever a vector source exists.
