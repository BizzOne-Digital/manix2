import mongoose from 'mongoose'

const storedUploadSchema = new mongoose.Schema(
  {
    folder: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true },
)

storedUploadSchema.index({ folder: 1, filename: 1 }, { unique: true })

export const StoredUpload =
  mongoose.models.StoredUpload || mongoose.model('StoredUpload', storedUploadSchema)
