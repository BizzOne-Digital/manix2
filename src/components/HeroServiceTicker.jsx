import { Fragment } from 'react'
import { brand } from '../data/brand'
import { useReducedMotion } from '../hooks/useMedia'

const labelClass =
  'whitespace-nowrap text-[0.5rem] font-medium uppercase tracking-[0.28em] text-gold sm:text-[0.5625rem] sm:tracking-[0.32em] md:text-[0.625rem] md:tracking-[0.38em]'

const separatorClass =
  'shrink-0 select-none px-6 text-gold/50 sm:px-10 md:px-14 lg:px-16'

function TickerItems({ className = '', keyPrefix = 't' }) {
  const items = brand.heroServiceTicker

  return (
    <div className={['flex shrink-0 items-center', className].join(' ')}>
      {items.map((label, index) => (
        <Fragment key={`${keyPrefix}-${index}`}>
          <span className={labelClass}>{label}</span>
          <span className={separatorClass} aria-hidden="true">|</span>
        </Fragment>
      ))}
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
        <TickerItems keyPrefix="a" />
        <TickerItems keyPrefix="b" aria-hidden="true" />
      </div>
    </div>
  )
}
