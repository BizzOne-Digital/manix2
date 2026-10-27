import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../lib/adminApi'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await adminLogin(password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-bg-main px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-white/10 bg-bg-secondary p-8"
      >
        <p className="text-[0.625rem] uppercase tracking-[0.3em] text-gold">Admin</p>
        <h1 className="mt-2 font-display text-2xl">Sign in</h1>
        <label className="mt-8 block text-xs uppercase tracking-[0.2em] text-text-muted">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-white/10 bg-bg-main px-4 py-3 text-sm"
          />
        </label>
        {error ? (
          <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border border-gold bg-gold/10 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
