import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productionPageType = defineType({
  name: 'productionPage',
  type: 'document',
  title: 'Production',
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
