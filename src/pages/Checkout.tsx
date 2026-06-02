import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useSite } from '../context/ContentContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/currency'
import { btnPrimaryClass, inputClass } from '../lib/ui'
import CartLineItem from '../components/CartLineItem'

export default function Checkout() {
  const site = useSite()
  const { items, subtotal, getLineItems } = useCart()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your bag is empty</h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Add a tee from the shop to continue.
        </p>
        <Link
          to="/shop"
          className={`mt-6 inline-block px-8 py-3 ${btnPrimaryClass}`}
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !name || !address || !city || !zip) return

    setPaying(true)
    setError('')

    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          address,
          city,
          zip,
          lineItems: getLineItems(),
        }),
      })

      const raw = await res.text()
      let data: { url?: string; error?: string }
      try {
        data = JSON.parse(raw) as { url?: string; error?: string }
      } catch {
        if (res.status === 404) {
          setError(
            'Payment API not found. Stop npm run dev and use npm run dev:api, then open http://localhost:3056/checkout.',
          )
          return
        }
        setError(
          res.ok
            ? 'Unexpected response from payment server.'
            : `Payment could not start (${res.status}). Try again.`,
        )
        return
      }

      if (!res.ok || !data.url) {
        setError(data.error ?? 'Could not start payment. Try again.')
        return
      }

      window.location.href = data.url
    } catch {
      setError(
        'Could not reach the payment server. For local testing, run npm run dev:api instead of npm run dev.',
      )
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header>
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {site.shippingNote}
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest">
              Contact
            </legend>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-3 ${inputClass}`}
            />
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest">
              Shipping
            </legend>
            <div className="mt-3 space-y-3">
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                required
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  required
                  placeholder="Postal code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </p>
          )}

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            By continuing to payment, you agree to our{' '}
            <Link to="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/returns" className="underline hover:no-underline">
              Returns & Refunds
            </Link>{' '}
            policy.
          </p>

          <button
            type="submit"
            disabled={paying}
            className={`w-full disabled:opacity-60 ${btnPrimaryClass}`}
          >
            {paying ? 'Redirecting to Paystack…' : `Pay ${formatPrice(total)}`}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full text-sm text-neutral-500 underline dark:text-neutral-400"
          >
            Back
          </button>
        </form>

        <div className="h-fit bg-neutral-50 p-6 dark:bg-neutral-900 lg:sticky lg:top-24 lg:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Order Summary
            </h2>
            <Link
              to="/shop"
              className="text-xs text-neutral-500 underline hover:text-neutral-900 dark:hover:text-neutral-400 dark:hover:text-white"
            >
              Add items
            </Link>
          </div>
          <ul className="mt-6 space-y-6">
            {items.map((item) => (
              <CartLineItem
                key={`${item.productId}-${item.size}`}
                item={item}
                variant="checkout"
              />
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-700">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-neutral-500">
                Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </p>
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-4 text-base font-semibold dark:border-neutral-700">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
            Secure payment via Paystack — cards and EFT accepted.
          </p>
        </div>
      </div>
    </div>
  )
}
