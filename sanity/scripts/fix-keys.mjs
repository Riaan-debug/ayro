import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sanityDir = path.resolve(__dirname, '..')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFile(path.join(sanityDir, '.env'))

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'xilnix6x'
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('Missing SANITY_TOKEN in sanity/.env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export function randomKey(prefix = 'k') {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`
}

/** Sanity string-tag arrays must be plain strings in the API. */
export function normalizeStringArray(items) {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object' && 'value' in item) {
        return String(item.value)
      }
      return null
    })
    .filter(Boolean)
}

/** @param {unknown[]} items */
export function keyImageArray(items) {
  if (!Array.isArray(items)) return items
  return items.map((item, index) => {
    if (!item || typeof item !== 'object') return item
    if ('_key' in item && item._key) return item
    return {
      ...item,
      _key: randomKey(`img-${index}`),
      _type: 'image',
    }
  })
}

async function main() {
  const products = await client.fetch(
    `*[_type == "product"]{ _id, name, sizes, images }`,
  )

  console.log(`Fixing ${products.length} products…`)

  for (const product of products) {
    await client
      .patch(product._id)
      .set({
        sizes: normalizeStringArray(product.sizes ?? []),
        images: keyImageArray(product.images ?? []),
      })
      .commit()
    console.log(`  ✓ ${product.name}`)
  }

  console.log('Done. Refresh Sanity Studio.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
