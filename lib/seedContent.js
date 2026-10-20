import { featuredServices, serviceDetails } from '../src/data/services.js'
import { testimonials } from '../src/data/testimonials.js'
import { Service } from './models/Service.js'
import { Testimonial } from './models/Testimonial.js'

export async function seedIfEmpty() {
  const serviceCount = await Service.countDocuments()
  if (serviceCount === 0) {
    const detailById = Object.fromEntries(serviceDetails.map((d) => [d.id, d]))
    const docs = featuredServices.map((f, index) => {
      const d = detailById[f.id] || {}
      return {
        slug: f.id,
        number: f.number || d.number || String(index + 1).padStart(2, '0'),
        title: f.title || d.title,
        short: f.short || '',
        anchor: f.anchor || f.id,
        summary: d.summary || '',
        body: d.body || [],
        clientSuppliedNote: d.clientSuppliedNote || '',
        imageKey: f.imageKey || d.imageKey || '',
        imageUrl: '',
        featured: true,
        sortOrder: index,
        published: true,
      }
    })
    await Service.insertMany(docs)
  }

  const testimonialCount = await Testimonial.countDocuments()
  if (testimonialCount === 0) {
    await Testimonial.insertMany(
      testimonials.map((t, index) => ({
        quote: t.quote,
        name: t.name,
        role: t.role,
        published: true,
        sortOrder: index,
      })),
    )
  }
}
