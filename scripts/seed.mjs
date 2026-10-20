import mongoose from 'mongoose'
import { connectDB } from '../lib/mongodb.js'
import { seedIfEmpty } from '../lib/seedContent.js'
import { Service } from '../lib/models/Service.js'
import { Testimonial } from '../lib/models/Testimonial.js'

async function main() {
  if (!process.env.MONGODB_URI?.trim()) {
    console.error('MONGODB_URI is empty. Open .env in the project root and paste your MongoDB Atlas connection string.')
    process.exit(1)
  }

  await connectDB()
  await seedIfEmpty()

  const services = await Service.countDocuments()
  const testimonials = await Testimonial.countDocuments()
  console.log(`Seed complete. Services: ${services}, Testimonials: ${testimonials}`)
  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
})
