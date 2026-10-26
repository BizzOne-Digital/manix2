import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useMedia'

export default function HeroHeadline({ className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const lines = ref.current.querySelectorAll('[data-line]')
    if (!lines.length) return
    gsap.fromTo(
      lines,
      { y: 20, immediateRender: false },
      {
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.12,
      },
    )
  }, [reduced])

  return (
    <h1
      ref={ref}
      className={[
        'min-w-0 max-w-full font-display text-[clamp(1.375rem,4.2vw,2.875rem)] font-medium leading-[1.2] tracking-[-0.01em] text-text-primary',
        className,
      ].join(' ')}
    >
      <span data-line className="block pt-0.5 pb-1.5 text-text-primary">Celebrated Award Winning</span>
      <span data-line className="block pt-0.5 pb-1.5 gold-gradient-text font-semibold">Commercial Investigators</span>
    </h1>
  )
}
