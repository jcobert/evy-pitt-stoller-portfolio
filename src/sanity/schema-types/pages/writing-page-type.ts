import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const writingPageType = defineType({
  name: 'writingPage',
  type: 'document',
  title: 'Writing',
  icon: DocumentTextIcon,
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
})
