import https from 'node:https'

type PaystackResponse<T> = {
  statusCode: number
  data: T
}

/** Avoids vercel dev fetch proxy issues (Expect header) when calling Paystack. */
export function paystackRequest<T>(
  secretKey: string,
  path: string,
  options?: { method?: string; body?: unknown },
): Promise<PaystackResponse<T>> {
  const body = options?.body ? JSON.stringify(options.body) : undefined

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.paystack.co',
        path,
        method: options?.method ?? 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
          ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
        },
      },
      (res) => {
        let raw = ''
        res.on('data', (chunk) => {
          raw += chunk
        })
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode ?? 500,
              data: JSON.parse(raw) as T,
            })
          } catch (error) {
            reject(error)
          }
        })
      },
    )

    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}
