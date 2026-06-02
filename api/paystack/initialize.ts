import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  calculateOrderTotals,
  getSiteOrigin,
  toPaystackAmount,
  type CheckoutLineItemPayload,
  type ShippingDetails,
} from '../lib/order'

type InitializeBody = ShippingDetails & {
  lineItems: CheckoutLineItemPayload[]
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    return res.status(503).json({ error: 'Paystack is not configured' })
  }

  const body = req.body as InitializeBody
  const { email, name, address, city, zip, lineItems } = body ?? {}

  if (!email || !name || !address || !city || !zip) {
    return res.status(400).json({ error: 'Missing shipping details' })
  }

  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' })
  }

  for (const item of lineItems) {
    if (
      !item?.name ||
      typeof item.price !== 'number' ||
      item.price <= 0 ||
      typeof item.quantity !== 'number' ||
      item.quantity < 1
    ) {
      return res.status(400).json({ error: 'Invalid line item' })
    }
  }

  const { subtotal, shipping, total } = calculateOrderTotals(lineItems)
  const amount = toPaystackAmount(total)

  if (amount < 100) {
    return res.status(400).json({ error: 'Order total is below minimum' })
  }

  const origin = getSiteOrigin(req)

  const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount,
      currency: 'ZAR',
      callback_url: `${origin}/checkout/success`,
      metadata: {
        customer_name: name,
        shipping_address: address,
        shipping_city: city,
        shipping_zip: zip,
        subtotal_zar: String(subtotal),
        shipping_zar: String(shipping),
        line_items: JSON.stringify(lineItems),
      },
    }),
  })

  const data = (await paystackRes.json()) as {
    status?: boolean
    message?: string
    data?: { authorization_url?: string; reference?: string }
  }

  if (!paystackRes.ok || !data.status || !data.data?.authorization_url) {
    return res.status(502).json({
      error: data.message ?? 'Could not start Paystack checkout',
    })
  }

  return res.status(200).json({
    url: data.data.authorization_url,
    reference: data.data.reference,
  })
}
