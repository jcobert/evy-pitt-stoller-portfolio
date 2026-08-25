import { defineField, defineType } from 'sanity'

import { VimeoInput } from '@/sanity/components/vimeo-input'

export const vimeoVideoType = defineType({
  name: 'vimeoVideo',
  type: 'object',
  title: 'Vimeo Video',
  components: {
    input: VimeoInput,
  },
  fields: [
    defineField({ name: 'id', type: 'string' }),
    defineField({ name: 'url', type: 'string' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'thumbnailUrl', type: 'string' }),
  ],
})
