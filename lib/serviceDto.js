export function serviceToPublic(doc) {
  const o = doc.toObject ? doc.toObject() : doc
  return {
    id: o.slug,
    slug: o.slug,
    number: o.number,
    title: o.title,
    short: o.short,
    anchor: o.anchor || o.slug,
    summary: o.summary,
    body: o.body || [],
    clientSuppliedNote: o.clientSuppliedNote || '',
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
