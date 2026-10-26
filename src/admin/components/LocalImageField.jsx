import { useRef, useState } from 'react'
import { uploadImage } from '../../lib/adminApi'
import { deleteStoredUploadByUrlClient } from '../../lib/deleteUploadClient'

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif'

export default function LocalImageField({
  label = 'Image',
  value = '',
  onChange,
  folder = 'pages',
  onToast,
}) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const pick = () => inputRef.current?.click()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      if (value?.startsWith('/api/uploads/')) {
        await deleteStoredUploadByUrlClient(value)
      }
      const result = await uploadImage(file, folder)
      onChange(result.url)
      onToast?.({ type: 'success', message: 'Image uploaded' })
    } catch (err) {
      onToast?.({ type: 'error', message: err.message || 'Upload failed' })
    } finally {
      setUploading(false)
    }
  }

  const remove = async () => {
    if (value?.startsWith('/api/uploads/')) {
      try {
        await deleteStoredUploadByUrlClient(value)
      } catch {
        /* best effort */
      }
    }
    onChange('')
    onToast?.({ type: 'success', message: 'Image removed' })
  }

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <div className="flex flex-wrap items-start gap-4">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-24 w-32 border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center border border-dashed border-white/20 text-xs text-text-muted">
            No image
          </div>
        )}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={onFile}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={pick}
            className="border border-gold/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload'}
          </button>
          {value ? (
            <button
              type="button"
              disabled={uploading}
              onClick={remove}
              className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-text-muted"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-text-muted">PNG, JPEG, WebP, or GIF, max 8MB</p>
    </div>
  )
}
