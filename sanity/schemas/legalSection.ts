import { defineField, defineType } from 'sanity'

export const legalSection = defineType({
  name: 'legalSection',
  title: 'Legal section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section title', type: 'string' }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description:
        'Use {{brandName}}, {{contactEmail}}, {{contactPage}}, {{privacyPage}}, or [link text](https://example.com) where needed.',
    }),
    defineField({
      name: 'listItems',
      title: 'Bullet points (optional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
