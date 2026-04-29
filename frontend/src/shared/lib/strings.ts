/**
 * Strip diacritics ("acción" → "accion") for stable URL slugs / IDs.
 */
export function removeAccents(input: string): string {
  return input.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/**
 * Convert a translated label into a stable section anchor.
 * "Sobre mí" → "sobre-mi"
 */
export function toSlug(input: string): string {
  return removeAccents(input).toLowerCase().trim().replace(/\s+/g, "-");
}
