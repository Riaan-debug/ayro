import type { Product } from '../types/product'
import { products as staticProducts } from '../data/products'
import { site as staticSite, type SiteContent, type CategoryTile } from '../data/site'

const staticTiles = staticSite.categoryTiles

function mapCategoryTiles(raw: Record<string, unknown>): CategoryTile[] {
  return [
    {
      label: 'Essentials',
      slug: 'essentials',
      image: String(raw.categoryEssentials ?? staticTiles[0].image),
    },
    {
      label: 'Graphics',
      slug: 'graphics',
      image: String(raw.categoryGraphics ?? staticTiles[1].image),
    },
    {
      label: 'Limited',
      slug: 'limited',
      image: String(raw.categoryLimited ?? staticTiles[2].image),
    },
  ]
}

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'
const apiVersion = '2024-01-01'

export function isSanityConfigured(): boolean {
  return Boolean(projectId)
}

async function sanityQuery<T>(query: string): Promise<T> {
  if (!projectId) throw new Error('Sanity project ID is not configured')

  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  )
  url.searchParams.set('query', query)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Sanity query failed (${response.status})`)
  }

  const json = (await response.json()) as { result: T }
  return json.result
}

const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt asc) {
  "id": _id,
  name,
  "slug": slug.current,
  description,
  price,
  category,
  featured,
  sizes,
  "image": mainImage.asset->url,
  "images": images[].asset->url
}`

const SITE_QUERY = `*[_type == "siteSettings"][0] {
  brandName,
  contactEmail,
  "logo": logo.asset->url,
  logoAlt,
  heroEyebrow,
  heroHeadline,
  heroSubcopy,
  "heroImage": heroImage.asset->url,
  heroImageAlt,
  promoText,
  storyTitle,
  storyBody,
  "storyImage": storyImage.asset->url,
  storyImageAlt,
  shippingNote,
  shopTitle,
  shopSubtitle,
  socials,
  "categoryEssentials": categoryEssentials.asset->url,
  "categoryGraphics": categoryGraphics.asset->url,
  "categoryLimited": categoryLimited.asset->url
}`

function mapSite(raw: Record<string, unknown> | null): SiteContent {
  if (!raw) return staticSite

  const headline = String(raw.heroHeadline ?? staticSite.hero.headline.join(' '))
  const parts = headline.includes('|') ? headline.split('|').map((s) => s.trim()) : headline.split(/\s+/).length > 3
    ? [headline.split(' ').slice(0, 2).join(' '), headline.split(' ').slice(2).join(' ')]
    : [headline, '']

  return {
    brandName: String(raw.brandName ?? staticSite.brandName),
    logo: String(raw.logo ?? staticSite.logo),
    logoAlt: String(raw.logoAlt ?? staticSite.logoAlt),
    contactEmail: String(raw.contactEmail ?? staticSite.contactEmail),
    hero: {
      eyebrow: String(raw.heroEyebrow ?? staticSite.hero.eyebrow),
      headline: [parts[0] || staticSite.hero.headline[0], parts[1] || staticSite.hero.headline[1]],
      subcopy: String(raw.heroSubcopy ?? staticSite.hero.subcopy),
      image: String(raw.heroImage ?? staticSite.hero.image),
      imageAlt: String(raw.heroImageAlt ?? staticSite.hero.imageAlt),
    },
    promo: String(raw.promoText ?? staticSite.promo),
    story: {
      title: String(raw.storyTitle ?? staticSite.story.title),
      body: String(raw.storyBody ?? staticSite.story.body),
      image: String(raw.storyImage ?? staticSite.story.image),
      imageAlt: String(raw.storyImageAlt ?? staticSite.story.imageAlt),
    },
    primarySocial: staticSite.primarySocial,
    socials: Array.isArray(raw.socials) && raw.socials.length > 0
      ? (raw.socials as SiteContent['socials'])
      : staticSite.socials,
    shippingNote: String(raw.shippingNote ?? staticSite.shippingNote),
    shop: {
      title: String(raw.shopTitle ?? staticSite.shop.title),
      subtitle: String(raw.shopSubtitle ?? staticSite.shop.subtitle),
    },
    categoryTiles: mapCategoryTiles(raw),
  }
}

function mapProducts(raw: Record<string, unknown>[]): Product[] {
  if (!raw.length) return staticProducts

  return raw.map((p) => ({
    id: String(p.id),
    name: String(p.name),
    slug: String(p.slug),
    description: String(p.description),
    price: Number(p.price),
    category: p.category as Product['category'],
    image: String(p.image ?? ''),
    images: Array.isArray(p.images) && p.images.length > 0
      ? (p.images as string[]).filter(Boolean)
      : p.image
        ? [String(p.image)]
        : [],
    sizes: Array.isArray(p.sizes)
      ? p.sizes.map((s) =>
          typeof s === 'string' ? s : String((s as { value?: string }).value ?? s),
        )
      : [],
    featured: Boolean(p.featured),
  }))
}

export async function fetchSanityContent(): Promise<{
  products: Product[]
  site: SiteContent
}> {
  if (!projectId) {
    return { products: staticProducts, site: staticSite }
  }

  const [productsRaw, siteRaw] = await Promise.all([
    sanityQuery<Record<string, unknown>[]>(PRODUCTS_QUERY),
    sanityQuery<Record<string, unknown> | null>(SITE_QUERY),
  ])

  return {
    products: mapProducts(productsRaw ?? []),
    site: mapSite(siteRaw),
  }
}

export { staticProducts, staticSite }
export type { SiteContent } from '../data/site'
