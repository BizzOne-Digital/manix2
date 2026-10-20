import { StoredUpload } from './models/StoredUpload.js'
import { parseUploadUrl } from './uploadUtils.js'

export async function deleteStoredUploadByUrl(url) {
  const parsed = parseUploadUrl(url)
  if (!parsed) return
  await StoredUpload.deleteOne({ folder: parsed.folder, filename: parsed.filename })
}
