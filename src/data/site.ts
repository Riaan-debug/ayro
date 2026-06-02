import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../lib/currency'
import type { Product } from '../types/product'

export type SocialLink = {
  label: string
  handle: string
  url: string
}

export type CategoryTile = {
  label: string
  slug: Product['category']
  image: string
}

export type LegalSectionContent = {
  title: string
  paragraphs: string[]
  listItems?: string[]
}

export type LegalPageContent = {
  intro: string
  sections: LegalSectionContent[]
  lastUpdated: string
}

export type SiteContent = {
  brandName: string
  logo: string
  logoAlt: string
  contactEmail: string
  hero: {
    eyebrow: string
    headline: [string, string]
    subcopy: string
    image: string
    imageAlt: string
  }
  promo: string
  story: {
    title: string
    body: string
    image: string
    imageAlt: string
  }
  primarySocial: 'instagram'
  socials: SocialLink[]
  shippingNote: string
  shop: {
    title: string
    subtitle: string
  }
  categoryTiles: CategoryTile[]
  privacyPolicy: LegalPageContent
  returnsPolicy: LegalPageContent
}

export const privacyPolicy: LegalPageContent = {
  intro:
    '{{brandName}} ("we", "us") respects your privacy. This policy explains what personal information we collect when you use our website and how we use it. By shopping with us or submitting a form, you agree to this policy.',
  sections: [
    {
      title: 'Information we collect',
      paragraphs: [
        'When you place an order, we collect your name, email address, and shipping details so we can fulfil and deliver your purchase.',
        'When you contact us or request a custom order, we collect the details you submit through our forms (name, email, and message content).',
        'We may collect basic technical data such as browser type and pages visited to keep the site secure and working correctly.',
      ],
    },
    {
      title: 'How we use your information',
      paragraphs: [
        'We use your information to process orders, respond to enquiries, send order-related communication, and improve our store. We do not sell your personal information to third parties.',
      ],
    },
    {
      title: 'Payment processing',
      paragraphs: [
        'Card and EFT payments are processed by [Paystack](https://paystack.com). We do not store your full card details on our servers. Paystack handles payment data according to their own privacy and security standards.',
      ],
    },
    {
      title: 'Form submissions',
      paragraphs: [
        'Contact and custom-order forms may be delivered to us via Formspree or a similar service so we can read and reply to your message.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'Under applicable South African law, including the Protection of Personal Information Act (POPIA), you may request access to, correction of, or deletion of personal information we hold about you. Contact us using the details below.',
      ],
    },
    {
      title: 'Contact',
      paragraphs: [
        'For privacy questions or requests, email {{contactEmail}} or visit our {{contactPage}}.',
      ],
    },
  ],
  lastUpdated: 'June 2026',
}

export const returnsPolicy: LegalPageContent = {
  intro:
    'We want you to love your {{brandName}} gear. If something is not right, here is how returns and refunds work for orders placed on our online store.',
  sections: [
    {
      title: '30-day returns',
      paragraphs: [
        'Unworn items in original condition may be returned within 30 days of delivery for a refund or exchange, subject to the conditions below.',
      ],
    },
    {
      title: 'Eligible items',
      paragraphs: [],
      listItems: [
        'Items must be unworn, unwashed, and free of odours or damage.',
        'Original tags and packaging should be included where possible.',
        'Custom-made or personalised orders may not be eligible unless faulty.',
        'Sale or final-clearance items are returnable only if faulty.',
      ],
    },
    {
      title: 'How to start a return',
      paragraphs: [
        'Email {{contactEmail}} with your order reference (from your Paystack confirmation or our reply email), the item(s) you wish to return, and the reason. We will confirm next steps and, if approved, provide return instructions for shipping within South Africa.',
        'You can also reach us via the {{contactPage}}.',
      ],
    },
    {
      title: 'Refunds',
      paragraphs: [
        'Approved refunds are processed to the original payment method used at checkout. Paystack and your bank may take several business days to show the credit on your account after we initiate the refund.',
        'Original shipping fees are non-refundable unless the return is due to our error or a faulty product.',
      ],
    },
    {
      title: 'Exchanges',
      paragraphs: [
        'To exchange for a different size or style, contact us with your order details. If the replacement item is available, we will guide you through the swap once we receive the returned item.',
      ],
    },
    {
      title: 'Faulty or incorrect items',
      paragraphs: [
        'If you receive the wrong item or a product with a manufacturing defect, contact us within 7 days of delivery with photos. We will arrange a replacement or full refund, including reasonable return shipping where applicable.',
      ],
    },
    {
      title: 'Questions',
      paragraphs: [
        'See also our {{privacyPage}}. For anything else, email {{contactEmail}}.',
      ],
    },
  ],
  lastUpdated: 'June 2026',
}

export const site: SiteContent = {
  brandName: 'AYRO',
  logo: '/images/ayro/logo.jpeg',
  logoAlt: 'AYRO logo',
  contactEmail: 'janaejayden86@gmail.com',
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
  shop: {
    title: 'Shop',
    subtitle:
      'AYRO essentials, graphics, and limited drops — priced in ZAR.',
  },
  categoryTiles: [
    { label: 'Essentials', slug: 'essentials', image: '/images/ayro/category-essentials.jpeg' },
    { label: 'Graphics', slug: 'graphics', image: '/images/ayro/category-graphics.jpeg' },
    { label: 'Limited', slug: 'limited', image: '/images/ayro/category-limited.jpeg' },
  ],
  privacyPolicy,
  returnsPolicy,
}

export const categoryLabels: Record<Product['category'] | 'all', string> = {
  all: 'All',
  essentials: 'Essentials',
  graphics: 'Graphics',
  limited: 'Limited',
}

export function getPrimarySocial(): SocialLink {
  return (
    site.socials.find((s) => s.label.toLowerCase() === site.primarySocial) ??
    site.socials[0]
  )
}

export const categoryTiles = site.categoryTiles

export const trustSignals = [
  { title: 'Premium Materials', desc: 'Heavyweight cotton built to last wash after wash.', icon: 'fabric' as const },
  { title: 'Simple Checkout', desc: 'Clear pricing in Rand. Straightforward order flow.', icon: 'checkout' as const },
  { title: 'Easy Returns', desc: 'Unworn items returned within 30 days, no hassle.', icon: 'returns' as const },
] as const
