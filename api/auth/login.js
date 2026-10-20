import { connectDB } from '../../lib/mongodb.js'
import { createSessionCookie, verifyAdminPassword } from '../../lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  try {
    await connectDB()
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const password = body?.password
    if (!verifyAdminPassword(password)) {
      res.status(401).json({ success: false, error: 'Invalid password' })
      return
    }
    res.setHeader('Set-Cookie', createSessionCookie())
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Login failed' })
  }
}
