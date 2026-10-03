import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useMedia'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !barRef.current) return
    const el = barRef.current
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      gsap.to(el, { scaleX: p, duration: 0.15, ease: 'power1.out', overwrite: true })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-gold/20"
      aria-hidden="true"
    >
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
    </div>
  )
}
