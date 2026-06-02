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

function legalSection(key, title, paragraphs = [], listItems) {
  const section = {
    _key: key,
    _type: 'legalSection',
    title,
    paragraphs,
  }
  if (listItems) section.listItems = listItems
  return section
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
    privacyIntro:
      '{{brandName}} ("we", "us") respects your privacy. This policy explains what personal information we collect when you use our website and how we use it. By shopping with us or submitting a form, you agree to this policy.',
    privacySections: [
      legalSection('privacy-collect', 'Information we collect', [
        'When you place an order, we collect your name, email address, and shipping details so we can fulfil and deliver your purchase.',
        'When you contact us or request a custom order, we collect the details you submit through our forms (name, email, and message content).',
        'We may collect basic technical data such as browser type and pages visited to keep the site secure and working correctly.',
      ]),
      legalSection('privacy-use', 'How we use your information', [
        'We use your information to process orders, respond to enquiries, send order-related communication, and improve our store. We do not sell your personal information to third parties.',
      ]),
      legalSection('privacy-payment', 'Payment processing', [
        'Card and EFT payments are processed by [Paystack](https://paystack.com). We do not store your full card details on our servers. Paystack handles payment data according to their own privacy and security standards.',
      ]),
      legalSection('privacy-forms', 'Form submissions', [
        'Contact and custom-order forms may be delivered to us via Formspree or a similar service so we can read and reply to your message.',
      ]),
      legalSection('privacy-rights', 'Your rights', [
        'Under applicable South African law, including the Protection of Personal Information Act (POPIA), you may request access to, correction of, or deletion of personal information we hold about you. Contact us using the details below.',
      ]),
      legalSection('privacy-contact', 'Contact', [
        'For privacy questions or requests, email {{contactEmail}} or visit our {{contactPage}}.',
      ]),
    ],
    privacyLastUpdated: 'June 2026',
    returnsIntro:
      'We want you to love your {{brandName}} gear. If something is not right, here is how returns and refunds work for orders placed on our online store.',
    returnsSections: [
      legalSection('returns-window', '30-day returns', [
        'Unworn items in original condition may be returned within 30 days of delivery for a refund or exchange, subject to the conditions below.',
      ]),
      legalSection(
        'returns-eligible',
        'Eligible items',
        [],
        [
          'Items must be unworn, unwashed, and free of odours or damage.',
          'Original tags and packaging should be included where possible.',
          'Custom-made or personalised orders may not be eligible unless faulty.',
          'Sale or final-clearance items are returnable only if faulty.',
        ],
      ),
      legalSection('returns-start', 'How to start a return', [
        'Email {{contactEmail}} with your order reference (from your Paystack confirmation or our reply email), the item(s) you wish to return, and the reason. We will confirm next steps and, if approved, provide return instructions for shipping within South Africa.',
        'You can also reach us via the {{contactPage}}.',
      ]),
      legalSection('returns-refunds', 'Refunds', [
        'Approved refunds are processed to the original payment method used at checkout. Paystack and your bank may take several business days to show the credit on your account after we initiate the refund.',
        'Original shipping fees are non-refundable unless the return is due to our error or a faulty product.',
      ]),
      legalSection('returns-exchanges', 'Exchanges', [
        'To exchange for a different size or style, contact us with your order details. If the replacement item is available, we will guide you through the swap once we receive the returned item.',
      ]),
      legalSection('returns-faulty', 'Faulty or incorrect items', [
        'If you receive the wrong item or a product with a manufacturing defect, contact us within 7 days of delivery with photos. We will arrange a replacement or full refund, including reasonable return shipping where applicable.',
      ]),
      legalSection('returns-questions', 'Questions', [
        'See also our {{privacyPage}}. For anything else, email {{contactEmail}}.',
      ]),
    ],
    returnsLastUpdated: 'June 2026',
  })
  try {
    await client.delete('drafts.siteSettings')
  } catch {
    // no draft to remove
  }
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
