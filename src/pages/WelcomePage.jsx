import { useNavigate, useLocation } from 'react-router-dom'
import { brand } from '../data/brand'
import { siteImages } from '../data/images'
import { markSiteEntered } from '../components/SiteGate'
import { useMusic } from '../context/MusicContext'
import { usePageMeta } from '../hooks/usePageMeta'

export default function WelcomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { playMusic, musicAvailable } = useMusic()

  usePageMeta({
    title: `Welcome | ${brand.fullName}`,
    description: brand.whatWeDoSummary,
  })

  const enterSite = async () => {
    markSiteEntered()
    if (musicAvailable) {
      await playMusic()
    }
    const target = location.state?.from?.pathname
    const safe =
      target && target !== '/welcome' && !target.startsWith('/welcome') ? target : '/'
    navigate(safe, { replace: true })
  }

  return (
    <div className="relative flex min-h-[100svh] min-w-0 flex-col items-center justify-center overflow-hidden bg-black px-5 py-12 text-center">
      <img
        src={siteImages.hero.src}
        alt=""
        width={siteImages.hero.width}
        height={siteImages.hero.height}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center">
        <img
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={280}
          height={100}
          className="h-auto w-full max-w-[min(280px,72vw)] object-contain"
        />

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
          {brand.yearsEyebrow}
        </p>

        <h1 className="mt-5 font-display text-[clamp(1.5rem,4.5vw,2.25rem)] leading-snug text-text-primary">
          {brand.whatWeDoHeadline}
        </h1>

        <p className="mt-5 text-sm leading-relaxed text-text-muted md:text-base">
          {brand.whatWeDoSummary}
        </p>

        <ul className="mt-8 space-y-2 text-left text-xs uppercase tracking-[0.16em] text-gold/90 md:text-[11px]">
          {brand.coreOfferings.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-px w-4 shrink-0 bg-gold/70" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={enterSite}
          className="mt-10 w-full max-w-sm border border-gold bg-gold/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light transition-colors hover:bg-gold/20 touch-manipulation"
        >
          Enter site
        </button>

        {musicAvailable ? (
          <p className="mt-4 text-[10px] leading-relaxed text-text-muted">
            Background music will begin when you enter (you can turn it off anytime).
          </p>
        ) : null}

        <p className="mt-8 max-w-md text-[11px] leading-relaxed text-text-muted">
          {brand.paralegalTeamNote}
        </p>
      </div>
    </div>
  )
}
