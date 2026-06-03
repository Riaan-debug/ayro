import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve('sanity/.env')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((line) => line.includes('='))
    .map((line) => {
      const i = line.indexOf('=')
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    }),
)

const token = env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN in sanity/.env')
  process.exit(1)
}

const hookUrl = process.argv[2]
if (!hookUrl) {
  console.error('Usage: node scripts/create-sanity-webhook.mjs <vercel-deploy-hook-url>')
  process.exit(1)
}

const res = await fetch(
  'https://xilnix6x.api.sanity.io/v2021-10-04/hooks/projects/xilnix6x',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'document',
      name: 'Vercel rebuild',
      url: hookUrl,
      dataset: 'production',
      rule: {
        on: ['create', 'update', 'delete'],
        filter: '_type in ["product", "siteSettings"]',
      },
      httpMethod: 'POST',
      apiVersion: 'v2021-06-07',
      includeDrafts: false,
    }),
  },
)

const text = await res.text()
console.log(res.status, text)
