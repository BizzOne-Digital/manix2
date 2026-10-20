import { Link } from 'react-router-dom'

const cards = [
  { to: '/admin/services', title: 'Services', copy: 'Add, edit, delete services and upload images.' },
  { to: '/admin/testimonials', title: 'Testimonials', copy: 'Manage client quotes shown on the site.' },
  { to: '/admin/bookings', title: 'Bookings', copy: 'Review contact form inquiries (read-only review).' },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <p className="mt-2 text-text-muted">Manage site content and review inquiries.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="block border border-white/10 bg-bg-panel/40 p-6 transition-colors hover:border-gold/40"
          >
            <h2 className="font-display text-xl text-gold">{card.title}</h2>
            <p className="mt-3 text-sm text-text-muted">{card.copy}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
