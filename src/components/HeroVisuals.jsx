export function HeroArcLines({ className = '' }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="50%" stopColor="#E5CB80" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
        </linearGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="url(#arcGold)" strokeWidth="1.2" filter="url(#arcGlow)" opacity="0.85">
        <path data-hero-line d="M720 80 C 980 120, 1100 280, 1050 480" />
        <path data-hero-line d="M780 200 C 1020 240, 1180 420, 1120 620" />
        <path data-hero-line d="M650 350 C 900 380, 1080 520, 1000 720" />
        <path data-hero-line d="M900 40 C 1150 180, 1280 400, 1200 650" opacity="0.5" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

export function ChevronDownIcon({ className = '' }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 5L7 10L12 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
