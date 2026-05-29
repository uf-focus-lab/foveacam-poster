// svg-loader.ts compiles each imported .svg into an inline, style-scoped Vue
// component — so `import Foo from "./foo.svg"` is a component, used as <Foo/>.
declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    { tagName?: string },
    Record<string, unknown>,
    unknown
  >;
  export default component;
}

// Vite injects `import.meta.env` (BASE_URL etc.) at build time.
interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
