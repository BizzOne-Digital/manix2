import { connectDB } from '../../lib/mongodb.js'
import { requireAdmin } from '../../lib/auth.js'
import { Testimonial } from '../../lib/models/Testimonial.js'
import { seedIfEmpty } from '../../lib/seedContent.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  try {
    await connectDB()
    await seedIfEmpty()

    if (req.method === 'GET') {
      const docs = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 })
      res.status(200).json({
        success: true,
        testimonials: docs.map((t) => ({
          _id: t._id.toString(),
          quote: t.quote,
          name: t.name,
          role: t.role,
          published: t.published,
          sortOrder: t.sortOrder,
        })),
      })
      return
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body.quote?.trim() || !body.name?.trim()) {
        res.status(400).json({ success: false, error: 'Quote and name are required' })
        return
      }
      const doc = await Testimonial.create({
        quote: body.quote.trim(),
        name: body.name.trim(),
        role: body.role?.trim() || '',
        published: body.published !== false,
        sortOrder: body.sortOrder ?? 0,
      })
      res.status(201).json({
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

    res.status(405).json({ success: false, error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Request failed' })
  }
}
