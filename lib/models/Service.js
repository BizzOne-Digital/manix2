import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    number: { type: String, default: '01' },
    title: { type: String, required: true },
    short: { type: String, default: '' },
    anchor: { type: String, default: '' },
    summary: { type: String, default: '' },
    body: { type: [String], default: [] },
    clientSuppliedNote: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    /** Legacy static key e.g. processServing — used when imageUrl empty */
    imageKey: { type: String, default: '' },
    featured: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const Service =
  mongoose.models.Service || mongoose.model('Service', serviceSchema)
