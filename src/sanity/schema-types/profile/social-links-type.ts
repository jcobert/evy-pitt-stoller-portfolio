import { defineField, defineType } from 'sanity'

export const socialLinksType = defineType({
  name: 'socialLinks',
  title: 'Social Links',
  description: 'Links to associated profiles.',
  type: 'object',
  fields: [
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'string',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'string',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'string',
    }),
  ],
  options: { collapsible: true },
})
