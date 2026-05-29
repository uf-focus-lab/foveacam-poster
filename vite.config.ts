import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "./scripts/svg-loader";

// Relative base so the built poster can be served from any sub-path
// (GitHub Pages, lab site, a USB stick) and still resolve its assets.
export default defineConfig({
  base: "./",
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
  plugins: [svgLoader(), vue()],
  build: {
    // A0 poster pulls in large figures; don't nag about chunk size.
    chunkSizeWarningLimit: 4000,
    assetsInlineLimit: 0,
  },
});
