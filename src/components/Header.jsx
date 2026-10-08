import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { brand } from '../data/brand'
import { aboutMenu, ctaNav, mainNav } from '../data/navigation'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

function AboutDesktopNav({ transparent }) {
  const location = useLocation()
  const isAbout = location.pathname === '/about'

  return (
    <div className="group relative">
      <NavLink to="/about">
        {({ isActive }) => (
          <NavLinkContent label="About & team" isActive={isActive || isAbout} transparent={transparent} />
        )}
      </NavLink>
      <div
        className="pointer-events-none absolute left-1/2 top-full z-[120] hidden w-[min(100vw-2rem,20rem)] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:block group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:block group-focus-within:opacity-100"
      >
        <ul
          className="max-h-[min(70vh,28rem)] overflow-y-auto border border-white/10 bg-bg-main py-2 shadow-2xl"
          role="menu"
        >
          {aboutMenu.map((item) => (
            <li key={item.path} role="none">
              <Link
                to={item.path}
                role="menuitem"
                className="block px-4 py-2.5 transition-colors hover:bg-white/5"
              >
                <span className="block text-sm font-medium text-text-primary">{item.label}</span>
                {item.hint ? (
                  <span className="mt-0.5 block text-xs text-text-muted line-clamp-2">{item.hint}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

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
  const [portalReady, setPortalReady] = useState(false)
  const scrollLockRef = useRef(0)
  const isHome = location.pathname === '/'
  const transparent = transparentAtTop && isHome && !scrolled && !open

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    scrollLockRef.current = window.scrollY
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollLockRef.current}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    style.overflow = 'hidden'

    return () => {
      const y = scrollLockRef.current
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.width = ''
      style.overflow = ''
      window.scrollTo(0, y)
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
  const toggleMenu = () => setOpen((v) => !v)

  const mobileMenu =
    portalReady && open
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[200] bg-black/60 lg:hidden"
              aria-label="Close menu overlay"
              onClick={closeMenu}
            />
            <div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className={[
                'fixed inset-y-0 right-0 z-[201] flex w-[min(100vw,420px)] max-w-full flex-col bg-bg-secondary shadow-2xl lg:hidden',
                'pt-[max(5.5rem,env(safe-area-inset-top,0px)+4rem)] pb-[max(2rem,env(safe-area-inset-bottom,0px))]',
                'pl-6 pr-[max(1.25rem,env(safe-area-inset-right,0px))]',
                'translate-x-0',
              ].join(' ')}
            >
              <nav
                className="flex flex-col gap-5 overflow-y-auto overscroll-contain"
                aria-label="Mobile primary"
              >
                {mainNav.map((item) =>
                  item.menu ? (
                    <div key={item.path} className="flex flex-col gap-4">
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          [
                            'font-display text-2xl text-text-primary sm:text-3xl',
                            isActive ? 'text-gold' : '',
                          ].join(' ')
                        }
                      >
                        {item.label}
                      </NavLink>
                      <ul className="space-y-3 border-l border-gold/30 pl-4">
                        {aboutMenu.map((sub) => (
                          <li key={sub.path}>
                            <Link
                              to={sub.path}
                              onClick={closeMenu}
                              className="block text-base text-text-muted transition-colors hover:text-gold sm:text-lg"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          'font-display text-2xl text-text-primary sm:text-3xl',
                          isActive ? 'text-gold' : '',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  ),
                )}
                <Link
                  to={ctaNav.path}
                  onClick={closeMenu}
                  className="mt-2 inline-flex w-fit max-w-full border border-gold px-5 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs"
                >
                  {ctaNav.label}
                </Link>
              </nav>
            </div>
          </>,
          document.body,
        )
      : null

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-[90] w-full max-w-full transition-[background,backdrop-filter,border-color] duration-500',
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
            {mainNav.map((item) =>
              item.menu ? (
                <AboutDesktopNav key={item.path} transparent={transparent} />
              ) : (
                <NavLink key={item.path} to={item.path} end={item.path === '/'}>
                  {({ isActive }) => (
                    <NavLinkContent label={item.label} isActive={isActive} transparent={transparent} />
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="relative z-[202] flex min-w-0 items-center justify-self-end gap-2 sm:gap-3">
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
              className="flex h-11 w-11 shrink-0 touch-manipulation flex-col items-center justify-center gap-1.5 rounded-sm border border-gold/30 bg-bg-main/80 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
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
      </header>
      {mobileMenu}
    </>
  )
}
