import { connectDB } from '../lib/mongodb.js'
import { requireAdmin } from '../lib/auth.js'
import { parseMultipart } from '../lib/parseMultipart.js'
import { StoredUpload } from '../lib/models/StoredUpload.js'
import {
  ALLOWED_MIME,
  UPLOAD_FOLDERS,
  uniqueFilename,
  publicUploadUrl,
} from '../lib/uploadUtils.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' })
    return
  }
  if (!requireAdmin(req, res)) return

  try {
    await connectDB()
    const { fields, fileBuffer, fileMeta } = await parseMultipart(req)
    const folder = fields.folder
    if (!UPLOAD_FOLDERS.includes(folder)) {
      res.status(400).json({ success: false, error: 'Invalid folder' })
      return
    }
    if (!fileBuffer || !fileMeta?.mimeType) {
      res.status(400).json({ success: false, error: 'No file uploaded' })
      return
    }
    if (!ALLOWED_MIME.has(fileMeta.mimeType)) {
      res.status(400).json({ success: false, error: 'Invalid file type' })
      return
    }

    const filename = uniqueFilename(fileMeta.mimeType)
    await StoredUpload.create({
      folder,
      filename,
      mimeType: fileMeta.mimeType,
      size: fileBuffer.length,
      data: fileBuffer,
    })

    res.status(200).json({
      success: true,
      url: publicUploadUrl(folder, filename),
      filename,
      size: fileBuffer.length,
      folder,
    })
  } catch (err) {
    console.error(err)
    const message = err.message?.includes('8MB') ? err.message : 'Upload failed'
    res.status(500).json({ success: false, error: message })
  }
}
