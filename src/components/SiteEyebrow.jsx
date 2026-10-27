/**
 * Gold section label sized to 95% of the paired display headline (see index.css scales).
 */
export default function SiteEyebrow({ children, scale = 'section-lg', className = '', as = 'p', ...rest }) {
  const Tag = as
  return (
    <Tag
      className={['site-eyebrow', `site-eyebrow--${scale}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
