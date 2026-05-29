export const withBase = (path: string) => {
  const base = import.meta.env.BASE_URL ?? "/";
  const trimmed = path.replace(/^\/+/, "");
  return `${base}${trimmed}`;
};
