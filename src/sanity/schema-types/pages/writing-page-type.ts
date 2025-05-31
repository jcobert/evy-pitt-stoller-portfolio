import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const writingPageType = defineType({
  name: 'writingPage',
  type: 'document',
  title: 'Writing Page',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
  ],
})
