import { formatServiceTitle } from './formatServiceTitle.js'
import { replaceEmDashInText } from './replaceEmDash.js'
import { formatHeadingText } from './headingText.js'

/** Shorter labels for home “What we do” row when DB has no bannerTitle */
const BANNER_TITLES_BY_SLUG = {
  'background-verification': 'Tenant & Background Verification',
  'solvency-asset': 'Solvency & Assets',
}

/** Client asked to remove the 99.3% process-serving disclaimer from the public site. */
function publicClientSuppliedNote(slug, note) {
  if (!note || slug === 'process-serving') return ''
  return note
}

export function serviceToPublic(doc) {
  const o = doc.toObject ? doc.toObject() : doc
  const slug = o.slug
  const bannerRaw = o.bannerTitle || BANNER_TITLES_BY_SLUG[slug]
  return {
    id: o.slug,
    slug: o.slug,
    number: o.number,
    title: formatHeadingText(formatServiceTitle(replaceEmDashInText(o.title))),
    bannerTitle: bannerRaw
      ? formatHeadingText(formatServiceTitle(replaceEmDashInText(bannerRaw)))
      : undefined,
    short: replaceEmDashInText(o.short),
    anchor: o.anchor || o.slug,
    summary: replaceEmDashInText(o.summary),
    body: (o.body || []).map((p) => replaceEmDashInText(p)),
    clientSuppliedNote: publicClientSuppliedNote(slug, o.clientSuppliedNote || ''),
    imageUrl: o.imageUrl || '',
    imageKey: o.imageKey || '',
    featured: Boolean(o.featured),
    sortOrder: o.sortOrder ?? 0,
  }
}

export function splitServices(services) {
  const featured = services.filter((s) => s.featured)
  const details = services.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
    summary: s.summary,
    body: s.body,
    clientSuppliedNote: s.clientSuppliedNote,
    imageUrl: s.imageUrl,
    imageKey: s.imageKey,
    anchor: s.anchor,
  }))
  return { featured, details, all: services }
}
