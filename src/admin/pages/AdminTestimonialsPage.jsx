import { useCallback, useEffect, useState } from 'react'
import {
  deleteAdminTestimonial,
  fetchAdminTestimonials,
  saveAdminTestimonial,
} from '../../lib/adminApi'
import { useAdminToast } from '../adminUiContext'

const empty = () => ({ quote: '', name: '', role: '', published: true, sortOrder: 0 })

export default function AdminTestimonialsPage() {
  const { showToast } = useAdminToast()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(empty())

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAdminTestimonials()
      setList(data.testimonials || [])
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
    setForm(empty())
  }

  const startEdit = (t) => {
    setEditingId(t._id)
    setForm({
      quote: t.quote,
      name: t.name,
      role: t.role,
      published: t.published,
      sortOrder: t.sortOrder ?? 0,
    })
  }

  const cancel = () => {
    setEditingId(null)
    setForm(empty())
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      if (editingId === 'new') {
        await saveAdminTestimonial(form)
        showToast({ type: 'success', message: 'Testimonial added' })
      } else {
        await saveAdminTestimonial(form, editingId)
        showToast({ type: 'success', message: 'Testimonial updated' })
      }
      cancel()
      load()
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return
    try {
      await deleteAdminTestimonial(id)
      showToast({ type: 'success', message: 'Deleted' })
      if (editingId === id) cancel()
      load()
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Testimonials</h1>
        <button
          type="button"
          onClick={startCreate}
          className="border border-gold px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold"
        >
          Add testimonial
        </button>
      </div>

      {editingId ? (
        <form onSubmit={save} className="mt-8 space-y-4 border border-white/10 bg-bg-panel/30 p-6">
          <h2 className="font-display text-xl">{editingId === 'new' ? 'New' : 'Edit'}</h2>
          <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
            Quote *
            <textarea
              required
              rows={4}
              value={form.quote}
              onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
              className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
              Name *
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.18em] text-text-muted">
              Role
              <input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="mt-2 w-full border border-white/10 bg-bg-main px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published on site
          </label>
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
        {list.map((t) => (
          <div key={t._id} className="border border-white/10 bg-bg-panel/20 p-4">
            <p className="text-sm italic text-text-muted">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-2 font-medium">{t.name} — {t.role}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={() => startEdit(t)} className="border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.14em]">
                Edit
              </button>
              <button type="button" onClick={() => remove(t._id)} className="border border-red-500/40 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-red-300">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
