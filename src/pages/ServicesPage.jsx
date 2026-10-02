import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import PageHero from '../components/PageHero'
import ServiceSection from '../components/ServiceSection'
import ContactCTA from '../components/ContactCTA'
import { Reveal } from '../components/Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { featuredServices, serviceDetails } from '../data/services'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ServicesPage() {
  const location = useLocation()
  const pageRef = useRef(null)
  useScrollAnimations(pageRef)

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [location.hash])

  usePageMeta({
    title: `Services | ${brand.fullName}`,
    description: `Process serving, skip tracing, background verification, and solvency investigations from ${brand.name}.`,
  })

  return (
    <div ref={pageRef} className="min-w-0 w-full overflow-x-clip">
      <PageHero
        eyebrow="Capabilities"
        titleLines={['Investigation &', 'information services.']}
        description="Four focused service areas—each supported by research, verification, and professional communication."
        image={siteImages.servicesHero}
      />

      <nav
        aria-label="On this page"
        className="sticky top-[68px] z-40 max-w-full overflow-hidden border-b border-white/5 bg-bg-main/90 backdrop-blur-md sm:top-[72px]"
      >
        <Reveal
          type="fade-up"
          start="top 98%"
          className="mx-auto flex max-w-[1440px] gap-3 overflow-x-auto overscroll-x-contain px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-5 sm:py-4 md:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {featuredServices.map((s) => (
            <a
              key={s.id}
              href={`#${s.anchor}`}
              className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted transition-all duration-300 hover:border-gold/40 hover:bg-gold/5 hover:text-gold"
            >
              {s.number} · {s.title.split(' ')[0]}
            </a>
          ))}
        </Reveal>
      </nav>

      {serviceDetails.map((service, index) => (
        <ServiceSection
          key={service.id}
          id={service.id}
          number={service.number}
          title={service.title}
          summary={service.summary}
          body={service.body}
          image={siteImages[service.imageKey]}
          reverse={index % 2 === 1}
          clientSuppliedNote={service.clientSuppliedNote}
          showClientRate={service.id === 'process-serving'}
        />
      ))}

      <section className="border-t border-white/5 bg-bg-secondary py-16">
        <Reveal type="blur-in" className="mx-auto max-w-[1440px] px-5 text-center md:px-8 lg:px-12">
          <p className="text-sm text-text-muted">
            Unsure which service fits your situation?{' '}
            <Link to="/contact" className="text-gold underline-offset-2 hover:underline">
              Contact us
            </Link>{' '}
            with a general description of your inquiry.
          </p>
        </Reveal>
      </section>

      <ContactCTA
        heading="Request information about our services."
        description="We welcome inquiries from community members, legal professionals, and financial professionals. Outline your matter in general terms to begin."
      />
    </div>
  )
}
