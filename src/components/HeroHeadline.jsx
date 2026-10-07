import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useMedia'

export default function HeroHeadline({ className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const lines = ref.current.querySelectorAll('[data-line]')
    gsap.fromTo(
      lines,
      { y: 20, immediateRender: false },
      {
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.12,
      },
    )
  }, [reduced])

  return (
    <h1
      ref={ref}
      className={[
        'font-display text-[clamp(2rem,8vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.01em] break-words',
        className,
      ].join(' ')}
    >
      <span className="block py-0.5">
        <span data-line className="block text-text-primary">
          Celebrated and
        </span>
      </span>
      <span className="block py-0.5">
        <span data-line className="block text-text-primary">
          <span className="gold-gradient-text font-semibold">Award-Winning</span> Investigators.
        </span>
      </span>
    </h1>
  )
}
