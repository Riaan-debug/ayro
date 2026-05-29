import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/currency'
import { btnPrimaryClass, inputClass } from '../lib/ui'

export default function Checkout() {
  const { items, subtotal, clearCart, getLineItems, closeCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState<'form' | 'confirmed'>('form')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [orderId, setOrderId] = useState('')

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (items.length === 0 && step === 'form') {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your bag is empty</h1>
        <Link
          to="/shop"
          className={`mt-6 inline-block px-8 py-3 ${btnPrimaryClass}`}
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !name || !address || !city || !zip) return

    const id = `AYRO-${Date.now().toString(36).toUpperCase()}`
    setOrderId(id)

    void getLineItems()

    clearCart()
    closeCart()
    setStep('confirmed')
  }

  if (step === 'confirmed') {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-2xl text-white dark:bg-white dark:text-neutral-900">
          ✓
        </div>
        <h1 className="mt-8 text-2xl font-black uppercase tracking-tight">
          Order Confirmed
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Thank you! Your order <strong>{orderId}</strong> has been received.
          We&apos;ll send a confirmation to <strong>{email}</strong> shortly.
        </p>
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
          Demo checkout — no payment was processed. Stripe can be connected in
          Phase 2 for live payments.
        </p>
        <Link
          to="/shop"
          className={`mt-8 inline-block px-8 ${btnPrimaryClass}`}
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black uppercase tracking-tight">Checkout</h1>

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
                placeholder="Address"
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
                  placeholder="ZIP / Postal"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" className={`w-full ${btnPrimaryClass}`}>
            Place Order (Demo)
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full text-sm text-neutral-500 underline dark:text-neutral-400"
          >
            Back
          </button>
        </form>

        <div className="bg-neutral-50 p-6 dark:bg-neutral-900 lg:p-8">
          <h2 className="text-sm font-bold uppercase tracking-widest">
            Order Summary
          </h2>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex justify-between gap-4 text-sm"
              >
                <span>
                  {item.name} × {item.quantity}
                  <span className="block text-neutral-500">Size {item.size}</span>
                </span>
                <span className="shrink-0 font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
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
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
