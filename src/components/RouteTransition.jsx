import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKIP_ROUTE_TRANSITION_KEY } from './SiteGate'
import { useReducedMotion } from '../hooks/useMedia'

export default function RouteTransition({ children }) {
  const location = useLocation()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'instant' })
  }, [location.pathname, reduced])

  useEffect(() => {
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!content) return

    gsap.set(content, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' })

    const skipRemaining = Number.parseInt(
      sessionStorage.getItem(SKIP_ROUTE_TRANSITION_KEY) || '0',
      10,
    )
    if (skipRemaining > 0) {
      sessionStorage.setItem(SKIP_ROUTE_TRANSITION_KEY, String(skipRemaining - 1))
      if (overlay) {
        gsap.set(overlay, { scaleX: 0, pointerEvents: 'none' })
      }
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return undefined
    }

    if (reduced || !overlay) {
      ScrollTrigger.refresh()
      return undefined
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { scaleX: 0, pointerEvents: 'none' })
        ScrollTrigger.refresh()
      },
    })

    tl.set(overlay, { pointerEvents: 'none', scaleX: 0, transformOrigin: 'left center' })
      .to(overlay, { scaleX: 1, duration: 0.28, ease: 'power2.inOut' })
      .to(overlay, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.28,
        ease: 'power2.inOut',
      })

    return () => {
      tl.kill()
      gsap.set(content, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' })
      gsap.set(overlay, { scaleX: 0, pointerEvents: 'none' })
    }
  }, [location.pathname, reduced])

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-40 w-full origin-left scale-x-0 bg-gold"
      />
      <div ref={contentRef} className="page-enter">
        {children}
      </div>
    </div>
  )
}
