import { useRef } from 'react'
import PageHero from '../components/PageHero'
import InquiryForm from '../components/InquiryForm'
import { HeadlineReveal, Reveal, RevealImage, RevealLine } from '../components/Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ContactPage() {
  const pageRef = useRef(null)
  useScrollAnimations(pageRef)

  usePageMeta({
    title: `Contact | ${brand.fullName}`,
    description: `Contact ${brand.name} at ${brand.email} or ${brand.phone} to discuss your inquiry.`,
  })

  return (
    <div ref={pageRef} className="min-w-0 w-full overflow-x-clip">
      <PageHero
        eyebrow="Contact"
        title="Let's Discuss Your Matter."
        description="Share the general nature of your inquiry. We will respond through appropriate professional channels."
        image={siteImages.contact}
        align="left"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:grid-cols-2 md:px-8 lg:px-12">
          <div>
            <Reveal type="slide-left">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Direct contact</p>
            </Reveal>
            <RevealLine className="my-5 max-w-xs" />
            <HeadlineReveal
              className="font-display text-[clamp(2rem,3vw,2.5rem)]"
              lines={['Reach our team directly']}
            />
            <Reveal type="fade-up" delay={0.1} className="mt-8 block space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Email</p>
                <a
                  href={brand.mailto}
                  className="mt-2 block break-all font-display text-2xl text-gold transition-opacity hover:opacity-90 sm:break-normal sm:text-3xl"
                >
                  {brand.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Phone</p>
                <a
                  href={brand.phoneTel}
                  className="mt-2 block font-display text-3xl text-text-primary hover:text-gold"
                >
                  {brand.phone}
                </a>
              </div>
            </Reveal>
            <Reveal type="blur-in" delay={0.15} className="mt-10 block">
              <p className="max-w-md text-sm leading-relaxed text-text-muted">{brand.disclaimer}</p>
            </Reveal>
            <RevealImage className="mt-12 hidden md:block">
              <img
                src={siteImages.property.src}
                alt={siteImages.property.alt}
                width={siteImages.property.width}
                height={siteImages.property.height}
                loading="lazy"
                className="aspect-[16/10] w-full max-w-lg object-cover"
              />
            </RevealImage>
          </div>

          <Reveal type="slide-right" className="min-w-0 border border-white/10 bg-bg-panel p-6 sm:p-8 md:p-10">
            <h2 className="font-display text-2xl text-text-primary">Inquiry form</h2>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
