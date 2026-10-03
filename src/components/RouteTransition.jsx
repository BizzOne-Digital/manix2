import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

    if (reduced) {
      gsap.set(content, { opacity: 1, y: 0, scale: 1 })
      ScrollTrigger.refresh()
      return undefined
    }

    gsap.set(content, { opacity: 1, y: 0, scale: 1 })
    if (!overlay) return undefined

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(content, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' })
        ScrollTrigger.refresh()
      },
    })

    tl.set(overlay, { pointerEvents: 'auto', scaleX: 0, transformOrigin: 'left center' })
      .to(overlay, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' })
      .fromTo(
        content,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.12',
      )
      .to(overlay, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.35,
        ease: 'power2.inOut',
      })
      .set(overlay, { pointerEvents: 'none' })

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
      <div ref={contentRef} key={location.pathname} className="page-enter">
        {children}
      </div>
    </div>
  )
}
