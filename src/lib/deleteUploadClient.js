export async function deleteStoredUploadByUrlClient(url) {
  if (!url?.startsWith('/api/uploads/')) return
  await fetch('/api/admin/upload-delete', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
}
