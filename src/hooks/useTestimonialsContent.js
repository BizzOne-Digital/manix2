import { useEffect, useState } from 'react'
import {
  testimonials,
  testimonialsAreSamples,
  testimonialsSampleNotice,
} from '../data/testimonials'

export function useTestimonialsContent() {
  const [state, setState] = useState({
    loading: true,
    testimonials,
    testimonialsAreSamples,
    sampleNotice: testimonialsSampleNotice,
    fromApi: false,
  })

  useEffect(() => {
    let cancelled = false
    fetch('/api/testimonials')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.success || !data.testimonials?.length) {
          setState({
            loading: false,
            testimonials,
            testimonialsAreSamples,
            sampleNotice: testimonialsSampleNotice,
            fromApi: false,
          })
          return
        }
        setState({
          loading: false,
          testimonials: data.testimonials,
          testimonialsAreSamples: false,
          sampleNotice: '',
          fromApi: true,
        })
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            loading: false,
            testimonials,
            testimonialsAreSamples,
            sampleNotice: testimonialsSampleNotice,
            fromApi: false,
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
