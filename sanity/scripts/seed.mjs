/**
 * One-time seed: uploads AYRO images and creates products + site settings in Sanity.
 *
 * Usage (from project root):
 *   set SANITY_TOKEN=your_write_token
 *   node sanity/scripts/seed.mjs
 *
 * Create a token at sanity.io/manage → API → Tokens (Editor permissions).
 */
import crypto from 'node:crypto'
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
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

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID ?? 'xilnix6x'
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.VITE_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_TOKEN

if (!token) {
  console.error('Missing SANITY_TOKEN. Create one at https://www.sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const products = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8').replace(/^\uFEFF/, ''),
)

function randomKey(prefix = 'k') {
  return `${prefix}-${crypto.randomUUID().replace(/-/g, '').slice(0, 10)}`
}

function keyedImage(image, key) {
  return {
    _key: key,
    _type: 'image',
    asset: image.asset,
  }
}

async function uploadPublicImage(relativePath) {
  const filePath = path.join(root, 'public', relativePath.replace(/^\//, ''))
  if (!fs.existsSync(filePath)) {
    throw new Error(`Image not found: ${filePath}`)
  }
  const buffer = fs.readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function seedSiteSettings() {
  console.log('Seeding site settings…')
  const [logo, heroImage, storyImage, catEssentials, catGraphics, catLimited] =
    await Promise.all([
      uploadPublicImage('/images/ayro/logo.jpeg'),
      uploadPublicImage('/images/ayro/hero.jpeg'),
      uploadPublicImage('/images/ayro/story.jpeg'),
      uploadPublicImage('/images/ayro/category-essentials.jpeg'),
      uploadPublicImage('/images/ayro/category-graphics.jpeg'),
      uploadPublicImage('/images/ayro/category-limited.jpeg'),
    ])

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'AYRO',
    contactEmail: 'janaejayden86@gmail.com',
    logo,
    logoAlt: 'AYRO logo',
    heroEyebrow: 'New Season',
    heroHeadline: 'Wear your|ambition.',
    heroSubcopy:
      'Premium streetwear built for the long run. Shop the drop or request a custom run.',
    heroImage,
    heroImageAlt: 'AYRO tees on chrome display',
    promoText: 'Free shipping on orders over R 1 000',
    storyTitle: 'Built For The Long Run',
    storyBody:
      'AYRO started with one goal: create t-shirts people trust and actually want to wear. From everyday essentials to bold graphics and limited drops, we are building a steady brand with loyal customers and quality you can feel.',
    storyImage,
    storyImageAlt: 'AYRO white tee with liquid metal graphic',
    shippingNote: 'Prices in ZAR · Ships throughout South Africa',
    shopTitle: 'Shop',
    shopSubtitle: 'AYRO essentials, graphics, and limited drops — priced in ZAR.',
    socials: [
      {
        _key: 'instagram',
        label: 'Instagram',
        handle: '@theofficialayro',
        url: 'https://www.instagram.com/theofficialayro',
      },
      {
        _key: 'tiktok',
        label: 'TikTok',
        handle: '@theofficialayro1',
        url: 'https://www.tiktok.com/@theofficialayro1',
      },
    ],
    categoryEssentials: catEssentials,
    categoryGraphics: catGraphics,
    categoryLimited: catLimited,
  })
  console.log('Site settings created.')
}

async function seedProducts() {
  console.log('Seeding products…')
  for (const product of products) {
    const mainImage = await uploadPublicImage(product.image)
    const docId = `product-${product.slug}`

    await client.createOrReplace({
      _id: docId,
      _type: 'product',
      name: product.name,
      slug: { _type: 'slug', current: product.slug },
      description: product.description,
      price: product.price,
      category: product.category,
      featured: product.featured ?? false,
      sizes: product.sizes,
      mainImage,
      images: [keyedImage(mainImage, randomKey('gallery-0'))],
    })
    console.log(`  ✓ ${product.name}`)
  }
}

async function main() {
  console.log(`Seeding project ${projectId} / ${dataset}`)
  await seedSiteSettings()
  await seedProducts()
  console.log('Done. Restart the storefront dev server and verify content loads from Sanity.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
