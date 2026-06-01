import { useState } from 'react'
import { forms, submitToFormspree } from '../lib/forms'
import { btnPrimaryClass, inputClass } from '../lib/ui'

type FormState = 'idle' | 'submitting' | 'submitted' | 'error'

export default function CustomOrders() {
  const [status, setStatus] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '',
    designNotes: '',
    timeline: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const result = await submitToFormspree(forms.customOrder, {
      _subject: 'AYRO custom order request',
      name: form.name,
      email: form.email,
      company: form.company,
      quantity: form.quantity,
      designNotes: form.designNotes,
      timeline: form.timeline,
    })

    if (!result.ok) {
      setError(result.error)
      setStatus('error')
      return
    }

    setStatus('submitted')
  }

  if (status === 'submitted') {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Request Received
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Thanks, {form.name || 'there'}! We&apos;ll review your custom order
          request and get back to you at {form.email} within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle')
            setForm({
              name: '',
              email: '',
              company: '',
              quantity: '',
              designNotes: '',
              timeline: '',
            })
          }}
          className="mt-8 text-sm underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-black uppercase tracking-tight">
        Custom Orders
      </h1>
      <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
        Need bulk tees, a custom graphic, or a design consultation? Tell us
        what you&apos;re building and we&apos;ll work with you on pricing,
        timelines, and production.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className={`mt-2 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className={`mt-2 ${inputClass}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest">
            Brand / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="text-xs font-semibold uppercase tracking-widest">
            Estimated Quantity *
          </label>
          <select
            id="quantity"
            name="quantity"
            required
            value={form.quantity}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
          >
            <option value="">Select range</option>
            <option value="10-50">10 – 50 units</option>
            <option value="50-200">50 – 200 units</option>
            <option value="200-500">200 – 500 units</option>
            <option value="500+">500+ units</option>
          </select>
        </div>

        <div>
          <label htmlFor="designNotes" className="text-xs font-semibold uppercase tracking-widest">
            Design Details *
          </label>
          <textarea
            id="designNotes"
            name="designNotes"
            required
            rows={5}
            placeholder="Describe your design, colors, placement, references..."
            value={form.designNotes}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
          />
        </div>

        <div>
          <label htmlFor="timeline" className="text-xs font-semibold uppercase tracking-widest">
            Desired Timeline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            placeholder="e.g. Need by end of August"
            value={form.timeline}
            onChange={handleChange}
            className={`mt-2 ${inputClass}`}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full ${btnPrimaryClass} disabled:opacity-60`}
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Request'}
        </button>
      </form>
    </div>
  )
}
