function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Derin birleştirme: dizi alanlarında alt nesne birleşir; yaprak değer override edilir. */
export function deepMergeMessages(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const ov = override[key];
    if (ov === null || ov === undefined) continue;

    const bv = base[key];

    if (isPlainRecord(ov)) {
      if (isPlainRecord(bv)) {
        out[key] = deepMergeMessages(bv, ov);
      } else if (bv === undefined) {
        out[key] = deepMergeMessages({}, ov);
      }
      continue;
    }

    if (Array.isArray(ov)) {
      if (bv === undefined || Array.isArray(bv)) {
        out[key] = ov;
      }
      continue;
    }

    if (isPlainRecord(bv)) continue;

    out[key] = ov;
  }
  return out;
}
