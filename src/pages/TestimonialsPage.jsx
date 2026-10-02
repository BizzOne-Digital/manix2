import { useRef } from 'react'
import PageHero from '../components/PageHero'
import TestimonialCard from '../components/TestimonialCard'
import ContactCTA from '../components/ContactCTA'
import ButtonLink from '../components/ButtonLink'
import {
  HeadlineReveal,
  Reveal,
  RevealItem,
  RevealStagger,
} from '../components/Reveal'
import { brand } from '../data/brand'
import { featuredServices } from '../data/services'
import {
  testimonials,
  testimonialsAreSamples,
  testimonialsEmptyMessage,
  testimonialsSampleNotice,
} from '../data/testimonials'
import { siteImages } from '../data/images'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'

export default function TestimonialsPage() {
  const pageRef = useRef(null)
  useScrollAnimations(pageRef)

  usePageMeta({
    title: `Testimonials | ${brand.fullName}`,
    description: `Read feedback from clients and professionals who have worked with ${brand.name}.`,
  })

  return (
    <div ref={pageRef}>
      <PageHero
        eyebrow="Testimonials"
        titleLines={['What clients', 'and partners say.']}
        description="Feedback on our investigation and information services—professional, clear, and focused on verified findings."
        image={siteImages.testimonialsHero}
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          {testimonials.length === 0 ? (
            <Reveal type="scale-in" className="block">
              <div className="border border-dashed border-gold/30 bg-bg-panel/40 px-8 py-16 text-center md:px-16">
                <p className="font-display text-2xl text-text-primary md:text-3xl">
                  {testimonialsEmptyMessage}
                </p>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
                  The overview below describes our services—it is not a customer endorsement. When
                  verified testimonials are supplied, they will appear in this section automatically.
                </p>
              </div>
            </Reveal>
          ) : (
            <>
              {testimonialsAreSamples ? (
                <Reveal type="fade-up" className="mb-10 block">
                  <p className="max-w-3xl border-l-2 border-gold/40 pl-4 text-sm leading-relaxed text-text-muted">
                    {testimonialsSampleNotice}
                  </p>
                </Reveal>
              ) : null}
              <RevealStagger className="grid gap-8 md:grid-cols-2">
                {testimonials.map((item) => (
                  <RevealItem key={`${item.name}-${item.quote.slice(0, 24)}`}>
                    <TestimonialCard {...item} />
                  </RevealItem>
                ))}
              </RevealStagger>
            </>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-bg-secondary py-20">
        <img
          src={siteImages.processServing.src}
          alt=""
          width={siteImages.processServing.width}
          height={siteImages.processServing.height}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-bg-secondary/90" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <Reveal type="clip-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Service overview</p>
          </Reveal>
          <HeadlineReveal
            className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)]"
            lines={['How we support', 'informed decisions']}
          />
          <RevealStagger className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredServices.map((s) => (
              <RevealItem key={s.id} className="border-l border-gold/40 pl-6">
                <p className="font-display text-lg text-text-primary">
                  {s.number} — {s.title}
                </p>
                <p className="mt-2 text-sm text-text-muted">{s.short}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal type="fade-up" delay={0.15} className="mt-10 inline-block">
            <ButtonLink to="/services" variant="secondary">
              Explore Services
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </div>
  )
}
