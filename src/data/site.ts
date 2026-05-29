import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../lib/currency'

export type SocialLink = {
  label: string
  handle: string
  url: string
}

export const site = {
  brandName: 'AYRO',
  contactEmail: 'hello@theofficialayro.com',
  hero: {
    eyebrow: 'New Season',
    headline: ['Wear your', 'ambition.'],
    subcopy:
      'Premium streetwear built for the long run. Shop the drop or request a custom run.',
    image: '/images/ayro/hero.jpeg',
    imageAlt: 'AYRO tees on chrome display',
  },
  promo: `Free shipping on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
  story: {
    title: 'Built For The Long Run',
    body: 'AYRO started with one goal: create t-shirts people trust and actually want to wear. From everyday essentials to bold graphics and limited drops, we are building a steady brand with loyal customers and quality you can feel.',
    image: '/images/ayro/story.jpeg',
    imageAlt: 'AYRO white tee with liquid metal graphic',
  },
  primarySocial: 'instagram' as const,
  socials: [
    {
      label: 'Instagram',
      handle: '@theofficialayro',
      url: 'https://www.instagram.com/theofficialayro',
    },
    {
      label: 'TikTok',
      handle: '@theofficialayro1',
      url: 'https://www.tiktok.com/@theofficialayro1',
    },
  ] satisfies SocialLink[],
  shippingNote: 'Prices in ZAR · Ships throughout South Africa',
} as const

export function getPrimarySocial(): SocialLink {
  return (
    site.socials.find((s) => s.label.toLowerCase() === site.primarySocial) ??
    site.socials[0]
  )
}

export const categoryTiles = [
  { label: 'Essentials', slug: 'essentials', image: '/images/ayro/category-essentials.jpeg' },
  { label: 'Graphics', slug: 'graphics', image: '/images/ayro/category-graphics.jpeg' },
  { label: 'Limited', slug: 'limited', image: '/images/ayro/category-limited.jpeg' },
] as const

export const trustSignals = [
  { title: 'Premium Materials', desc: 'Heavyweight cotton built to last wash after wash.', icon: 'fabric' as const },
  { title: 'Simple Checkout', desc: 'Clear pricing in Rand. Straightforward order flow.', icon: 'checkout' as const },
  { title: 'Easy Returns', desc: 'Unworn items returned within 30 days, no hassle.', icon: 'returns' as const },
] as const
