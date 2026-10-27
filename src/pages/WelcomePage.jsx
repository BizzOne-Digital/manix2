import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { brand } from '../data/brand'
import { formatHeadingText } from '../lib/headingText'
import { siteImages } from '../data/images'
import { markSiteEntered } from '../components/SiteGate'
import { useMusic } from '../context/MusicContext'
import { usePageMeta } from '../hooks/usePageMeta'
import SiteEyebrow from '../components/SiteEyebrow'

export default function WelcomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { playMusicFromUserGesture, primePlayer, musicAvailable } = useMusic()

  useEffect(() => {
    if (musicAvailable) primePlayer()
  }, [musicAvailable, primePlayer])

  usePageMeta({
    title: `Welcome | ${brand.fullName}`,
    description: brand.whatWeDoSummary,
  })

  const enterSite = () => {
    markSiteEntered()
    playMusicFromUserGesture()
    const target = location.state?.from?.pathname
    const safe =
      target && target !== '/welcome' && !target.startsWith('/welcome') ? target : '/'
    navigate(safe, { replace: true })
  }

  return (
    <div className="relative flex min-h-[100svh] min-w-0 flex-col items-center justify-center overflow-x-hidden bg-black px-4 py-12 sm:px-5">
      <img
        src={siteImages.hero.src}
        alt=""
        width={siteImages.hero.width}
        height={siteImages.hero.height}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,56rem)] flex-col items-start px-1 text-left">
        <img
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={280}
          height={100}
          className="mx-auto h-auto w-full max-w-[min(280px,72vw)] object-contain"
        />

        <SiteEyebrow scale="hero" className="mt-8 w-full">
          {brand.yearsEyebrow}
        </SiteEyebrow>

        <h1 className="welcome-headline mt-5 w-full min-w-0 font-display text-text-primary">
          {formatHeadingText(brand.whatWeDoHeadline)}
        </h1>

        <p className="mt-5 w-full text-sm leading-relaxed text-text-muted md:text-base">
          {brand.whatWeDoSummary}
        </p>

        <ul className="mt-8 space-y-2 text-left text-xs uppercase tracking-[0.16em] text-gold/90 md:text-[0.6875rem]">
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
          className="mt-10 w-full max-w-sm self-center border border-gold bg-gold/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light transition-colors hover:bg-gold/20 touch-manipulation"
        >
          Enter site
        </button>

        {musicAvailable ? (
          <p className="mt-4 self-center text-center text-[0.625rem] leading-relaxed text-text-muted">
            Background music will begin when you enter (you can turn it off anytime).
          </p>
        ) : null}

        <p className="mt-8 w-full max-w-md text-sm leading-relaxed text-text-muted">
          {brand.paralegalIntro}
        </p>
      </div>
    </div>
  )
}
