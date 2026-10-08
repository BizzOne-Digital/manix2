import { Link, useLocation } from 'react-router-dom'
import { aboutMenu } from '../data/navigation'

export default function AboutPeopleNav({ className = '' }) {
  const location = useLocation()
  const onAbout = location.pathname === '/about'

  return (
    <nav
      aria-label="About page sections and profiles"
      className={[
        'rounded-sm border border-white/10 bg-bg-panel/50 p-5 md:p-6',
        className,
      ].join(' ')}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
        Jump to
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {aboutMenu.map((item) => {
          const active =
            onAbout &&
            (item.hash ? location.hash === item.hash : !location.hash || location.hash === '')
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={[
                  'block border-l-2 py-1.5 pl-3 text-sm transition-colors',
                  active
                    ? 'border-gold text-gold-light'
                    : 'border-gold/25 text-text-muted hover:border-gold/60 hover:text-text-primary',
                ].join(' ')}
              >
                <span className="font-medium text-text-primary">{item.label}</span>
                {item.hint ? (
                  <span className="mt-0.5 block text-xs text-text-muted">{item.hint}</span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
