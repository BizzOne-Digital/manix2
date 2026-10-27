import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'
import { formatHeadingText } from '../lib/headingText'
import SiteEyebrow from './SiteEyebrow'

gsap.registerPlugin(ScrollTrigger)

export default function PageHero({
  eyebrow,
  title,
  titleLines,
  description,
  image,
  children,
  align = 'left',
  compact = false,
}) {
  const scope = useRef(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (reduced || !scope.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-eyebrow]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.08 },
      )
      gsap.fromTo(
        '[data-hero-img]',
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
      )
      gsap.fromTo(
        '[data-hero-title-line]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out', delay: 0.15 },
      )
      gsap.fromTo(
        '[data-hero-desc]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' },
      )
      if (!mobile) {
        gsap.to('[data-hero-img]', {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    }, scope)
    return () => ctx.revert()
  }, [reduced, mobile])

  const lines = titleLines || (title ? [title] : [])

  return (
    <section
      ref={scope}
      className={[
        'relative overflow-hidden border-b border-white/5 bg-bg-main',
        compact
          ? 'pt-32 pb-10 sm:pt-36 sm:pb-12 md:pt-40 md:pb-14'
          : 'min-h-[72vh] pt-32 sm:pt-36 md:min-h-[78vh] md:pt-40 lg:pt-44',
      ].join(' ')}
    >
      <div className="absolute inset-0">
        {!imgError && image ? (
          <img
            data-hero-img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-full w-full object-cover opacity-50"
            loading="eager"
            fetchPriority="high"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-bg-panel to-bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/90 to-bg-main/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-bg-main/40" />
      </div>

      <div
        className={[
          'relative mx-auto flex min-w-0 max-w-[1440px] flex-col px-4 sm:px-5 md:px-8 lg:px-12',
          compact ? 'justify-start pb-0' : 'justify-end pb-12 sm:pb-16',
          align === 'center' ? 'items-center text-center' : 'items-start text-left',
        ].join(' ')}
      >
        {eyebrow ? (
          <SiteEyebrow data-hero-eyebrow scale="page" className="mb-5">
            {eyebrow}
          </SiteEyebrow>
        ) : null}
        <h1 className="max-w-3xl font-display text-[clamp(1.85rem,7vw,4rem)] font-medium leading-[1.18] tracking-[-0.01em] text-text-primary text-left">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pt-0.5 pb-1.5">
              <span data-hero-title-line className="block pb-0.5">
                {formatHeadingText(line)}
              </span>
            </span>
          ))}
        </h1>
        {description ? (
          <p
            data-hero-desc
            className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg"
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
      </div>
    </section>
  )
}
