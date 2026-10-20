import { connectDB } from '../../../lib/mongodb.js'
import { requireAdmin } from '../../../lib/auth.js'
import { Testimonial } from '../../../lib/models/Testimonial.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  const { id } = req.query

  try {
    await connectDB()
    const doc = await Testimonial.findById(id)
    if (!doc) {
      res.status(404).json({ success: false, error: 'Not found' })
      return
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (body.quote !== undefined) doc.quote = body.quote
      if (body.name !== undefined) doc.name = body.name
      if (body.role !== undefined) doc.role = body.role
      if (body.published !== undefined) doc.published = body.published
      if (body.sortOrder !== undefined) doc.sortOrder = body.sortOrder
      await doc.save()
      res.status(200).json({
        success: true,
        testimonial: {
          _id: doc._id.toString(),
          quote: doc.quote,
          name: doc.name,
          role: doc.role,
          published: doc.published,
          sortOrder: doc.sortOrder,
        },
      })
      return
    }

    if (req.method === 'DELETE') {
      await doc.deleteOne()
      res.status(200).json({ success: true })
      return
    }

    res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Request failed' })
  }
}
