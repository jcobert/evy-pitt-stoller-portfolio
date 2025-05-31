import { defineField, defineType } from 'sanity'

import {
  SanityTextAreaInput,
  SanityTextField,
} from '@/sanity/components/sanity-text-input'

export const pageHeadingType = defineType({
  name: 'pageHeading',
  type: 'object',
  title: 'Page Heading',
  fields: [
    defineField({ name: 'mainHeading', type: 'string', title: 'Main Heading' }),
    defineField({
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      components: { field: SanityTextField, input: SanityTextAreaInput },
    }),
  ],
})
