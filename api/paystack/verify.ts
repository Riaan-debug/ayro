import type { VercelRequest, VercelResponse } from '@vercel/node'
import { paystackRequest } from '../lib/paystack-request.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY
  if (!secretKey) {
    return res.status(503).json({ error: 'Paystack is not configured' })
  }

  const reference =
    typeof req.query.reference === 'string' ? req.query.reference : undefined

  if (!reference) {
    return res.status(400).json({ error: 'Missing payment reference' })
  }

  const { statusCode, data } = await paystackRequest<{
    status?: boolean
    message?: string
    data?: {
      status?: string
      reference?: string
      amount?: number
      currency?: string
      customer?: { email?: string }
      metadata?: Record<string, string>
    }
  }>(secretKey, `/transaction/verify/${encodeURIComponent(reference)}`)

  if (statusCode < 200 || statusCode >= 300 || !data.status || !data.data) {
    return res.status(502).json({
      error: data.message ?? 'Could not verify payment',
    })
  }

  const paid = data.data.status === 'success'

  return res.status(200).json({
    paid,
    reference: data.data.reference,
    amount: data.data.amount,
    currency: data.data.currency,
    email: data.data.customer?.email,
    metadata: data.data.metadata,
  })
}
