/**
 * Set showOnShop on a product by slug.
 *
 * Usage:
 *   set SANITY_TOKEN=your_token
 *   node sanity/scripts/set-show-on-shop.mjs ayro-sage-graffiti-tee false
 */
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sanityDir = path.resolve(__dirname, '..')
const root = path.resolve(sanityDir, '..')

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
loadEnvFile(path.join(root, '.env.local'))

const slug = process.argv[2]
const valueArg = process.argv[3]
if (!slug || valueArg === undefined) {
  console.error('Usage: node sanity/scripts/set-show-on-shop.mjs <slug> true|false')
  process.exit(1)
}

const showOnShop = valueArg === 'true'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('Missing SANITY_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'xilnix6x',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const doc = await client.fetch(
  `*[_type == "product" && slug.current == $slug][0]{ _id, name }`,
  { slug },
)

if (!doc?._id) {
  console.error(`No product with slug "${slug}"`)
  process.exit(1)
}

console.log(`Patching ${doc.name} → showOnShop=${showOnShop}`)
await client.patch(doc._id).set({ showOnShop }).commit({ autoGenerateArrayKeys: true })
console.log('Done. Refresh the shop page.')
