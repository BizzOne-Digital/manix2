import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { backgroundMusic } from '../data/backgroundMusic'
import { useReducedMotion } from '../hooks/useMedia'

const MusicContext = createContext(null)

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

function createPlayerMount() {
  const mount = document.createElement('div')
  mount.setAttribute('aria-hidden', 'true')
  mount.className = 'pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0'
  document.body.appendChild(mount)
  return mount
}

export function MusicProvider({ children }) {
  const reducedMotion = useReducedMotion()
  const mountRef = useRef(null)
  const playerRef = useRef(null)
  const creatingRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  const destroyPlayer = useCallback(() => {
    try {
      playerRef.current?.destroy?.()
    } catch {
      /* YT destroy can throw if already torn down */
    }
    playerRef.current = null
    creatingRef.current = false
    mountRef.current?.remove()
    mountRef.current = null
  }, [])

  useEffect(() => () => destroyPlayer(), [destroyPlayer])

  const ensurePlayer = useCallback(async () => {
    if (playerRef.current || error || creatingRef.current) return playerRef.current
    if (reducedMotion) return null

    creatingRef.current = true
    try {
      await loadYouTubeIframeApi()
      if (!window.YT?.Player) {
        setError(true)
        return null
      }

      if (!mountRef.current) {
        mountRef.current = createPlayerMount()
      }

      const mount = mountRef.current

      return await new Promise((resolve) => {
        playerRef.current = new window.YT.Player(mount, {
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
              creatingRef.current = false
              resolve(event.target)
            },
            onError: () => {
              setError(true)
              creatingRef.current = false
              resolve(null)
            },
          },
        })
      })
    } catch {
      setError(true)
      creatingRef.current = false
      return null
    }
  }, [error, reducedMotion])

  const primePlayer = useCallback(() => {
    if (error || reducedMotion) return
    void ensurePlayer()
  }, [ensurePlayer, error, reducedMotion])

  const playMusic = useCallback(async () => {
    if (error || reducedMotion) return false
    const player = playerRef.current || (await ensurePlayer())
    if (!player) return false
    player.playVideo?.()
    player.setVolume?.(backgroundMusic.volume)
    setPlaying(true)
    return true
  }, [ensurePlayer, error, reducedMotion])

  /** Call from a click handler — starts playback immediately when the player is ready. */
  const playMusicFromUserGesture = useCallback(() => {
    if (error || reducedMotion) return
    const player = playerRef.current
    if (player?.playVideo) {
      player.playVideo()
      player.setVolume?.(backgroundMusic.volume)
      setPlaying(true)
      return
    }
    void playMusic()
  }, [error, playMusic, reducedMotion])

  const pauseMusic = useCallback(() => {
    playerRef.current?.pauseVideo?.()
    setPlaying(false)
  }, [])

  const toggleMusic = useCallback(async () => {
    if (playing) {
      pauseMusic()
      return
    }
    await playMusic()
  }, [pauseMusic, playMusic, playing])

  const value = {
    playing,
    error,
    playMusic,
    playMusicFromUserGesture,
    primePlayer,
    pauseMusic,
    toggleMusic,
    musicAvailable: !reducedMotion && !error,
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

export function MusicToggle({ className = '' }) {
  const { playing, error, toggleMusic, musicAvailable } = useMusic()
  if (!musicAvailable) return null

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggleMusic}
        disabled={error}
        aria-pressed={playing}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
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
  )
}
