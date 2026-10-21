import { brand } from '../data/brand'
import { useReducedMotion } from '../hooks/useMedia'

function TickerItems({ className = '', keyPrefix = 't' }) {
  const items = brand.heroServiceTicker
  return (
    <div className={['flex shrink-0 items-center', className].join(' ')}>
      {items.map((label, index) => (
        <span
          key={`${keyPrefix}-${label}`}
          className="flex shrink-0 items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20"
        >
          <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.28em] text-gold sm:text-[9px] sm:tracking-[0.32em] md:text-[10px] md:tracking-[0.38em]">
            {label}
          </span>
          {index < items.length - 1 ? (
            <span className="text-gold/45 select-none" aria-hidden="true">|</span>
          ) : null}
        </span>
      ))}
      <span className="ml-8 shrink-0 text-gold/45 select-none sm:ml-12 md:ml-16" aria-hidden="true">
        |
      </span>
    </div>
  )
}

export default function HeroServiceTicker() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="min-w-0 flex-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TickerItems className="px-2 py-0.5" />
      </div>
    )
  }

  return (
    <div
      className="hero-ticker-mask relative min-w-0 flex-1 overflow-hidden"
      aria-label="Services overview"
    >
      <div className="hero-ticker-track flex w-max items-center">
        <TickerItems keyPrefix="a" className="pr-8 sm:pr-12 md:pr-16" />
        <TickerItems keyPrefix="b" className="pr-8 sm:pr-12 md:pr-16" aria-hidden="true" />
      </div>
    </div>
  )
}
