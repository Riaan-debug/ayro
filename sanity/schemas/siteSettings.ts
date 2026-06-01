import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName', title: 'Brand name', type: 'string', initialValue: 'AYRO' }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'logoAlt', title: 'Logo alt text', type: 'string' }),
    defineField({ name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero headline', description: 'Use | to split lines, e.g. Wear your|ambition.', type: 'string' }),
    defineField({ name: 'heroSubcopy', title: 'Hero subcopy', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image' }),
    defineField({ name: 'heroImageAlt', title: 'Hero image alt', type: 'string' }),
    defineField({ name: 'promoText', title: 'Promo bar text', type: 'string' }),
    defineField({ name: 'storyTitle', title: 'Story title', type: 'string' }),
    defineField({ name: 'storyBody', title: 'Story body', type: 'text', rows: 4 }),
    defineField({ name: 'storyImage', title: 'Story image', type: 'image' }),
    defineField({ name: 'storyImageAlt', title: 'Story image alt', type: 'string' }),
    defineField({ name: 'shippingNote', title: 'Shipping note', type: 'string' }),
    defineField({ name: 'shopTitle', title: 'Shop page title', type: 'string' }),
    defineField({ name: 'shopSubtitle', title: 'Shop page subtitle', type: 'text', rows: 2 }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'handle', type: 'string', title: 'Handle' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({ name: 'categoryEssentials', title: 'Category tile — Essentials', type: 'image' }),
    defineField({ name: 'categoryGraphics', title: 'Category tile — Graphics', type: 'image' }),
    defineField({ name: 'categoryLimited', title: 'Category tile — Limited', type: 'image' }),
  ],
})
