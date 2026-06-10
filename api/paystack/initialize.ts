import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  calculateOrderTotals,
  getSiteOrigin,
  toPaystackAmount,
  type CheckoutLineItemPayload,
  type ShippingDetails,
} from '../lib/order.js'
import { paystackRequest } from '../lib/paystack-request.js'

type InitializeBody = ShippingDetails & {
  lineItems: CheckoutLineItemPayload[]
  /** Optional Supabase user id — present only for signed-in customers. */
  userId?: string
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
  const { email, name, address, city, zip, lineItems, userId } = body ?? {}

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

  const { statusCode, data } = await paystackRequest<{
    status?: boolean
    message?: string
    data?: { authorization_url?: string; reference?: string }
  }>(secretKey, '/transaction/initialize', {
    method: 'POST',
    body: {
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
        ...(typeof userId === 'string' && userId ? { user_id: userId } : {}),
      },
    },
  })

  if (statusCode < 200 || statusCode >= 300 || !data.status || !data.data?.authorization_url) {
    return res.status(502).json({
      error: data.message ?? 'Could not start Paystack checkout',
    })
  }

  return res.status(200).json({
    url: data.data.authorization_url,
    reference: data.data.reference,
  })
}
