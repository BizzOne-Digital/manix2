import { brand } from '../data/brand'

export default function ParalegalServicesNote({ className = '' }) {
  return (
    <aside
      className={[
        'border border-gold/25 bg-bg-panel/50 p-6 md:p-8',
        className,
      ].join(' ')}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-gold">Paralegal Services</p>
      <p className="mt-3 text-base leading-relaxed text-text-muted md:text-[17px]">
        {brand.paralegalIntro}
      </p>
      <ul className="mt-4 space-y-2.5 text-base text-text-primary md:text-[17px]">
        {brand.paralegalSpecializations.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-gold" aria-hidden="true">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
