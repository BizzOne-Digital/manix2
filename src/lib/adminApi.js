const jsonHeaders = { 'Content-Type': 'application/json' }

async function parseJson(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || res.statusText || 'Request failed')
  }
  return data
}

export async function checkAdminSession() {
  const res = await fetch('/api/auth/session', { credentials: 'include' })
  const data = await parseJson(res)
  return Boolean(data.authenticated)
}

export async function adminLogin(password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: jsonHeaders,
    body: JSON.stringify({ password }),
  })
  return parseJson(res)
}

export async function adminLogout() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
  return parseJson(res)
}

export async function uploadImage(file, folder) {
  const form = new FormData()
  form.append('file', file)
  form.append('folder', folder)
  const res = await fetch('/api/upload', {
    method: 'POST',
    credentials: 'include',
    body: form,
  })
  return parseJson(res)
}

export async function fetchAdminServices() {
  const res = await fetch('/api/admin/services', { credentials: 'include' })
  return parseJson(res)
}

export async function saveAdminService(payload, id) {
  const url = id ? `/api/admin/services/${id}` : '/api/admin/services'
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  })
  return parseJson(res)
}

export async function deleteAdminService(id) {
  const res = await fetch(`/api/admin/services/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return parseJson(res)
}

export async function fetchAdminTestimonials() {
  const res = await fetch('/api/admin/testimonials', { credentials: 'include' })
  return parseJson(res)
}

export async function saveAdminTestimonial(payload, id) {
  const url = id ? `/api/admin/testimonials/${id}` : '/api/admin/testimonials'
  const method = id ? 'PUT' : 'POST'
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  })
  return parseJson(res)
}

export async function deleteAdminTestimonial(id) {
  const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return parseJson(res)
}

export async function fetchAdminBookings(status) {
  const q = status ? `?status=${encodeURIComponent(status)}` : ''
  const res = await fetch(`/api/admin/bookings${q}`, { credentials: 'include' })
  return parseJson(res)
}

export async function markBookingReviewed(id) {
  const res = await fetch('/api/admin/bookings', {
    method: 'PATCH',
    credentials: 'include',
    headers: jsonHeaders,
    body: JSON.stringify({ id, status: 'reviewed' }),
  })
  return parseJson(res)
}

export async function submitBooking(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  })
  return parseJson(res)
}
