import { Reveal, RevealItem, RevealStagger } from './Reveal'

export default function TeamMemberProfile({ member }) {
  return (
    <article
      id={member.id}
      className="scroll-mt-28 border border-white/10 bg-bg-panel/40 p-6 sm:p-8 md:p-10"
    >
      <Reveal type="fade-up">
        <h3 className="font-display text-2xl text-text-primary md:text-3xl">{member.name}</h3>
        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {member.credentials}
        </p>
      </Reveal>

      <RevealStagger className="mt-6 space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        {member.bio.map((paragraph) => (
          <RevealItem key={paragraph.slice(0, 48)}>
            <p>{paragraph}</p>
          </RevealItem>
        ))}
      </RevealStagger>

      {member.practiceAreas?.length ? (
        <div className="mt-8 border-t border-white/10 pt-8">
          <Reveal type="fade-up">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">
              Representation and services
            </p>
          </Reveal>
          <ul className="mt-6 space-y-5">
            {member.practiceAreas.map((area) => (
              <li key={area.title} className="border-l border-gold/35 pl-4">
                <p className="font-display text-lg text-text-primary">{area.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{area.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}
