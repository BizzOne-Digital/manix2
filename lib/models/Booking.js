import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    service: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'reviewed'], default: 'new', index: true },
  },
  { timestamps: true },
)

export const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
