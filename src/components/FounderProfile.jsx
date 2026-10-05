import { HeadlineReveal, Reveal, RevealItem, RevealLine, RevealStagger } from './Reveal'
import { founderProfile } from '../data/founder'
import { siteImages } from '../data/images'

export default function FounderProfile() {
  const { opening, sections, standard, signoff } = founderProfile

  return (
    <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
      <Reveal type="clip-up">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{founderProfile.eyebrow}</p>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <p className="font-display text-[clamp(3rem,12vw,5.5rem)] leading-none tracking-tight text-gold/90">
            {founderProfile.displayName}
          </p>
          <Reveal type="fade-up" className="mt-4 block">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-text-primary">
              {founderProfile.title}
            </p>
            <p className="mt-2 text-sm text-text-muted">{founderProfile.organization}</p>
          </Reveal>
          <RevealLine className="my-8 max-w-md" />

          <RevealStagger className="space-y-5 text-base leading-relaxed text-text-muted">
            {opening.contrast.map((line) => (
              <RevealItem key={line}>
                <p className={line.includes('latter') ? 'font-display text-xl text-text-primary md:text-2xl' : ''}>
                  {line}
                </p>
              </RevealItem>
            ))}
            {opening.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <RevealStagger className="mt-8 space-y-5 border-l border-gold/30 pl-6 text-sm leading-relaxed text-text-muted md:text-base">
            {opening.accomplishments.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <Reveal type="fade-up" className="hidden lg:block">
          <img
            src={siteImages.approach.src}
            alt="Professional research and investigation workspace"
            width={siteImages.approach.width}
            height={siteImages.approach.height}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="mt-16 border-t border-white/10 pt-16 md:mt-20 md:pt-20">
          <HeadlineReveal
            className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] text-text-primary"
            lines={[section.title]}
          />
          <RevealStagger className="mt-8 max-w-3xl space-y-5 text-sm leading-relaxed text-text-muted md:text-base">
            {section.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 48)}>
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          {section.motto ? (
            <Reveal type="scale-in" delay={0.1} className="mt-10 inline-block">
              <p className="border border-gold/40 bg-bg-panel/60 px-6 py-5 font-display text-lg leading-snug text-gold-light md:text-xl">
                {section.motto}
              </p>
            </Reveal>
          ) : null}
        </div>
      ))}

      <div className="relative mt-20 overflow-hidden border border-white/10 bg-bg-panel/50 py-12 md:mt-24 md:py-16">
        <img
          src={siteImages.aboutValues.src}
          alt=""
          width={siteImages.aboutValues.width}
          height={siteImages.aboutValues.height}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-10">
          <Reveal type="fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{standard.title}</p>
          </Reveal>
          <Reveal type="fade-up" delay={0.06} className="mt-6 block text-base text-text-muted">
            {standard.intro}
          </Reveal>
          <p className="mt-4 font-display text-2xl text-text-primary md:text-3xl">{standard.thesis}</p>

          <ul className="mt-8 space-y-3 border-l border-gold/40 pl-5">
            {standard.scenarios.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-text-muted md:text-base">
                {item}
              </li>
            ))}
          </ul>

          <RevealStagger className="mt-8 space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
            {standard.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <RevealStagger className="mt-10 space-y-2 font-display text-lg text-text-primary md:text-xl">
            {standard.pillars.map((line) => (
              <RevealItem key={line}>
                <p>{line}</p>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal type="fade-up" delay={0.1} className="mt-8 block">
            <p className="text-base text-text-muted">{standard.closing}</p>
            <p className="mt-3 font-display text-2xl text-gold md:text-3xl">{standard.mantra}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start border-t border-gold/30 pt-10 md:mt-20">
        <div className="h-px w-16 bg-gold/60" aria-hidden="true" />
        <Reveal type="fade-up" className="mt-8 block">
          <p className="font-display text-3xl text-text-primary">{signoff.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">{signoff.title}</p>
          <p className="mt-1 text-sm text-text-muted">{signoff.organization}</p>
        </Reveal>
      </div>
    </div>
  )
}
