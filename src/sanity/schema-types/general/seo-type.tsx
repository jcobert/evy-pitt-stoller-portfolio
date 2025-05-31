import { SearchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import {
  SanityTextAreaInput,
  SanityTextField,
} from '@/sanity/components/sanity-text-input'

export const seoType = defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO',
  description: 'Used for Google search results',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'description',
      type: 'string',
      title: 'Page Description',
      description: 'May display in search results under the link.',
      components: {
        field: SanityTextField,
        input: (props) => (
          <SanityTextAreaInput {...props} characterLimit={185} />
        ),
      },
    }),
  ],
})
