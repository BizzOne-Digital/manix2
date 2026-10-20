import { connectDB } from '../lib/mongodb.js'
import { Booking } from '../lib/models/Booking.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  try {
    await connectDB()
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const phone = String(body?.phone || '').trim()
    const service = String(body?.service || '').trim()
    const message = String(body?.message || '').trim()

    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: 'Name, email, and message are required' })
      return
    }
    if (!emailPattern.test(email)) {
      res.status(400).json({ success: false, error: 'Invalid email' })
      return
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      message,
      status: 'new',
    })

    res.status(201).json({ success: true, id: booking._id.toString() })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Could not save inquiry' })
  }
}
