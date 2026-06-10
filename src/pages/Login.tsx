import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { btnPrimaryClass, inputClass } from '../lib/ui'

export default function Login() {
  const { configured, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from =
    (location.state as { from?: string } | null)?.from ?? '/account'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const message = await signIn(email, password)
    if (message) {
      setError(message)
      setSubmitting(false)
      return
    }

    navigate(from, { replace: true })
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight">Log in</h1>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Customer accounts are not configured yet. You can still check out as a
          guest.
        </p>
        <Link to="/shop" className={`mt-8 inline-block px-8 ${btnPrimaryClass}`}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight">Log in</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Access your account and order history.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-widest">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-widest">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-2 ${inputClass}`}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full disabled:opacity-60 ${btnPrimaryClass}`}
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        No account?{' '}
        <Link to="/signup" className="underline hover:no-underline">
          Create one
        </Link>
      </p>
    </div>
  )
}
