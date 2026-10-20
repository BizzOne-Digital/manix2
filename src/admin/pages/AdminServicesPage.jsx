import { useCallback, useEffect, useState } from 'react'
import {
  deleteAdminService,
  fetchAdminServices,
  saveAdminService,
} from '../../lib/adminApi'
import { useAdminToast } from '../adminUiContext'
import LocalImageField from '../components/LocalImageField'

const emptyForm = () => ({
  title: '',
  number: '01',
  short: '',
  summary: '',
  bodyText: '',
  clientSuppliedNote: '',
  imageUrl: '',
  featured: true,
  published: true,
  sortOrder: 0,
})

export default function AdminServicesPage() {
  const { showToast } = useAdminToast()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm())

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAdminServices()
      setList(data.services || [])
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    load()
  }, [load])

  const startCreate = () => {
    setEditingId('new')
    setForm(emptyForm())
  }

  const startEdit = (service) => {
    setEditingId(service._id)
    setForm({
      title: service.title,
      number: service.number,
      short: service.short,
      summary: service.summary,
      bodyText: (service.body || []).join('\n\n'),
      clientSuppliedNote: service.clientSuppliedNote || '',
      imageUrl: service.imageUrl || '',
      featured: service.featured,
      published: service.published,
      sortOrder: service.sortOrder ?? 0,
    })
  }

  const cancel = () => {
    setEditingId(null)
    setForm(emptyForm())
  }

  const save = async (e) => {
    e.preventDefault()
    const payload = {
      title: form.title.trim(),
      number: form.number,
      short: form.short,
      summary: form.summary,
      body: form.bodyText.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      clientSuppliedNote: form.clientSuppliedNote,
      imageUrl: form.imageUrl,
      featured: form.featured,
      published: form.published,
      sortOrder: Number(form.sortOrder) || 0,
    }
    try {
      if (editingId === 'new') {
        await saveAdminService(payload)
        showToast({ type: 'success', message: 'Service created' })
      } else {
        await saveAdminService(payload, editingId)
        showToast({ type: 'success', message: 'Service updated' })
      }
      cancel()
      load()
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return
    try {
      await deleteAdminService(id)
      showToast({ type: 'success', message: 'Service deleted' })
      if (editingId === id) cancel()
      load()
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    }
  }

  const toast = (t) => showToast(t)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Services</h1>
        <button
          type="button"
          onClick={startCreate}
          className="border border-gold px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold"
        >
          Add service
        </button>
      </div>

      {editingId ? (
        <form onSubmit={save} className="mt-8 space-y-5 border border-white/10 bg-bg-panel/30 p-6">
          <h2 className="font-display text-xl">{editingId === 'new' ? 'New service' : 'Edit service'}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
              Title *
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
              Number
              <input
                value={form.number}
                onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
                className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
            Short description (cards)
            <textarea
              rows={2}
              value={form.short}
              onChange={(e) => setForm((f) => ({ ...f, short: e.target.value }))}
              className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
            Summary
            <textarea
              rows={2}
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
            Body paragraphs (blank line between paragraphs)
            <textarea
              rows={6}
              value={form.bodyText}
              onChange={(e) => setForm((f) => ({ ...f, bodyText: e.target.value }))}
              className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
            />
          </label>
          <LocalImageField
            label="Service image"
            folder="pages"
            value={form.imageUrl}
            onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            onToast={toast}
          />
          <div className="flex flex-wrap gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured on home
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
            <label className="flex items-center gap-2">
              Sort order
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: e.target.value }))}
                className="w-20 border border-white/10 bg-bg-main px-2 py-1"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="border border-gold bg-gold/10 px-5 py-2 text-xs uppercase tracking-[0.16em] text-gold">
              Save
            </button>
            <button type="button" onClick={cancel} className="border border-white/15 px-5 py-2 text-xs uppercase tracking-[0.16em]">
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-10 space-y-4">
        {loading ? <p className="text-text-muted">Loading…</p> : null}
        {list.map((service) => (
          <div
            key={service._id}
            className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-bg-panel/20 p-4"
          >
            <div>
              <p className="font-display text-lg">{service.number} — {service.title}</p>
              <p className="text-sm text-text-muted">{service.short}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => startEdit(service)}
                className="border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.14em]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(service._id)}
                className="border border-red-500/40 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
