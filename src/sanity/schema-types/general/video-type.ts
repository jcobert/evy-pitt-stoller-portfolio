import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
      description: 'Make sure to also add a description below.',
    }),
    defineField({
      name: 'alt',
      title: 'Video Description',
      type: 'videoAltText',
      // validation: (rules) => rules.required(),
    }),
  ],
  preview: {
    select: { title: 'alt', file: 'file' },
    prepare: ({ title }) => {
      return { title: `Video${title ? ` - ${title}` : ''}` }
    },
  },
})
