import { connectDB } from '../../../lib/mongodb.js'
import { StoredUpload } from '../../../lib/models/StoredUpload.js'
import { UPLOAD_FOLDERS } from '../../../lib/uploadUtils.js'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).end()
    return
  }

  const { folder, filename } = req.query
  if (
    !folder ||
    !filename ||
    typeof filename !== 'string' ||
    filename.includes('..') ||
    filename.includes('/') ||
    filename.includes('\\')
  ) {
    res.status(400).end()
    return
  }
  if (!UPLOAD_FOLDERS.includes(folder)) {
    res.status(404).end()
    return
  }

  try {
    await connectDB()
    const doc = await StoredUpload.findOne({ folder, filename }).select('+data')
    if (!doc?.data) {
      res.status(404).end()
      return
    }

    res.setHeader('Content-Type', doc.mimeType)
    res.setHeader('Content-Length', doc.size)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

    if (req.method === 'HEAD') {
      res.status(200).end()
      return
    }
    res.status(200).send(doc.data)
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}
