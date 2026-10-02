import { useEffect } from 'react'

export function usePageMeta({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta?.getAttribute('content') ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    if (description) meta.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      if (meta) meta.setAttribute('content', prevDescription)
    }
  }, [title, description])
}
