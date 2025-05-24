import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  description: 'Add a link to the video or upload a file.',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'youtube',
      type: 'string',
      title: 'Youtube Link',
      placeholder: 'E.g. https://youtube.com/watch?v=abc123',
    }),
    defineField({
      name: 'vimeo',
      type: 'string',
      title: 'Vimeo Link',
      placeholder: 'E.g. https://viemo.com/abc123',
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
    }),
    // defineField({
    //   name: 'alt',
    //   title: 'Video Description (alt text)',
    //   type: 'videoAltText',
    // }),
  ],
  preview: {
    select: { title: 'alt', file: 'file' },
    prepare: ({ title }) => {
      return { title: `Video${title ? ` - ${title}` : ''}` }
    },
  },
})
