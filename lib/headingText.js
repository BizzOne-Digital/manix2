/** Headings use "&" instead of "and" (whole word only). */
export function formatHeadingText(text) {
  if (!text || typeof text !== 'string') return text
  return text.replace(/\s+and\s+/gi, ' & ')
}
