import { defineField, defineType } from 'sanity'

export const contactInfoType = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'object',
  fieldsets: [
    {
      name: 'social',
      title: 'Social',
      description: 'Full links to your profiles (not just username).',
    },
  ],
  options: { collapsible: true },
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    // defineField({
    //   name: 'socialLinks',
    //   title: 'Social Links',
    //   type: 'socialLinks',
    // }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'string',
      fieldset: 'social',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'string',
      fieldset: 'social',
    }),
  ],
})
