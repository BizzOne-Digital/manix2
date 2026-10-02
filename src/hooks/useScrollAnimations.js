import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile, useReducedMotion } from './useMedia'
import { initHeroScroll, initScrollAnimations } from '../utils/scrollAnimations'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(scopeRef, extraKey = '') {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    const root = scopeRef.current
    if (!root || reduced) return undefined

    let ctx

    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        initScrollAnimations(root, { mobile })
      }, root)
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, 120)

    return () => {
      window.clearTimeout(timer)
      ctx?.revert()
    }
  }, [scopeRef, reduced, mobile, extraKey])
}

export function useHeroParallax(scopeRef) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || !scopeRef.current) return
    let ctx
    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => initHeroScroll(scopeRef.current, { mobile }), scopeRef)
    }, 120)
    return () => {
      window.clearTimeout(timer)
      ctx?.revert()
    }
  }, [scopeRef, reduced, mobile])
}
