import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { btnPrimaryClass, inputClass } from '../lib/ui'

export default function Account() {
  const { user, profile, signOut, updateProfile } = useAuth()
  const [fullName, setFullName] = useState(profile.fullName)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    const err = await updateProfile(fullName)
    if (err) {
      setError(err)
    } else {
      setMessage('Profile updated.')
    }
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Account</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Signed in as {user?.email}
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-sm text-neutral-500 underline hover:no-underline dark:text-neutral-400"
        >
          Sign out
        </button>
      </header>

      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest">Profile</h2>
        <form onSubmit={handleProfileSubmit} className="mt-4 max-w-md space-y-4">
          <div>
            <label htmlFor="account-name" className="text-xs font-semibold uppercase tracking-widest">
              Full name
            </label>
            <input
              id="account-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`mt-2 ${inputClass}`}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{message}</p>
          )}
          <button
            type="submit"
            disabled={saving}
            className={`disabled:opacity-60 ${btnPrimaryClass} px-8`}
          >
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </section>

      <section className="mt-12 rounded-lg border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
        <h2 className="text-xs font-semibold uppercase tracking-widest">Order history</h2>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Order history will appear here once Paystack webhooks store completed
          orders in Sanity. Your past guest checkouts are not linked yet.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
        <h2 className="text-xs font-semibold uppercase tracking-widest">Saved addresses</h2>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Saved shipping addresses will pre-fill checkout in a future update.
        </p>
        <Link
          to="/checkout"
          className="mt-4 inline-block text-sm underline hover:no-underline"
        >
          Continue to checkout
        </Link>
      </section>
    </div>
  )
}
