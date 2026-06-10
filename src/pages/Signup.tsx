import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { btnPrimaryClass, inputClass } from '../lib/ui'

export default function Signup() {
  const { configured, signUp } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const message = await signUp(email, password, fullName)
    if (message) {
      setError(message)
      setSubmitting(false)
      return
    }

    setCheckEmail(true)
    setSubmitting(false)
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight">Sign up</h1>
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

  if (checkEmail) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Check your email
        </h1>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          We sent a confirmation link to <strong>{email}</strong>. Confirm your
          email, then sign in.
        </p>
        <Link to="/login" className={`mt-8 inline-block px-8 ${btnPrimaryClass}`}>
          Go to log in
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight">Sign up</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Create an account to track orders and save your details.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="signup-name" className="text-xs font-semibold uppercase tracking-widest">
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="text-xs font-semibold uppercase tracking-widest">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="text-xs font-semibold uppercase tracking-widest">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-2 ${inputClass}`}
          />
          <p className="mt-1 text-xs text-neutral-500">At least 8 characters</p>
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
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account?{' '}
        <Link to="/login" className="underline hover:no-underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
