import { connectDB } from '../../../lib/mongodb.js'
import { requireAdmin } from '../../../lib/auth.js'
import { deleteService, updateService } from '../services.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  const { id } = req.query
  if (!id) {
    res.status(400).json({ success: false, error: 'Missing id' })
    return
  }

  try {
    await connectDB()
    if (req.method === 'PUT' || req.method === 'PATCH') {
      await updateService(req, res, id)
      return
    }
    if (req.method === 'DELETE') {
      await deleteService(req, res, id)
      return
    }
    res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Request failed' })
  }
}
