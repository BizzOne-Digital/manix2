import { connectDB } from '../lib/mongodb.js'
import { Testimonial } from '../lib/models/Testimonial.js'
import { seedIfEmpty } from '../lib/seedContent.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  try {
    await connectDB()
    await seedIfEmpty()
    const docs = await Testimonial.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 })
    res.status(200).json({
      success: true,
      testimonials: docs.map((t) => ({
        _id: t._id.toString(),
        quote: t.quote,
        name: t.name,
        role: t.role,
      })),
      testimonialsAreSamples: false,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Failed to load testimonials' })
  }
}
