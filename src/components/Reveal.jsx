export function Reveal({
  as: Tag = 'div',
  type = 'fade-up',
  className = '',
  delay = 0,
  start,
  children,
  ...rest
}) {
  return (
    <Tag
      data-reveal={type}
      data-reveal-delay={delay || undefined}
      data-reveal-start={start || undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealStagger({ className = '', start, children }) {
  return (
    <div
      data-reveal-stagger
      data-reveal-start={start || undefined}
      className={className}
    >
      {children}
    </div>
  )
}

export function RevealItem({ as: Tag = 'div', className = '', children }) {
  return (
    <Tag data-reveal-item className={className}>
      {children}
    </Tag>
  )
}

export function RevealLine({ className = '' }) {
  return (
    <div
      data-reveal-line
      aria-hidden="true"
      className={['h-px bg-gradient-to-r from-gold via-gold/50 to-transparent', className].join(
        ' ',
      )}
    />
  )
}

export function RevealImage({ className = '', children }) {
  return (
    <div data-reveal-image className={['relative overflow-hidden', className].join(' ')}>
      {children}
    </div>
  )
}

export function HeadlineReveal({ as: Tag = 'h2', className = '', lines }) {
  return (
    <Tag data-headline-reveal className={className}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden py-0.5">
          <span data-headline-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
