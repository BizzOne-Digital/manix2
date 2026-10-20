import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAdminSession } from '../lib/adminApi'

export default function AdminGuard() {
  const location = useLocation()
  const [state, setState] = useState({ loading: true, ok: false })

  useEffect(() => {
    let cancelled = false
    checkAdminSession()
      .then((ok) => {
        if (!cancelled) setState({ loading: false, ok })
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, ok: false })
      })
    return () => {
      cancelled = true
    }
  }, [location.pathname])

  if (state.loading) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-bg-main text-text-muted">
        Checking session…
      </div>
    )
  }

  if (!state.ok) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
