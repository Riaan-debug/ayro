import { useState } from 'react'
import { useSite } from '../context/ContentContext'
import { forms, submitToFormspree } from '../lib/forms'
import { btnPrimaryClass, inputClass } from '../lib/ui'

type Status = 'idle' | 'submitting' | 'submitted' | 'error'

export default function Contact() {
  const site = useSite()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const result = await submitToFormspree(forms.contact, {
      _subject: 'AYRO contact form',
      name: form.name,
      email: form.email,
      message: form.message,
    })

    if (!result.ok) {
      setError(result.error)
      setStatus('error')
      return
    }

    setStatus('submitted')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight">Contact</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Questions about an order, shipping, or working together? Reach out —
        we typically respond within 1–2 business days.
      </p>

      <div className="mt-8 space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          <span className="font-semibold text-neutral-900 dark:text-white">Email:</span>{' '}
          <a href={`mailto:${site.contactEmail}`} className="underline hover:no-underline">
            {site.contactEmail}
          </a>
        </p>
        {site.socials.map((s) => (
          <p key={s.label}>
            <span className="font-semibold text-neutral-900 dark:text-white">{s.label}:</span>{' '}
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              {s.handle}
            </a>
          </p>
        ))}
      </div>

      {status === 'submitted' ? (
        <p className="mt-10 rounded-lg bg-neutral-100 px-4 py-6 text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          Message sent! We&apos;ll get back to you at {form.email} soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest">Name</label>
            <input id="contact-name" type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`mt-2 ${inputClass}`} />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest">Email</label>
            <input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={`mt-2 ${inputClass}`} />
          </div>
          <div>
            <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest">Message</label>
            <textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={`mt-2 ${inputClass}`} />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
          )}
          <button type="submit" disabled={status === 'submitting'} className={`w-full ${btnPrimaryClass} disabled:opacity-60`}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  )
}
