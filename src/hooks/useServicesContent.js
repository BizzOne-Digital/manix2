import { useEffect, useState } from 'react'
import { featuredServices, serviceDetails } from '../data/services'

const fallback = {
  featuredServices,
  serviceDetails,
  fromApi: false,
}

export function useServicesContent() {
  const [state, setState] = useState({ loading: true, ...fallback })

  useEffect(() => {
    let cancelled = false
    fetch('/api/services')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.success) {
          setState({ loading: false, ...fallback })
          return
        }
        setState({
          loading: false,
          featuredServices: data.featuredServices?.length
            ? data.featuredServices
            : data.services?.filter((s) => s.featured) || fallback.featuredServices,
          serviceDetails: data.serviceDetails?.length
            ? data.serviceDetails
            : data.services || fallback.serviceDetails,
          allServices: data.services,
          fromApi: true,
        })
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, ...fallback })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
