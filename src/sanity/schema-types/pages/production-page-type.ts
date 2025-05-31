import { defineField, defineType } from 'sanity'

export const productionPageType = defineType({
  name: 'productionPage',
  type: 'document',
  title: 'Production Page',
  fields: [
    defineField({
      name: 'heading',
      type: 'pageHeading',
      title: 'Page Heading',
    }),
  ],
})
