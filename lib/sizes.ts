/**
 * Resolve a configurable size prop to a CSS length.
 * Numbers are interpreted as millimetres (the poster's authoring unit);
 * strings are passed through verbatim so any unit can be set manually
 * (e.g. "2rem", "5%", "10px").
 */
export function size(value: number | string): string {
  return typeof value === "number" ? `${value}mm` : value;
}

/** A size prop accepts a millimetre number or an explicit CSS length string. */
export type Size = number | string;
