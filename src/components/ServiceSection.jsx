import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ButtonLink from './ButtonLink'
import { brand } from '../data/brand'
import { useIsMobile, useReducedMotion } from '../hooks/useMedia'

gsap.registerPlugin(ScrollTrigger)

export default function ServiceSection({
  id,
  number,
  title,
  summary,
  body,
  image,
  reverse = false,
  clientSuppliedNote,
  showClientRate = false,
}) {
  const sectionRef = useRef(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      const content = section.querySelector('[data-service-content]')
      const media = section.querySelector('[data-service-media]')
      const rule = section.querySelector('[data-gold-rule]')
      const paragraphs = section.querySelectorAll('[data-service-paragraph]')
      const numberEl = section.querySelector('[data-service-number]')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
          invalidateOnRefresh: true,
        },
      })

      if (rule) {
        tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0)
      }
      if (numberEl) {
        tl.fromTo(numberEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.05)
      }
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: mobile ? 20 : 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.08,
        )
      }
      if (media) {
        tl.fromTo(
          media,
          { opacity: 0, y: mobile ? 20 : 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.14,
        )
      }
      if (paragraphs.length) {
        tl.fromTo(
          paragraphs,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' },
          0.2,
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced, reverse, mobile])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="scroll-mt-28 border-b border-white/5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <div
          data-gold-rule
          className="mb-10 h-px origin-left bg-gradient-to-r from-gold via-gold/40 to-transparent"
        />
        <div
          className={[
            'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
            reverse ? 'lg:[&>*:first-child]:order-2' : '',
          ].join(' ')}
        >
          <div data-service-content>
            <p
              data-service-number
              className="font-display text-6xl leading-none text-gold/30 md:text-7xl"
            >
              {number}
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.5vw,3rem)] text-text-primary">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gold-light/90">{summary}</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
              {body.map((paragraph, i) => (
                <p key={i} data-service-paragraph>
                  {paragraph}
                </p>
              ))}
            </div>
            {showClientRate && brand.publishProcessServingSuccessRate ? (
              <p className="mt-4 text-xs uppercase tracking-wider text-text-muted">
                Client-referenced figure: {brand.processServingSuccessRate} success rate (not a
                guarantee).
              </p>
            ) : null}
            {clientSuppliedNote && !brand.publishProcessServingSuccessRate ? (
              <p className="mt-6 border-l border-gold/30 pl-4 text-xs leading-relaxed text-text-muted">
                {clientSuppliedNote}
              </p>
            ) : null}
            <ButtonLink to="/contact" variant="secondary" className="mt-8">
              Inquire About This Service
            </ButtonLink>
          </div>

          <div data-service-media className="relative">
            <div className="absolute -inset-3 border border-gold/20" aria-hidden="true" />
            {!imgError && image ? (
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="relative aspect-[4/3] w-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] w-full bg-bg-panel" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
