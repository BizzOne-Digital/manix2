export default function GoldMesh({ className = '', intensity = 'normal' }) {
  const opacity = intensity === 'subtle' ? 0.35 : 0.65
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5CB80" stopOpacity="0" />
          <stop offset="45%" stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="100%" stopColor="#E5CB80" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#goldStroke)" strokeWidth="0.6" opacity={opacity}>
        <path className="gold-path" d="M0 120 L800 40" />
        <path className="gold-path" d="M40 0 L760 800" />
        <path className="gold-path" d="M120 800 L680 0" />
        <path className="gold-path" d="M0 420 L800 520" />
        <path className="gold-path" d="M300 0 L500 800" />
        <circle cx="400" cy="400" r="180" strokeWidth="0.4" opacity="0.5" />
        <circle cx="400" cy="400" r="280" strokeWidth="0.3" opacity="0.35" />
      </g>
    </svg>
  )
}
