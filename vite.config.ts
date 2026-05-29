import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "./scripts/svg-loader";

// Base path is configurable for GitHub Pages (e.g. /foveacam-poster/).
// Defaults to "/" for local dev and root deployments.
const rawBase = process.env.VITE_BASE_URL ?? "/";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

export default defineConfig({
  base,
  resolve: {
    // `lib` → /lib: shared, framework-agnostic helpers (sizes, …).
    alias: {
      lib: fileURLToPath(new URL("./lib", import.meta.url)),
      poster: fileURLToPath(new URL("./poster", import.meta.url)),
      framework: fileURLToPath(new URL("./framework", import.meta.url)),
    },
  },
  // svgLoader (enforce:"pre") turns imported .svg into style-scoped inline
  // Vue components; see svg-loader.ts.
  plugins: [svgLoader({ baseUrl: base }), vue()],
  build: {
    // A0 poster pulls in large figures; don't nag about chunk size.
    chunkSizeWarningLimit: 4000,
    assetsInlineLimit: 0,
  },
});
