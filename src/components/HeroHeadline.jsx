import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useMedia'

export default function HeroHeadline({ className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const line = ref.current.querySelector('[data-line]')
    if (!line) return
    gsap.fromTo(
      line,
      { y: 20, immediateRender: false },
      {
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.12,
      },
    )
  }, [reduced])

  return (
    <h1
      ref={ref}
      className={[
        'hero-headline min-w-0 max-w-full font-display font-medium leading-[1.12] tracking-[-0.01em] text-text-primary',
        className,
      ].join(' ')}
    >
      <span data-line className="block min-w-0">
        <span className="text-text-primary">Celebrated Award Winning </span>
        <span className="gold-gradient-text font-semibold">Commercial Investigators</span>
      </span>
    </h1>
  )
}
