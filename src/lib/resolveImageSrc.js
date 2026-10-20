import { siteImages } from '../data/images'

const PLACEHOLDER = '/images/columns-golden-hour.jpg'

export function resolveServiceImage(service) {
  if (!service) return PLACEHOLDER
  if (service.imageUrl) {
    if (service.imageUrl.startsWith('/uploads/')) return PLACEHOLDER
    return service.imageUrl
  }
  if (service.imageKey && siteImages[service.imageKey]?.src) {
    return siteImages[service.imageKey].src
  }
  return PLACEHOLDER
}

export function resolveServiceImageMeta(service) {
  const src = resolveServiceImage(service)
  const legacy = service?.imageKey ? siteImages[service.imageKey] : null
  return {
    src,
    alt: legacy?.alt || service?.title || 'Service image',
    width: legacy?.width || 1600,
    height: legacy?.height || 1067,
  }
}
