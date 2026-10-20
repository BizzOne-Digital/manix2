import { verifySession } from '../../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }
  res.status(200).json({ authenticated: verifySession(req) })
}
