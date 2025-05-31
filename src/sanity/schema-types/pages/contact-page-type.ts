import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
  ],
})
