import type { Plugin } from "vite";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { parse } from "node-html-parser";
import { compileStyle } from "@vue/compiler-sfc";

// Vite plugin that compiles each imported `.svg` into an inline Vue component.
// Crucially, every SVG gets a unique `data-v-<hash>` scope and its <style>
// blocks are run through @vue/compiler-sfc's compileStyle so generic class
// names (.st0, .stealth, .line-of-sights, …) can't collide across figures.
// Inlining (vs <img>) keeps the SVG vector and lets `currentColor` inherit.
//
// Reused from zhangyx.net (.vitepress/svg-loader.ts) — the same loader that
// authored the FoveaCam Duo figures, so they render identically here.

type SvgLoaderOptions = {
  baseUrl?: string;
};

function scopeId(id: string): string {
  return createHash("md5").update(id).digest("hex").slice(0, 8);
}

function normalizeBaseUrl(baseUrl?: string) {
  const raw = baseUrl ?? "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

function withBase(baseUrl: string, path: string) {
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

function rewriteAbsoluteUrls(value: string, baseUrl: string) {
  return value
    .replace(
      /(href|xlink:href|src)=["']\/([^"']*)["']/g,
      (_, attr, path) => `${attr}="${withBase(baseUrl, path)}"`,
    )
    .replace(
      /url\(\s*['"]?\/([^'")\s]+)['"]?\s*\)/g,
      (_, path) => `url(${withBase(baseUrl, path)})`,
    );
}

export default function svgLoader(options: SvgLoaderOptions = {}): Plugin {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  return {
    name: "svg-loader",
    enforce: "pre",
    load(id) {
      // Strip any query/HMR suffix (e.g. "...svg?t=123", "...svg?import").
      // Without this, dev/HMR ids fail the `.svg` test, the loader skips, and
      // Vite returns the SVG as a URL string — which <component :is> then tries
      // to use as a tag name (InvalidCharacterError on createElement).
      const filepath = id.split("?", 1)[0];
      if (!filepath.endsWith(".svg")) return;
      const raw = fs.readFileSync(filepath, "utf-8");
      const doc = parse(raw);
      const svgEl = doc.querySelector("svg");
      if (!svgEl) return;

      // Scope by file path (not the query-suffixed id) so the scope is stable
      // across HMR reloads.
      const scope = scopeId(filepath);
      const scopeAttr = `data-v-${scope}`;
      // Add scope attribute to all elements in the SVG
      svgEl.setAttribute(scopeAttr, "");
      svgEl.querySelectorAll("*").forEach((el) => {
        el.setAttribute(scopeAttr, "");
      });

      let html = svgEl.innerHTML;
      html = html.replace(
        /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
        (_, open, css, close) => {
          const result = compileStyle({
            source: css,
            id: scopeAttr,
            scoped: true,
            filename: id,
          });
          return `${open}${result.code}${close}`;
        },
      );
      html = rewriteAbsoluteUrls(html, baseUrl);

      const attrs = { ...svgEl.attributes };
      for (const [key, value] of Object.entries(attrs)) {
        if (typeof value !== "string") continue;
        let next = value;
        if (
          (key === "href" || key === "xlink:href" || key === "src") &&
          value.startsWith("/")
        ) {
          next = withBase(baseUrl, value);
        }
        next = next.replace(
          /url\(\s*['"]?\/([^'")\s]+)['"]?\s*\)/g,
          (_, path) => `url(${withBase(baseUrl, path)})`,
        );
        attrs[key] = next;
      }

      const ownAttrs = JSON.stringify(attrs);
      const innerHTML = JSON.stringify(html);

      return `
        import { defineComponent, h } from "vue";
        const ownAttrs = ${ownAttrs};
        const innerHTML = ${innerHTML};
        export default defineComponent({
          props: {
            tagName: {
              type: String,
              default: "svg",
            },
          },
          setup(props, { attrs }) {
            return () => h(props.tagName, { ...ownAttrs, ...attrs, innerHTML });
          }
        });`;
    },
  };
}
