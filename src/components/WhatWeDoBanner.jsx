import { Link } from 'react-router-dom'
import ButtonLink from './ButtonLink'
import { HeadlineReveal, Reveal, RevealItem, RevealStagger } from './Reveal'
import { brand } from '../data/brand'
import { featuredServices } from '../data/services'

export default function WhatWeDoBanner() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-28 border-b border-white/5 bg-bg-secondary py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        <Reveal type="fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">What we do</p>
        </Reveal>
        <HeadlineReveal
          className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight"
          lines={[brand.whatWeDoHeadline]}
        />
        <Reveal type="fade-up" delay={0.08} className="mt-5 block max-w-3xl text-base leading-relaxed text-text-muted">
          {brand.whatWeDoSummary}
        </Reveal>

        <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-3">
          <RevealItem className="border border-white/10 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">40+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">Years in business</p>
          </RevealItem>
          <RevealItem className="border border-gold/30 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">{brand.processServersCanada}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">
              Process servers across Canada
            </p>
          </RevealItem>
          <RevealItem className="border border-white/10 bg-bg-panel/60 p-6 text-center">
            <p className="font-display text-4xl text-gold">{featuredServices.length}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">Core service areas</p>
          </RevealItem>
        </RevealStagger>

        <RevealStagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <RevealItem key={service.id}>
              <Link
                to={`/services#${service.anchor}`}
                className="block border-l-2 border-gold/50 py-2 pl-4 transition-colors hover:border-gold hover:text-gold-light"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{service.number}</p>
                <p className="mt-1 font-display text-lg text-text-primary">{service.title}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/services" showArrow>View all services</ButtonLink>
          <ButtonLink to="/contact" variant="secondary" showArrow>Contact us</ButtonLink>
        </div>

        <Reveal type="fade-up" delay={0.1} className="mt-10 block border border-white/10 bg-bg-panel/40 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Legal support team</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {brand.paralegalTeamNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
