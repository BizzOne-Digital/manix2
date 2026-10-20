import { useEffect } from 'react'

export function AdminToastProvider({ toast, onClear }) {
  useEffect(() => {
    if (!toast) return undefined
    const t = window.setTimeout(onClear, 4000)
    return () => window.clearTimeout(t)
  }, [toast, onClear])

  if (!toast) return null

  return (
    <div
      role="status"
      className={[
        'fixed bottom-6 left-1/2 z-[500] max-w-md -translate-x-1/2 border px-5 py-3 text-sm shadow-xl',
        toast.type === 'error'
          ? 'border-red-500/50 bg-red-950/95 text-red-100'
          : 'border-gold/40 bg-bg-main text-text-primary',
      ].join(' ')}
    >
      {toast.message}
    </div>
  )
}
