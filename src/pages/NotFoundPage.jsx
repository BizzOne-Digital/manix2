import { Link } from 'react-router-dom'
import { brand } from '../data/brand'
import ButtonLink from '../components/ButtonLink'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFoundPage() {
  usePageMeta({
    title: `Page Not Found | ${brand.fullName}`,
    description: 'The page you requested could not be found.',
  })

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)]">Page not found</h1>
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
