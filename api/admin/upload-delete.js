import { connectDB } from '../../lib/mongodb.js'
import { requireAdmin } from '../../lib/auth.js'
import { deleteStoredUploadByUrl } from '../../lib/deleteUpload.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }
  if (!requireAdmin(req, res)) return

  try {
    await connectDB()
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    await deleteStoredUploadByUrl(body?.url)
    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Delete failed' })
  }
}
