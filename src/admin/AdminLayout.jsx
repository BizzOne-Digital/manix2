import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { adminLogout } from '../lib/adminApi'
import { AdminUiContext } from './adminUiContext'
import { AdminToastProvider } from './components/AdminToast'

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/bookings', label: 'Bookings' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  const logout = async () => {
    await adminLogout().catch(() => {})
    navigate('/admin/login', { replace: true })
  }

  return (
    <AdminUiContext.Provider value={{ showToast: setToast }}>
      <div className="min-h-[100svh] bg-bg-main text-text-primary">
        <header className="border-b border-white/10 bg-bg-secondary">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.3em] text-gold">Mannix Admin</p>
              <Link to="/" className="text-sm text-text-muted hover:text-gold">
                View public site
              </Link>
            </div>
            <nav className="flex flex-wrap items-center gap-4">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'text-sm uppercase tracking-[0.14em]',
                      isActive ? 'text-gold' : 'text-text-muted hover:text-text-primary',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={logout}
                className="text-sm uppercase tracking-[0.14em] text-text-muted hover:text-gold"
              >
                Log out
              </button>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-10">
          <Outlet />
        </main>
        <AdminToastProvider toast={toast} onClear={() => setToast(null)} />
      </div>
    </AdminUiContext.Provider>
  )
}
