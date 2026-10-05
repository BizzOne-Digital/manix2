import { useRef } from 'react'
import PageHero from '../components/PageHero'
import ContactCTA from '../components/ContactCTA'
import ButtonLink from '../components/ButtonLink'
import { HeadlineReveal, Reveal, RevealImage, RevealItem, RevealLine, RevealStagger } from '../components/Reveal'
import FounderProfile from '../components/FounderProfile'
import TeamMemberProfile from '../components/TeamMemberProfile'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { teamMembers } from '../data/team'
import { useScrollAnimations } from '../hooks/useScrollAnimations'
import { usePageMeta } from '../hooks/usePageMeta'

const values = [
  {
    title: 'Thorough research',
    copy: 'Investigation begins with disciplined inquiry—following leads, documenting sources, and pursuing depth rather than shortcuts.',
  },
  {
    title: 'Verified information',
    copy: 'Findings are cross-checked where possible so conclusions reflect what the record supports, not speculation.',
  },
  {
    title: 'Professional communication',
    copy: 'Reports and updates are structured for clarity, discretion, and practical use by clients and counsel.',
  },
  {
    title: 'Informed decisions',
    copy: 'The objective is useful information that helps you decide how to proceed—not promises about legal outcomes.',
  },
]

export default function AboutPage() {
  const pageRef = useRef(null)
  useScrollAnimations(pageRef)

  usePageMeta({
    title: `About Us | ${brand.fullName}`,
    description: `Learn about ${brand.name}—over 40 years in business, research-led investigation, and verified information gathering.`,
  })

  return (
    <div ref={pageRef} className="min-w-0 w-full overflow-x-clip">
      <PageHero
        eyebrow={brand.yearsEyebrow}
        titleLines={['A disciplined practice', 'built on research.']}
        description={`${brand.fullName} assembles specialists across investigation and information gathering for clients who need clarity before they act.`}
        image={siteImages.aboutHero}
      />

      <section className="border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-12">
          <div>
            <Reveal type="slide-left">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Our story</p>
            </Reveal>
            <RevealLine className="my-5 max-w-xs" />
            <HeadlineReveal
              className="font-display text-[clamp(2rem,3.5vw,3rem)] leading-tight"
              lines={['Experience returned to', 'professional work.']}
            />
            <RevealStagger className="mt-8 space-y-5 text-base leading-relaxed text-text-muted">
            <RevealItem>
              <p>
                An experienced investigator returned to professional work with the intention of
                assembling specialists across investigation and information gathering. The practice
                reflects decades of field and research experience, oriented toward persistence,
                independent verification, and the details that matter before a decision is made.
              </p>
            </RevealItem>
            <RevealItem>
              <p>
                {brand.fullName} emphasizes depth of investigation—not spectacle. Work is conducted
                with discretion and professionalism, whether the matter involves locating an
                individual, verifying an application, or understanding financial and corporate
                relationships within lawful bounds.
              </p>
            </RevealItem>
            <RevealItem>
              <p>
                Our partners and in-house associates include paralegals and attorneys, bringing
                together investigative experience and professional perspectives. Contacting us does
                not automatically create an attorney-client relationship.
              </p>
            </RevealItem>
          </RevealStagger>
          </div>
          <RevealImage>
            <img
              src={siteImages.aboutStory.src}
              alt={siteImages.aboutStory.alt}
              width={siteImages.aboutStory.width}
              height={siteImages.aboutStory.height}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </RevealImage>
        </div>
      </section>

      <section id="founder" className="scroll-mt-28 border-b border-white/5 bg-bg-main py-20 md:py-28">
        <FounderProfile />
      </section>

      <section className="relative overflow-hidden bg-bg-secondary py-20 md:py-28">
        <img
          src={siteImages.aboutValues.src}
          alt=""
          width={siteImages.aboutValues.width}
          height={siteImages.aboutValues.height}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-bg-secondary/90" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 lg:px-12">
          <Reveal type="clip-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Values</p>
          </Reveal>
          <HeadlineReveal
            className="mt-3 font-display text-[clamp(2rem,3vw,2.75rem)]"
            lines={['What guides our work']}
          />
          <RevealStagger className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((item, index) => (
              <RevealItem
                key={item.title}
                className="border border-white/10 bg-bg-panel/50 p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10"
              >
                <p className="font-display text-4xl text-gold/40">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-2xl text-text-primary">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{item.copy}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 border-b border-white/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
          <Reveal type="clip-up">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Team & associates</p>
          </Reveal>
          <HeadlineReveal
            className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)]"
            lines={['Investigators, counsel, and', 'professional support.']}
          />
          <Reveal type="fade-up" delay={0.08} className="mt-6 block max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
            Our team includes senior investigators, counsel, and licensed professionals who work with{' '}
            {brand.name} on skip tracing, forensic claims, litigation support, and client-facing
            legal services. Profiles below are for
            general information; engaging a specific professional may require a separate agreement.
          </Reveal>
          <div className="mt-12 space-y-10">
            {teamMembers.map((member) => (
              <TeamMemberProfile key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-12">
          <RevealImage className="order-2 lg:order-1">
            <img
              src={siteImages.archive.src}
              alt={siteImages.archive.alt}
              width={siteImages.archive.width}
              height={siteImages.archive.height}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </RevealImage>
          <div className="order-1 lg:order-2">
          <Reveal type="fade-up" className="max-w-2xl">
            <p className="text-base text-text-muted">
              Ready to outline your matter? Share the general nature of your inquiry by email, phone,
              or our contact form.
            </p>
          </Reveal>
          <Reveal type="scale-in" delay={0.1}>
            <ButtonLink to="/contact">Discuss Your Matter</ButtonLink>
          </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA heading="Speak with our team." />
    </div>
  )
}
