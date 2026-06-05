/**
 * Delete a product from Sanity by slug.
 *
 * Usage (from project root):
 *   set SANITY_TOKEN=your_write_token
 *   node sanity/scripts/delete-product.mjs limited-chrome-star-tee
 */
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node sanity/scripts/delete-product.mjs <slug>')
  process.exit(1)
}

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN. Create at sanity.io/manage → API → Tokens (Editor).')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'xilnix6x',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const docs = await client.fetch(
  `*[_type == "product" && slug.current == $slug]{ _id, name }`,
  { slug },
)

if (!docs.length) {
  console.log(`No product found with slug "${slug}".`)
  process.exit(0)
}

for (const doc of docs) {
  console.log(`Deleting: ${doc.name} (${doc._id})`)
  await client.delete(doc._id)
}

console.log('Done. Refresh the shop — product should disappear within a minute.')
