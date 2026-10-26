import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ButtonLink from '../components/ButtonLink'
import ContactCTA from '../components/ContactCTA'
import WhatWeDoBanner from '../components/WhatWeDoBanner'
import HeroHeadline from '../components/HeroHeadline'
import HeroServiceTicker from '../components/HeroServiceTicker'
import { ChevronDownIcon } from '../components/HeroVisuals'
import {
  HeadlineReveal,
  Reveal,
  RevealImage,
  RevealItem,
  RevealLine,
  RevealStagger,
} from '../components/Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { useServicesContent } from '../hooks/useServicesContent'
import { resolveServiceImageMeta } from '../lib/resolveImageSrc'
import { useHeroParallax, useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useMedia'

const professions = [
  { title: 'Lawyers', copy: 'Counsel and firms seeking disciplined investigation support and clear reporting.' },
  { title: 'Paralegals', copy: 'Licensed professionals supporting tribunal, tenancy, and court-related matters.' },
  { title: 'Mortgage Brokers', copy: 'Lenders and brokers assessing applicants, investors, and associated risk factors.' },
  { title: 'Real Estate Professionals', copy: 'Agents and advisors who need verified background on people and properties.' },
  { title: 'Landlords', copy: 'Owners evaluating tenants, applicants, and compliance-related information.' },
  { title: 'Tenants', copy: 'Renters seeking clarity on disputes, applications, and related records.' },
  { title: 'Financial Advisors', copy: 'Professionals assessing solvency, assets, and financial relationships.' },
  { title: 'Community Members', copy: 'Individuals who need verified information before personal or financial decisions.' },
]

const approachSteps = [
  {
    step: '1',
    title: 'Understand The Matter',
    copy: 'We clarify objectives, constraints, and what decisions the information should support.',
  },
  {
    step: '2',
    title: 'Research Relevant Information',
    copy: 'Persistent inquiry across lawful sources, records, and verifiable leads.',
  },
  {
    step: '3',
    title: 'Verify The Findings',
    copy: 'Cross-checking and independent confirmation before conclusions are drawn.',
  },
  {
    step: '4',
    title: 'Communicate Useful Information',
    copy: 'Professional reporting structured for practical use, not speculation.',
  },
]

export default function HomePage() {
  const { featuredServices } = useServicesContent()

  usePageMeta({
    title: brand.fullName,
    description:
      'Celebrated and award-winning investigators offering specialized research, verification, and information gathering.',
  })

  const pageRef = useRef(null)
  const reduced = useReducedMotion()
  const [heroImgError, setHeroImgError] = useState(false)

  useScrollAnimations(pageRef)
  useHeroParallax(pageRef)

  useEffect(() => {
    if (reduced || !pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-eyebrow]',
        { y: 24, immediateRender: false },
        { y: 0, duration: 0.9, ease: 'power2.out', delay: 0.15 },
      )
      gsap.fromTo(
        '[data-hero-cta] > *',
        { y: 20, immediateRender: false },
        { y: 0, duration: 0.7, stagger: 0.1, delay: 0.85, ease: 'power2.out' },
      )
      gsap.fromTo(
        '[data-hero-support]',
        { y: 16, immediateRender: false },
        { y: 0, duration: 0.8, delay: 0.65, ease: 'power2.out' },
      )
      gsap.fromTo(
        '[data-hero-ticker]',
        { y: 20, immediateRender: false },
        { y: 0, duration: 0.8, delay: 1.05, ease: 'power2.out' },
      )
    }, pageRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={pageRef} className="min-w-0 w-full overflow-x-clip">
      <section
        data-hero
        className="relative min-h-[100svh] overflow-hidden bg-black hero-light-sweep"
      >
        <div className="absolute inset-0">
          {!heroImgError ? (
            <img
              data-hero-image
              src={siteImages.hero.src}
              alt={siteImages.hero.alt}
              width={siteImages.hero.width}
              height={siteImages.hero.height}
              className="h-full w-full object-cover object-[68%_center]"
              fetchPriority="high"
              onError={() => setHeroImgError(true)}
            />
          ) : (
            <div className="h-full bg-bg-secondary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black from-25% via-black/55 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(212,175,55,0.18),transparent_42%)]" />
        </div>

        <div
          data-hero-float
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-4 pb-24 pt-32 sm:px-5 sm:pb-28 sm:pt-36 md:px-10 md:pb-32 md:pt-40 lg:px-16 lg:pt-44"
        >
          <div className="min-w-0 w-full max-w-3xl lg:max-w-5xl">
            <p
              data-hero-eyebrow
              className="mb-2 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light/90 sm:tracking-[0.38em] md:text-xs md:tracking-[0.45em]"
            >
              {brand.yearsEyebrow}
            </p>
            <HeroHeadline />
            <p
              data-hero-support
              className="mt-6 max-w-xl text-sm font-normal leading-relaxed text-white/85 md:text-base md:leading-relaxed"
            >
              {brand.whatWeDoSummary}
            </p>
            <div data-hero-cta className="mt-9 flex flex-wrap gap-4">
              <ButtonLink to="/#what-we-do" showArrow>
                What we do
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary" showArrow>
                All services
              </ButtonLink>
              <ButtonLink to="/contact" variant="ghost" showArrow>
                Contact
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          data-hero-ticker
          className="absolute inset-x-0 bottom-0 z-20 border-t border-gold/45 bg-black/35 backdrop-blur-[2px]"
        >
          <div className="mx-auto flex max-w-[1600px] min-w-0 items-center justify-between gap-4 px-4 py-3.5 sm:gap-6 sm:px-5 sm:py-4 md:px-10 lg:px-16">
            <HeroServiceTicker />
            <a
              href="#intro-section"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/80 text-gold transition-colors hover:border-gold hover:bg-gold/10"
              aria-label="Scroll to content below"
            >
              <ChevronDownIcon />
            </a>
          </div>
        </div>
      </section>

      <WhatWeDoBanner />

      <section
        id="intro-section"
        className="border-b border-white/5 bg-bg-secondary py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:grid-cols-2 md:items-center md:px-8 lg:gap-20 lg:px-12">
          <div>
            <Reveal type="slide-left" delay={0}>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Introduction</p>
            </Reveal>
            <RevealLine className="my-5 max-w-xs" />
            <HeadlineReveal
              className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight"
              lines={['Clarity Before Your', 'Next Decision.']}
            />
            <Reveal type="blur-in" delay={0.15} className="mt-6 block">
              <p className="text-base leading-relaxed text-text-muted">
                {brand.fullName} brings together specialists in investigation and information
                gathering, with an emphasis on research, persistence, verification, and the
                information you need before important decisions.
              </p>
            </Reveal>
            <Reveal type="scale-in" delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/about" variant="ghost">
                About the firm
              </ButtonLink>
              <ButtonLink to="/about#founder" variant="ghost">
                Founder&apos;s bio
              </ButtonLink>
              <ButtonLink to="/about#team" variant="ghost">
                Team bios
              </ButtonLink>
            </Reveal>
          </div>
          <RevealImage className="min-w-0">
            <img
              src={siteImages.intro.src}
              alt={siteImages.intro.alt}
              width={siteImages.intro.width}
              height={siteImages.intro.height}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <Reveal
              type="rotate-in"
              delay={0.25}
              className="absolute bottom-0 left-0 sm:-bottom-4 sm:-left-4"
            >
              <span className="block border border-gold/40 bg-bg-main px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-gold sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.25em]">
                Research · Verify · Decide
              </span>
            </Reveal>
          </RevealImage>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal type="fade-up">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Services</p>
              </Reveal>
              <HeadlineReveal
                className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)]"
                lines={['Featured Capabilities']}
              />
            </div>
            <Reveal type="slide-right" className="md:pb-2">
              <Link to="/services" className="text-sm text-gold underline-offset-4 hover:underline">
                View all services
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredServices.map((service) => {
              const cardImage = resolveServiceImageMeta(service)
              return (
              <Link
                key={service.id}
                to={`/services#${service.anchor}`}
                data-service-card
                className="group relative min-h-[280px] overflow-hidden border border-white/10 bg-bg-panel p-8 transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)] md:p-10"
              >
                {cardImage ? (
                  <>
                    <img
                      src={cardImage.src}
                      alt=""
                      width={cardImage.width}
                      height={cardImage.height}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-panel via-bg-panel/95 to-bg-panel/75" />
                  </>
                ) : null}
                <div className="absolute right-4 top-4 z-10 font-display text-5xl text-gold/15 transition-all duration-500 group-hover:scale-110 group-hover:text-gold/35">
                  {service.number}
                </div>
                <div className="relative z-10">
                <h3 className="max-w-[85%] font-display text-2xl text-text-primary md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{service.short}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            )})}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 py-20 md:py-24">
        <img
          src={siteImages.whoWeHelp.src}
          alt=""
          width={siteImages.whoWeHelp.width}
          height={siteImages.whoWeHelp.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bg-secondary/88" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <Reveal type="clip-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Who We Help</p>
          </Reveal>
          <HeadlineReveal
            className="mt-3 max-w-2xl font-display text-[clamp(2.125rem,4.5vw,3.25rem)]"
            lines={['Professions We Serve']}
          />
          <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {professions.map((item) => (
              <RevealItem
                key={item.title}
                className="group border-t border-gold/40 pt-6 transition-colors hover:border-gold"
              >
                <h3 className="font-display text-xl text-text-primary transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-muted">{item.copy}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:grid-cols-[1fr_1.1fr] md:px-8 lg:px-12">
          <RevealImage className="order-2 md:order-1">
            <img
              src={siteImages.partners.src}
              alt={siteImages.partners.alt}
              width={siteImages.partners.width}
              height={siteImages.partners.height}
              loading="lazy"
              className="aspect-[16/11] w-full object-cover"
            />
          </RevealImage>
          <div className="order-1 flex flex-col justify-center md:order-2">
            <Reveal type="slide-right">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Partners & Associates</p>
            </Reveal>
            <RevealLine className="my-5 max-w-sm" />
            <HeadlineReveal
              className="font-display text-[clamp(1.875rem,3.75vw,2.875rem)] leading-snug"
              lines={['Licensed Professionals On Your Side']}
            />
            <Reveal type="fade-up" delay={0.12} className="mt-6 block">
              <p className="text-base leading-relaxed text-text-muted md:text-[17px]">
                {brand.partnersSummary} Nothing on this site establishes an attorney-client
                relationship.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.18} className="mt-6 inline-block">
              <Link
                to="/associates"
                className="text-base text-gold underline-offset-4 hover:underline"
              >
                View Associates Page
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 bg-bg-panel pb-12 pt-16 md:pb-14 md:pt-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal type="fade-up">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Approach</p>
              </Reveal>
              <HeadlineReveal
                className="mt-3 font-display text-[clamp(2.125rem,4.5vw,3.25rem)]"
                lines={['How We Work']}
              />
              <Reveal type="fade-up" delay={0.1} className="mt-6 block max-w-md text-base leading-relaxed text-text-muted">
                A consistent sequence, from understanding the matter through to clear
                communication, so you receive verified information you can use.
              </Reveal>
            </div>

            <RevealStagger className="relative space-y-0 border-l border-gold/30 pl-6 sm:pl-8 md:pl-10">
              {approachSteps.map((item) => (
                <RevealItem
                  key={item.step}
                  className="border-b border-white/5 py-6 first:pt-0 last:border-b-0 last:pb-0 md:py-7"
                >
                  <p className="font-display text-4xl text-gold">{item.step}.</p>
                  <h3 className="mt-2 font-display text-xl text-text-primary md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">{item.copy}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      <ContactCTA className="border-t-0 pt-0" />
    </div>
  )
}
