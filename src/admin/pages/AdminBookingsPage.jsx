import { useCallback, useEffect, useState } from 'react'
import { fetchAdminBookings, markBookingReviewed } from '../../lib/adminApi'
import { useAdminToast } from '../adminUiContext'

export default function AdminBookingsPage() {
  const { showToast } = useAdminToast()
  const [filter, setFilter] = useState('new')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAdminBookings(filter === 'all' ? undefined : filter)
      setList(data.bookings || [])
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }, [filter, showToast])

  useEffect(() => {
    load()
  }, [load])

  const markReviewed = async (id) => {
    try {
      await markBookingReviewed(id)
      showToast({ type: 'success', message: 'Marked as reviewed' })
      load()
    } catch (err) {
      showToast({ type: 'error', message: err.message })
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Bookings & inquiries</h1>
      <p className="mt-2 text-sm text-text-muted">Review only, submissions from the contact form.</p>

      <div className="mt-6 flex gap-2">
        {['new', 'reviewed', 'all'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={[
              'border px-3 py-1.5 text-xs uppercase tracking-[0.14em]',
              filter === key ? 'border-gold text-gold' : 'border-white/15 text-text-muted',
            ].join(' ')}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {loading ? <p className="text-text-muted">Loading…</p> : null}
        {!loading && list.length === 0 ? (
          <p className="text-text-muted">No inquiries in this view.</p>
        ) : null}
        {list.map((b) => (
          <article key={b._id} className="border border-white/10 bg-bg-panel/20 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg">{b.name}</p>
                <p className="text-sm text-gold">{b.email}</p>
                {b.phone ? <p className="text-sm text-text-muted">{b.phone}</p> : null}
              </div>
              <span
                className={[
                  'text-[10px] uppercase tracking-[0.2em]',
                  b.status === 'new' ? 'text-gold' : 'text-text-muted',
                ].join(' ')}
              >
                {b.status}
              </span>
            </div>
            {b.service ? (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-text-muted">
                Service: {b.service}
              </p>
            ) : null}
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-text-muted">{b.message}</p>
            <p className="mt-3 text-[11px] text-text-muted">
              {b.createdAt ? new Date(b.createdAt).toLocaleString() : ''}
            </p>
            {b.status === 'new' ? (
              <button
                type="button"
                onClick={() => markReviewed(b._id)}
                className="mt-4 border border-gold/50 px-4 py-2 text-xs uppercase tracking-[0.14em] text-gold"
              >
                Mark reviewed
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
