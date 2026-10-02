import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { brand } from '../data/brand'
import { ctaNav, mainNav } from '../data/navigation'
import { useHeaderScroll } from '../hooks/useHeaderScroll'
import { useReducedMotion } from '../hooks/useMedia'

function NavLinkContent({ label, isActive, transparent }) {
  return (
    <span
      className={[
        'group relative inline-block text-[15px] font-medium tracking-[0.05em] transition-colors duration-300 md:text-base',
        isActive
          ? 'text-gold-light'
          : transparent
            ? 'text-gold/85 hover:text-gold-light'
            : 'text-text-muted hover:text-text-primary',
      ].join(' ')}
    >
      {label}
      <span
        className={[
          'absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300',
          isActive ? 'w-full' : 'w-0 group-hover:w-full',
        ].join(' ')}
      />
    </span>
  )
}

export default function Header({ transparentAtTop = false }) {
  const scrolled = useHeaderScroll(40)
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const isHome = location.pathname === '/'
  const transparent = transparentAtTop && isHome && !scrolled && !open

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (reduced || !panelRef.current) return
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.55, ease: 'power3.out' },
      )
      gsap.fromTo(
        panelRef.current.querySelectorAll('[data-nav-item]'),
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.06,
          delay: 0.12,
          ease: 'power2.out',
        },
      )
    }
  }, [open, reduced])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-500',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-white/5 bg-bg-main/90 backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 md:px-10 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] lg:px-14 lg:py-5">
        <Link to="/" className="group flex shrink-0 justify-self-start">
          <img
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={240}
            height={88}
            className="h-[4.5rem] w-auto max-w-[min(240px,52vw)] object-contain object-left transition-transform duration-500 group-hover:scale-[1.02] md:h-20"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-8 lg:flex xl:gap-10"
          aria-label="Primary"
        >
          {mainNav.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              {({ isActive }) => (
                <NavLinkContent label={item.label} isActive={isActive} transparent={transparent} />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <Link
            to={ctaNav.path}
            className={[
              'hidden border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 sm:inline-flex md:text-[13px]',
              transparent
                ? 'border-gold/80 text-gold hover:border-gold hover:bg-gold/10'
                : 'border-gold/60 text-gold hover:border-gold hover:bg-gold/10',
            ].join(' ')}
          >
            {ctaNav.label}
          </Link>

          <button
            type="button"
            className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-gold/30 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
            <span
              className={[
                'block h-px w-5 bg-gold transition-all duration-300',
                open ? 'translate-y-[3.5px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-gold transition-all duration-300',
                open ? 'scale-x-0 opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-5 bg-gold transition-all duration-300',
                open ? '-translate-y-[3.5px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        className={[
          'fixed inset-y-0 right-0 z-[55] flex w-[min(100%,420px)] flex-col bg-bg-secondary/95 px-8 pb-10 pt-24 shadow-2xl backdrop-blur-xl lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none translate-x-full',
          !open && !reduced ? 'translate-x-full' : '',
        ].join(' ')}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile primary">
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              data-nav-item
              className={({ isActive }) =>
                [
                  'font-display text-3xl transition-colors',
                  isActive ? 'text-gold' : 'text-text-primary',
                ].join(' ')
              }
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={ctaNav.path}
            data-nav-item
            className="mt-4 inline-flex w-fit border border-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-gold"
          >
            {ctaNav.label}
          </Link>
        </nav>
      </div>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-[54] bg-black/60 lg:hidden"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  )
}