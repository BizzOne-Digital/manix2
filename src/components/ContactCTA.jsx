import { Link } from 'react-router-dom'
import ButtonLink from './ButtonLink'
import { HeadlineReveal, Reveal, RevealLine } from './Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'

export default function ContactCTA({
  heading = 'Make Your Next Decision with Greater Clarity.',
  description = 'Describe the general nature of your inquiry. We will respond through appropriate professional channels.',
  className = '',
}) {
  const headingLines = heading.includes('.')
    ? heading
        .split('.')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part, i, arr) => (i < arr.length - 1 ? `${part}.` : part))
    : [heading]

  return (
    <section
      className={[
        'relative overflow-hidden border-y border-white/5 bg-bg-panel',
        className,
      ].join(' ')}
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 bg-gradient-to-l from-gold/5 to-transparent" />
      <img
        src={siteImages.approach.src}
        alt=""
        width={siteImages.approach.width}
        height={siteImages.approach.height}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-bg-panel/92" />
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:items-end md:px-8 lg:px-12 lg:py-28">
        <div>
          <Reveal type="slide-left">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Inquiry</p>
          </Reveal>
          <RevealLine className="mb-5 max-w-xs" />
          <HeadlineReveal
            className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-text-primary"
            lines={headingLines.length > 1 ? headingLines : [heading]}
          />
          <Reveal type="blur-in" delay={0.12} className="mt-5 block">
            <p className="max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
              {description}
            </p>
          </Reveal>
        </div>
        <Reveal type="slide-right" className="space-y-5 border-l border-gold/30 pl-0 md:pl-10">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Email</p>
            <a
              href={brand.mailto}
              className="mt-2 block font-display text-2xl text-gold transition-opacity hover:opacity-80 md:text-3xl"
            >
              {brand.email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Phone</p>
            <a
              href={brand.phoneTel}
              className="mt-2 block font-display text-2xl text-text-primary transition-colors hover:text-gold md:text-3xl"
            >
              {brand.phone}
            </a>
          </div>
          <ButtonLink to="/contact" variant="primary" className="mt-4">
            Discuss Your Matter
          </ButtonLink>
          <p className="text-xs leading-relaxed text-text-muted">
            Prefer email?{' '}
            <Link to="/contact" className="text-gold underline-offset-2 hover:underline">
              Use our inquiry form
            </Link>{' '}
            to prepare a message in your email application.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
