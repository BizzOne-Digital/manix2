import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useMagneticButton(enabled = true) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const narrow = window.matchMedia('(max-width: 767px)').matches
    if (!finePointer || narrow) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  return ref
}
