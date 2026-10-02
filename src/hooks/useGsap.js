import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useMedia'

gsap.registerPlugin(ScrollTrigger)

export function useGsapContext(scopeRef, callback, deps = []) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const ctx = gsap.context(() => {
      if (!reduced) callback(gsap, ScrollTrigger)
    }, scope)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, scopeRef, ...deps])
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
