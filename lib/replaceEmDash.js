/** Client style: em/en dashes in copy become commas (not hyphenated words). */
export function replaceEmDashInText(text) {
  if (text == null || typeof text !== 'string') return text
  return text
    .replace(/\s*[\u2014\u2013]\s*/g, ', ')
    .replace(/,\s*,+/g, ',')
    .replace(/,\s+([,.])/g, '$1')
    .trim()
}

export function replaceEmDashInStrings(value) {
  if (typeof value === 'string') return replaceEmDashInText(value)
  if (Array.isArray(value)) return value.map(replaceEmDashInStrings)
  return value
}
