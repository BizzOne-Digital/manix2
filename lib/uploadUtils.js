import crypto from 'crypto'

export const UPLOAD_FOLDERS = ['products', 'gallery', 'pages', 'misc']

export const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

export const PLACEHOLDER_IMAGE = '/images/columns-golden-hour.jpg'

export function extFromMime(mime) {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/webp':
      return 'webp'
    case 'image/gif':
      return 'gif'
    default:
      return 'bin'
  }
}

export function uniqueFilename(mime) {
  const ext = extFromMime(mime)
  const rand = crypto.randomBytes(8).toString('hex')
  return `${Date.now()}-${rand}.${ext}`
}

export function publicUploadUrl(folder, filename) {
  return `/api/uploads/${folder}/${filename}`
}

export function parseUploadUrl(url) {
  if (!url || typeof url !== 'string') return null
  if (!url.startsWith('/api/uploads/')) return null
  const rest = url.slice('/api/uploads/'.length)
  const slash = rest.indexOf('/')
  if (slash < 1) return null
  const folder = rest.slice(0, slash)
  const filename = rest.slice(slash + 1)
  if (!folder || !filename || filename.includes('..') || filename.includes('/')) return null
  if (!UPLOAD_FOLDERS.includes(folder)) return null
  return { folder, filename }
}

export function resolveImageSrc(url, legacySrc) {
  if (url && typeof url === 'string') {
    if (url.startsWith('/api/uploads/') || url.startsWith('http')) return url
    if (url.startsWith('/images/')) return url
  }
  if (legacySrc) return legacySrc
  if (url && url.startsWith('/uploads/')) return PLACEHOLDER_IMAGE
  return PLACEHOLDER_IMAGE
}
