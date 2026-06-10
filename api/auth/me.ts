import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyBearerToken } from '../lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = await verifyBearerToken(req.headers.authorization)

  if (auth === null) {
    return res.status(503).json({ error: 'Customer accounts are not configured' })
  }

  if (!auth.ok) {
    return res.status(auth.status).json({ error: auth.error })
  }

  const { user } = auth
  const fullName =
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : ''

  return res.status(200).json({
    id: user.id,
    email: user.email,
    fullName,
  })
}
