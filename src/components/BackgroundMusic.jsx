import { useCallback, useEffect, useRef, useState } from 'react'
import { backgroundMusic } from '../data/backgroundMusic'
import { useReducedMotion } from '../hooks/useMedia'

let youtubeApiPromise = null

function loadYouTubeIframeApi() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.YT?.Player) return Promise.resolve()
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      document.head.appendChild(tag)
    }
  })

  return youtubeApiPromise
}

export default function BackgroundMusic() {
  const reducedMotion = useReducedMotion()
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  const destroyPlayer = useCallback(() => {
    playerRef.current?.destroy?.()
    playerRef.current = null
  }, [])

  useEffect(() => {
    return () => destroyPlayer()
  }, [destroyPlayer])

  const ensurePlayer = useCallback(async () => {
    if (playerRef.current || error) return playerRef.current
    await loadYouTubeIframeApi()
    if (!hostRef.current || !window.YT?.Player) {
      setError(true)
      return null
    }

    return new Promise((resolve) => {
      playerRef.current = new window.YT.Player(hostRef.current, {
        height: '1',
        width: '1',
        videoId: backgroundMusic.youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: backgroundMusic.youtubeVideoId,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(backgroundMusic.volume)
            resolve(event.target)
          },
          onError: () => {
            setError(true)
            resolve(null)
          },
        },
      })
    })
  }, [error])

  const toggle = async () => {
    if (error) return

    if (playing) {
      playerRef.current?.pauseVideo?.()
      setPlaying(false)
      return
    }

    const player = playerRef.current || (await ensurePlayer())
    if (!player) return

    player.playVideo?.()
    player.setVolume?.(backgroundMusic.volume)
    setPlaying(true)
  }

  if (reducedMotion) return null

  return (
    <>
      <div
        ref={hostRef}
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
        title={backgroundMusic.label}
      />

      <div className="fixed bottom-5 right-5 z-[80] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={toggle}
          disabled={error}
          aria-pressed={playing}
          aria-label={
            error
              ? 'Background music unavailable'
              : playing
                ? 'Pause background music'
                : 'Play background music'
          }
          className={[
            'flex items-center gap-2 border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors touch-manipulation',
            playing
              ? 'border-gold bg-gold/15 text-gold-light'
              : 'border-white/15 bg-bg-main/90 text-text-muted backdrop-blur-md hover:border-gold/40 hover:text-gold',
            error ? 'cursor-not-allowed opacity-40' : '',
          ].join(' ')}
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            {playing ? (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </>
            ) : (
              <span className="inline-flex h-2 w-2 rounded-full border border-gold/70" />
            )}
          </span>
          {playing ? 'Music on' : 'Music'}
        </button>
      </div>
    </>
  )
}
