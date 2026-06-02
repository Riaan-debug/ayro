import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/currency'
import { btnPrimaryClass } from '../lib/ui'

type VerifyResult = {
  paid: boolean
  reference?: string
  amount?: number
  email?: string
}

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const reference =
    searchParams.get('reference') ?? searchParams.get('trxref') ?? ''
  const { clearCart, closeCart } = useCart()
  const [state, setState] = useState<'loading' | 'success' | 'failed'>('loading')
  const [order, setOrder] = useState<VerifyResult | null>(null)

  useEffect(() => {
    if (!reference) {
      setState('failed')
      return
    }

    let cancelled = false

    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data: VerifyResult & { error?: string }) => {
        if (cancelled) return
        if (data.paid) {
          setOrder(data)
          clearCart()
          closeCart()
          setState('success')
        } else {
          setState('failed')
        }
      })
      .catch(() => {
        if (!cancelled) setState('failed')
      })

    return () => {
      cancelled = true
    }
  }, [reference, clearCart, closeCart])

  if (state === 'loading') {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white"
          aria-hidden
        />
        <p className="mt-4 text-sm text-neutral-500">Confirming your payment…</p>
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
        <h1 className="text-2xl font-black uppercase tracking-tight">
          Payment not confirmed
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          We couldn&apos;t verify this payment. If you were charged, contact us with
          your reference number.
        </p>
        {reference && (
          <p className="mt-2 text-sm text-neutral-500">
            Reference: <strong>{reference}</strong>
          </p>
        )}
        <Link to="/checkout" className={`mt-8 inline-block px-8 ${btnPrimaryClass}`}>
          Back to Checkout
        </Link>
      </div>
    )
  }

  const totalZar = order?.amount ? order.amount / 100 : 0

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-2xl text-white dark:bg-white dark:text-neutral-900">
        ✓
      </div>
      <h1 className="mt-8 text-2xl font-black uppercase tracking-tight">
        Order Confirmed
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        Thank you! Your payment was successful.
        {order?.reference && (
          <>
            {' '}
            Reference: <strong>{order.reference}</strong>
          </>
        )}
      </p>
      {order?.email && (
        <p className="mt-2 text-sm text-neutral-500">
          Confirmation sent to <strong>{order.email}</strong>
        </p>
      )}
      {totalZar > 0 && (
        <p className="mt-2 text-sm font-medium">{formatPrice(totalZar)} paid</p>
      )}
      <Link to="/shop" className={`mt-8 inline-block px-8 ${btnPrimaryClass}`}>
        Continue Shopping
      </Link>
    </div>
  )
}
