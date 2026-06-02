import type { VercelRequest, VercelResponse } from '@vercel/node'

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

  const paystackRes = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey}` },
    },
  )

  const data = (await paystackRes.json()) as {
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
  }

  if (!paystackRes.ok || !data.status || !data.data) {
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
