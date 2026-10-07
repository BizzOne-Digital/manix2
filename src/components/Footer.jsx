import { Link, NavLink } from 'react-router-dom'
import ButtonLink from './ButtonLink'
import { brand } from '../data/brand'
import { featuredServices } from '../data/services'
import { ctaNav, footerNav } from '../data/navigation'

function FooterNavLink({ to, children, end = false }) {
  return (
    <NavLink to={to} end={end} className="group inline-flex items-center gap-2">
      {({ isActive }) => (
        <>
          <span
            className={[
              'h-px w-0 bg-gold transition-all duration-300 group-hover:w-4',
              isActive ? 'w-4' : '',
            ].join(' ')}
            aria-hidden="true"
          />
          <span
            className={[
              'text-sm transition-colors duration-300',
              isActive ? 'text-gold' : 'text-text-muted group-hover:text-text-primary',
            ].join(' ')}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-bg-main">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-gold/[0.04] blur-3xl md:-left-32 md:h-64 md:w-64" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full bg-gold/[0.03] blur-3xl md:-right-24 md:h-48 md:w-48" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block">
              <img
                src={brand.logoSrc}
                alt={brand.logoAlt}
                width={200}
                height={72}
                className="h-14 w-auto max-w-[200px] object-contain object-left md:h-[3.75rem]"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-text-muted md:text-[15px] md:leading-relaxed">
              {brand.whatWeDoSummary}
            </p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-text-muted">
              {brand.processServersNote}
            </p>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.35em] text-gold/80">
              {brand.yearsEyebrow}
            </p>
            <ButtonLink to={ctaNav.path} variant="secondary" className="mt-8" showArrow>
              {ctaNav.label}
            </ButtonLink>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:pl-6">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Navigate
              </p>
              <ul className="space-y-3.5">
                {footerNav.map((item) => (
                  <li key={item.path}>
                    <FooterNavLink to={item.path} end={item.path === '/'}>
                      {item.label}
                    </FooterNavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                Services
              </p>
              <ul className="space-y-2.5 text-sm text-text-muted">
                {featuredServices.map((service) => (
                  <li key={service.id} className="border-l border-gold/25 pl-3 leading-snug">
                    <Link
                      to={`/services#${service.anchor}`}
                      className="transition-colors hover:text-gold-light"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-10">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Contact
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted">Email</p>
                <a
                  href={brand.mailto}
                  className="mt-2 block font-display text-xl text-text-primary transition-colors hover:text-gold md:text-2xl"
                >
                  {brand.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted">Phone</p>
                <a
                  href={brand.phoneTel}
                  className="mt-2 block font-display text-xl text-text-primary transition-colors hover:text-gold md:text-2xl"
                >
                  {brand.phone}
                </a>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
            >
              Inquiry form
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-bg-panel/80">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-8 md:flex-row md:items-start md:justify-between md:gap-8 md:px-10 lg:px-14">
          <p className="max-w-3xl text-xs leading-relaxed text-text-muted md:text-[13px]">
            {brand.disclaimer}
          </p>
          <p className="shrink-0 text-xs text-text-muted md:text-right md:text-[13px]">
            © {year} {brand.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
