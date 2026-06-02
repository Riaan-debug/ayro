export type CheckoutLineItemPayload = {
  name: string
  price: number
  quantity: number
  size: string
}

export type ShippingDetails = {
  email: string
  name: string
  address: string
  city: string
  zip: string
}

const FREE_SHIPPING_THRESHOLD = 1000
const SHIPPING_COST = 99

export function calculateOrderTotals(lineItems: CheckoutLineItemPayload[]) {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  return { subtotal, shipping, total }
}

/** Paystack ZAR amounts are in cents (subunits). */
export function toPaystackAmount(totalZar: number): number {
  return Math.round(totalZar * 100)
}

export function getSiteOrigin(req: { headers: Record<string, string | string[] | undefined> }) {
  const forwardedHost = req.headers['x-forwarded-host']
  const host = forwardedHost ?? req.headers.host
  const proto = req.headers['x-forwarded-proto'] ?? 'https'
  if (typeof host === 'string') {
    return `${proto}://${host}`
  }
  return process.env.SITE_URL ?? 'http://localhost:5173'
}
