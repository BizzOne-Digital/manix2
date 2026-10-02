import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useMedia'

export default function AnimatedHeading({
  as: Tag = 'h2',
  lines,
  className = '',
  lineClassName = '',
  highlightIndex = null,
  highlightClassName = 'gold-gradient-text italic',
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const lineEls = ref.current.querySelectorAll('[data-line]')
    gsap.fromTo(
      lineEls,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.15,
      },
    )
  }, [reduced, lines])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-1">
          <span
            data-line
            className={[
              'block',
              lineClassName,
              highlightIndex === i ? highlightClassName : '',
            ].join(' ')}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
