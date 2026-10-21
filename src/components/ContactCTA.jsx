import { Link } from 'react-router-dom'
import ButtonLink from './ButtonLink'
import { HeadlineReveal, Reveal, RevealLine } from './Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'

export default function ContactCTA({
  heading = "Let's Discuss Your Matter",
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 top-0 h-full w-1/2 max-w-full bg-gradient-to-l from-gold/5 to-transparent" />
      </div>
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
      <div className="relative z-10 mx-auto grid min-w-0 max-w-[1440px] gap-10 px-4 py-16 sm:px-5 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-end md:px-8 lg:px-12 lg:py-28">
        <div className="min-w-0">
          <Reveal type="slide-left">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Inquiry</p>
          </Reveal>
          <RevealLine className="mb-5 max-w-xs" />
          <HeadlineReveal
            className="font-display text-[clamp(2.125rem,4.5vw,3.5rem)] leading-tight text-text-primary"
            lines={headingLines.length > 1 ? headingLines : [heading]}
          />
          <Reveal type="blur-in" delay={0.12} className="mt-5 block">
            <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-[17px]">
              {description}
            </p>
          </Reveal>
        </div>
        <Reveal type="slide-right" className="min-w-0 space-y-5 border-t border-gold/30 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Connect</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {brand.socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-bg-main/80 text-2xl transition-colors hover:border-gold/50 hover:bg-gold/10"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <span aria-hidden="true">{item.emoji}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
          <p className="text-sm leading-relaxed text-text-muted">
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
