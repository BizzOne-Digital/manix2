import { Link } from 'react-router-dom'
import { useMagneticButton } from '../hooks/useMagneticButton'
import { useReducedMotion } from '../hooks/useMedia'

const variants = {
  primary: 'btn-gold-fill border border-gold/30 hover:brightness-105',
  secondary:
    'border border-gold/70 bg-transparent text-text-primary hover:border-gold hover:bg-gold/5',
  ghost: 'border border-white/15 text-text-primary hover:border-gold/40 hover:text-gold',
}

function Arrow() {
  return (
    <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
      →
    </span>
  )
}

export default function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  magnetic = true,
  showArrow = false,
  ...rest
}) {
  const reduced = useReducedMotion()
  const magneticRef = useMagneticButton(magnetic && !reduced)

  return (
    <Link
      ref={magneticRef}
      to={to}
      className={[
        'group inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-[background,border-color,color,transform,filter] duration-300 will-change-transform',
        variants[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
      {showArrow ? <Arrow /> : null}
    </Link>
  )
}

export function ButtonExternal({
  href,
  children,
  variant = 'secondary',
  className = '',
  magnetic = true,
  showArrow = false,
  ...rest
}) {
  const reduced = useReducedMotion()
  const magneticRef = useMagneticButton(magnetic && !reduced)

  return (
    <a
      ref={magneticRef}
      href={href}
      className={[
        'group inline-flex items-center justify-center rounded-sm px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-[background,border-color,color] duration-300 will-change-transform',
        variants[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
      {showArrow ? <Arrow /> : null}
    </a>
  )
}
