import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to in-page anchors after route changes (e.g. /about#team). */
export function useHashScroll(delayMs = 150) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.replace('#', '')
    if (!id) return undefined

    const timer = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, delayMs)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash, delayMs])
}
