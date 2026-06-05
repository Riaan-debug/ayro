import { defineField, defineType } from 'sanity'
import { PRODUCT_SIZE_OPTIONS } from './sizeOptions'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'price', title: 'Price (ZAR)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Essentials', value: 'essentials' },
          { title: 'Graphics', value: 'graphics' },
          { title: 'Limited', value: 'limited' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'featured', title: 'Featured on home', type: 'boolean', initialValue: false }),
    defineField({
      name: 'showOnShop',
      title: 'Show on shop',
      description: 'Turn off to hide this product from the website without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sizes',
      title: 'Sizes in stock',
      description: 'Tap each size that is available for this product.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [...PRODUCT_SIZE_OPTIONS],
        layout: 'grid',
      },
      validation: (r) => r.min(1).error('Select at least one size'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'mainImage', subtitle: 'category' },
  },
})
