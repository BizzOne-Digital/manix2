import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import ButtonLink from '../components/ButtonLink'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteEyebrow from '../components/SiteEyebrow'

export default function NotFoundPage() {
  usePageMeta({
    title: `Page Not Found | ${brand.fullName}`,
    description: 'The page you requested could not be found.',
  })

  return (
    <section className="flex min-h-[70vh] w-full min-w-0 flex-col items-center justify-center overflow-x-clip px-4 py-28 text-center sm:px-5 sm:py-32">
      <SiteEyebrow scale="not-found">404</SiteEyebrow>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,calc( * var(--type-vw-scale)),4rem)]">Page not found</h1>
      <p className="mt-4 max-w-md text-text-muted">
        The address may have changed or the page may have been removed. Return home or contact our
        team for assistance.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink to="/">Return Home</ButtonLink>
        <Link to="/contact" className="text-sm text-gold underline-offset-4 hover:underline">
          Contact
        </Link>
      </div>
    </section>
  )
}
