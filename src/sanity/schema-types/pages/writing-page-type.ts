import { defineField, defineType } from 'sanity'

export const writingPageType = defineType({
  name: 'writingPage',
  type: 'document',
  title: 'Writing Page',
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
  ],
})
