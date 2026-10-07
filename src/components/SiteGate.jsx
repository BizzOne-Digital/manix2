import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const SITE_ENTERED_KEY = 'mannix_site_entered'

export function hasEnteredSite() {
  if (typeof window === 'undefined') return true
  return sessionStorage.getItem(SITE_ENTERED_KEY) === '1'
}

export function markSiteEntered() {
  sessionStorage.setItem(SITE_ENTERED_KEY, '1')
}

export default function SiteGate() {
  const location = useLocation()

  if (!hasEnteredSite()) {
    return <Navigate to="/welcome" replace state={{ from: location }} />
  }

  return <Outlet />
}
