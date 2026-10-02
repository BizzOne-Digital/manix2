import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { brand } from '../data/brand'
import { ctaNav, mainNav } from '../data/navigation'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

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
  const scrollLockRef = useRef(0)
  const isHome = location.pathname === '/'
  const transparent = transparentAtTop && isHome && !scrolled && !open

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (open) {
      scrollLockRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollLockRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else if (document.body.style.position === 'fixed') {
      const y = scrollLockRef.current
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, y)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 w-full max-w-full transition-[background,backdrop-filter,border-color] duration-500',
        transparent
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-white/5 bg-bg-main/90 backdrop-blur-md',
      ].join(' ')}
    >
      <div className="mx-auto grid min-w-0 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:px-5 md:px-10 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(180px,1fr)] lg:gap-4 lg:px-14 lg:py-5">
        <Link to="/" className="group flex min-w-0 shrink-0 justify-self-start">
          <img
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={240}
            height={88}
            className="h-12 w-auto max-w-[min(220px,46vw)] object-contain object-left transition-transform duration-500 group-hover:scale-[1.02] sm:h-[4.5rem] md:h-20 md:max-w-[min(240px,52vw)]"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 lg:flex xl:gap-10"
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

        <div className="flex min-w-0 items-center justify-self-end gap-2 sm:gap-3">
          <Link
            to={ctaNav.path}
            className={[
              'hidden border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:inline-flex md:px-5 md:py-2.5 md:text-[13px] md:tracking-[0.2em]',
              transparent
                ? 'border-gold/80 text-gold hover:border-gold hover:bg-gold/10'
                : 'border-gold/60 text-gold hover:border-gold hover:bg-gold/10',
            ].join(' ')}
          >
            {ctaNav.label}
          </Link>

          <button
            type="button"
            className="relative z-[60] flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-sm border border-gold/30 lg:hidden"
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

      <button
        type="button"
        className={[
          'fixed inset-0 z-[54] bg-black/60 transition-opacity duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden={!open}
        aria-label="Close menu overlay"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        id="mobile-nav"
        className={[
          'fixed inset-y-0 right-0 z-[55] flex w-[min(100vw,420px)] max-w-full flex-col bg-bg-secondary/98 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform lg:hidden',
          'pt-[max(6rem,env(safe-area-inset-top,0px)+4.5rem)] pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pl-6 pr-[max(1.5rem,env(safe-area-inset-right,0px))]',
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav className="flex flex-col gap-5 overflow-y-auto overscroll-contain" aria-label="Mobile primary">
          {mainNav.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={closeMenu}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
              className={({ isActive }) =>
                [
                  'font-display text-2xl transition-[color,opacity,transform] duration-500 sm:text-3xl',
                  open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
                  isActive ? 'text-gold' : 'text-text-primary',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={ctaNav.path}
            onClick={closeMenu}
            style={{ transitionDelay: open ? `${80 + mainNav.length * 45}ms` : '0ms' }}
            className={[
              'mt-2 inline-flex w-fit max-w-full border border-gold px-5 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-gold transition-[opacity,transform] duration-500 sm:text-xs',
              open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
            ].join(' ')}
          >
            {ctaNav.label}
          </Link>
        </nav>
      </div>
    </header>
  )
}
