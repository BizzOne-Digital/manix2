import { connectDB } from '../lib/mongodb.js'
import { Service } from '../lib/models/Service.js'
import { seedIfEmpty } from '../lib/seedContent.js'
import { serviceToPublic, splitServices } from '../lib/serviceDto.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }

  try {
    await connectDB()
    await seedIfEmpty()
    const docs = await Service.find({ published: true }).sort({ sortOrder: 1, title: 1 })
    const services = docs.map(serviceToPublic)
    const { featured, details } = splitServices(services)
    res.status(200).json({ success: true, services, featuredServices: featured, serviceDetails: details })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Failed to load services' })
  }
}
