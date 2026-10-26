import { useEffect, useState } from 'react'
import { featuredServices, serviceDetails } from '../data/services'
import { formatServiceTitle } from '../lib/formatServiceTitle'
import { formatHeadingText } from '../lib/headingText'

const staticBannerTitleByKey = Object.fromEntries(
  featuredServices
    .filter((s) => s.bannerTitle)
    .flatMap((s) => [
      [s.id, s.bannerTitle],
      [s.anchor, s.bannerTitle],
    ]),
)

function withBannerTitles(services) {
  return services.map((s) => {
    const key = s.id || s.slug || s.anchor
    const bannerTitle = s.bannerTitle || staticBannerTitleByKey[key]
    return bannerTitle ? { ...s, bannerTitle } : s
  })
}

function withFormattedTitles(services) {
  return withBannerTitles(services).map((s) => ({
    ...s,
    title: formatHeadingText(formatServiceTitle(s.title)),
    bannerTitle: s.bannerTitle
      ? formatHeadingText(formatServiceTitle(s.bannerTitle))
      : undefined,
  }))
}

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
        const featured = data.featuredServices?.length
          ? data.featuredServices
          : data.services?.filter((s) => s.featured) || fallback.featuredServices
        const details = data.serviceDetails?.length
          ? data.serviceDetails
          : data.services || fallback.serviceDetails
        setState({
          loading: false,
          featuredServices: withFormattedTitles(featured),
          serviceDetails: withFormattedTitles(details),
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
