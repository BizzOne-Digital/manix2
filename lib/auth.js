import crypto from 'crypto'
import { parse, serialize } from 'cookie'

const COOKIE_NAME = 'mannix_admin_session'
const MAX_AGE_SEC = 7 * 24 * 60 * 60

function getSecret() {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('SESSION_SECRET or ADMIN_PASSWORD must be set')
  return secret
}

function sign(payloadB64) {
  return crypto.createHmac('sha256', getSecret()).update(payloadB64).digest('base64url')
}

export function createSessionCookie() {
  const payload = Buffer.from(
    JSON.stringify({ role: 'admin', exp: Date.now() + MAX_AGE_SEC * 1000 }),
  ).toString('base64url')
  const token = `${payload}.${sign(payload)}`
  return serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SEC,
  })
}

export function clearSessionCookie() {
  return serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export function verifySession(req) {
  const header = req.headers.cookie || req.headers.Cookie
  if (!header) return false
  const cookies = parse(header)
  const token = cookies[COOKIE_NAME]
  if (!token) return false
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return false
  if (sign(payloadB64) !== sig) return false
  try {
    const data = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
    if (!data.exp || Date.now() > data.exp) return false
    return data.role === 'admin'
  } catch {
    return false
  }
}

export function requireAdmin(req, res) {
  if (!verifySession(req)) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return false
  }
  return true
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return password === expected
}
