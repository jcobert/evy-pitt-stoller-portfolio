import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
  ],
})
