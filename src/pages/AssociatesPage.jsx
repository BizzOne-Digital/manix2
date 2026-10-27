import { useRef } from 'react'
import PageHero from '../components/PageHero'
import ContactCTA from '../components/ContactCTA'
import ParalegalServicesNote from '../components/ParalegalServicesNote'
import TeamMemberProfile from '../components/TeamMemberProfile'
import { HeadlineReveal, Reveal } from '../components/Reveal'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { teamMembers } from '../data/team'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AssociatesPage() {
  const pageRef = useRef(null)
  useScrollAnimations(pageRef)

  usePageMeta({
    title: `Associates | ${brand.fullName}`,
    description: `${brand.partnersSummary}`,
  })

  return (
    <div ref={pageRef} className="min-w-0 w-full overflow-x-clip">
      <PageHero
        eyebrow="Associates"
        titleLines={['Partners, Counsel,', '& Professional Support.']}
        description={brand.partnersSummary}
        image={siteImages.partners}
      />

      <section className="border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <Reveal type="fade-up">
            <p className="text-base leading-relaxed text-text-muted md:text-[1.0625rem]">
              Alongside investigators and field specialists, {brand.name} works with paralegals,
              attorneys, and forensic accounting experts so research, legal perspective, and
              financial analysis stay aligned on every file.
            </p>
          </Reveal>
          <ParalegalServicesNote className="mt-10" />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
          <HeadlineReveal
            className="font-display text-[clamp(2rem,calc( * var(--type-vw-scale)),3rem)]"
            lines={['Meet Our Associates']}
          />
          <div className="mt-12 space-y-10">
            {teamMembers.map((member) => (
              <TeamMemberProfile key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA heading="Let's Discuss Your Matter" />
    </div>
  )
}
