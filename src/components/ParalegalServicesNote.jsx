import { brand } from '../data/brand'
import { formatHeadingText } from '../lib/headingText'
import SiteEyebrow from './SiteEyebrow'

export default function ParalegalServicesNote({ className = '' }) {
  return (
    <aside
      className={[
        'border border-gold/25 bg-bg-panel/50 p-6 md:p-8',
        className,
      ].join(' ')}
    >
      <SiteEyebrow scale="panel">Paralegal Services</SiteEyebrow>
      <p className="mt-3 text-base leading-relaxed text-text-muted md:text-[17px]">
        {brand.paralegalIntro}
      </p>
      <ul className="mt-4 space-y-2.5 text-base text-text-primary md:text-[17px]">
        {brand.paralegalSpecializations.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-gold" aria-hidden="true">·</span>
            <span>{formatHeadingText(item)}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
