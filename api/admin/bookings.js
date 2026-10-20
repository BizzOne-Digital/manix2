import { connectDB } from '../../lib/mongodb.js'
import { requireAdmin } from '../../lib/auth.js'
import { Booking } from '../../lib/models/Booking.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  try {
    await connectDB()

    if (req.method === 'GET') {
      const status = req.query.status
      const filter = status ? { status } : {}
      const docs = await Booking.find(filter).sort({ createdAt: -1 }).limit(200)
      res.status(200).json({
        success: true,
        bookings: docs.map((b) => ({
          _id: b._id.toString(),
          name: b.name,
          email: b.email,
          phone: b.phone,
          service: b.service,
          message: b.message,
          status: b.status,
          createdAt: b.createdAt,
        })),
      })
      return
    }

    if (req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const { id, status } = body
      if (!id || !['new', 'reviewed'].includes(status)) {
        res.status(400).json({ success: false, error: 'Invalid id or status' })
        return
      }
      const doc = await Booking.findByIdAndUpdate(id, { status }, { new: true })
      if (!doc) {
        res.status(404).json({ success: false, error: 'Not found' })
        return
      }
      res.status(200).json({ success: true })
      return
    }

    res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Request failed' })
  }
}
