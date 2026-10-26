import { Link } from 'react-router-dom'
import ButtonLink from './ButtonLink'
import { HeadlineReveal, Reveal, RevealItem, RevealStagger } from './Reveal'
import { brand } from '../data/brand'
import { useServicesContent } from '../hooks/useServicesContent'

export default function WhatWeDoBanner() {
  const { featuredServices } = useServicesContent()

  return (
    <section
      id="what-we-do"
      className="scroll-mt-28 border-b border-white/5 bg-bg-secondary py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <Reveal type="fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">What We Do</p>
        </Reveal>
        <HeadlineReveal
          className="mt-3 max-w-full font-display text-[clamp(1.125rem,2.75vw,2.875rem)] leading-[1.2] whitespace-nowrap"
          lines={[brand.whatWeDoHeadline]}
        />
        <Reveal type="fade-up" delay={0.08} className="mt-5 block max-w-3xl text-base leading-relaxed text-text-muted md:text-[17px]">
          {brand.whatWeDoSummary}
        </Reveal>

        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-3">
          <RevealItem className="border border-white/10 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">40+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">Years In Business</p>
          </RevealItem>
          <RevealItem className="border border-gold/30 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">{brand.processServersCanada}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">
              Process Servers Across Canada
            </p>
          </RevealItem>
          <RevealItem className="border border-white/10 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">{featuredServices.length}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">Core Service Areas</p>
          </RevealItem>
        </RevealStagger>

        <RevealStagger className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-5">
          {featuredServices.map((service) => {
            const displayTitle = service.bannerTitle ?? service.title
            return (
              <RevealItem key={service.id} className="min-w-0">
                <Link
                  to={`/services#${service.anchor}`}
                  className="block min-w-0 border-l-2 border-gold/50 py-2 pl-2 pr-0 text-left transition-colors hover:border-gold hover:text-gold-light"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{service.number}</p>
                  <p
                    className="what-we-do-service-title mt-1 min-w-0 font-display text-text-primary"
                    title={typeof service.title === 'string' ? service.title : undefined}
                  >
                    {displayTitle}
                  </p>
                </Link>
              </RevealItem>
            )
          })}
        </RevealStagger>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/services" showArrow>View All Services</ButtonLink>
          <ButtonLink to="/associates" variant="secondary" showArrow>Meet Associates</ButtonLink>
        </div>
      </div>
    </section>
  )
}
