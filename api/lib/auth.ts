import { createClient, type User } from '@supabase/supabase-js'

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; status: number; error: string }

/**
 * Verify a Supabase access token from the Authorization header.
 * Returns null when Supabase is not configured (auth features disabled).
 */
export async function verifyBearerToken(
  authorization: string | undefined,
): Promise<AuthResult | null> {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  if (!authorization?.startsWith('Bearer ')) {
    return { ok: false, status: 401, error: 'Missing or invalid authorization' }
  }

  const token = authorization.slice(7).trim()
  if (!token) {
    return { ok: false, status: 401, error: 'Missing or invalid authorization' }
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return { ok: false, status: 401, error: 'Invalid or expired session' }
  }

  return { ok: true, user: data.user }
}
