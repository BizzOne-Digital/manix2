import Busboy from 'busboy'
import { MAX_UPLOAD_BYTES } from './uploadUtils.js'

export function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const fields = {}
    let fileBuffer = null
    let fileMeta = null

    const busboy = Busboy({
      headers: req.headers,
      limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
    })

    busboy.on('file', (_name, stream, info) => {
      const chunks = []
      stream.on('data', (chunk) => chunks.push(chunk))
      stream.on('limit', () => reject(new Error('File exceeds 8MB limit')))
      stream.on('end', () => {
        fileBuffer = Buffer.concat(chunks)
        fileMeta = {
          mimeType: info.mimeType,
          filename: info.filename,
        }
      })
    })

    busboy.on('field', (name, value) => {
      fields[name] = value
    })

    busboy.on('finish', () => resolve({ fields, fileBuffer, fileMeta }))
    busboy.on('error', reject)

    req.pipe(busboy)
  })
}
