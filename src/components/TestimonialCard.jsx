export default function TestimonialCard({ quote, name, role, organization }) {
  return (
    <article className="relative border border-white/10 bg-bg-panel p-8 md:p-10">
      <div className="mb-6 h-px w-12 bg-gold" aria-hidden="true" />
      <blockquote className="font-display text-2xl leading-snug text-text-primary md:text-3xl">
        “{quote}”
      </blockquote>
      <footer className="mt-8 border-t border-white/5 pt-6">
        <p className="text-sm font-medium text-gold">{name}</p>
        <p className="text-sm text-text-muted">
          {role}
          {organization ? ` · ${organization}` : ''}
        </p>
      </footer>
    </article>
  )
}
