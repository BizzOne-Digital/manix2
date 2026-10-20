import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: '' },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema)
