import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import {
  SanityTextAreaInput,
  SanityTextField,
} from '@/sanity/components/sanity-text-input'

export const homePageType = defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'welcomeBlurb',
      type: 'string',
      title: 'Welcome Blurb',
      description:
        'The small block of text next to your photo. Use as a brief welcome message and/or call to action. Contact links are displayed alongside.',
      components: { field: SanityTextField, input: SanityTextAreaInput },
    }),
  ],
})
