import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const videoGroupType = defineType({
  name: 'videoGroup',
  type: 'object',
  title: 'Video',
  description: 'Add a link to the video or upload a file.',
  icon: PlayIcon,
  fields: [
    // defineField({
    //   name: 'youtube',
    //   type: 'string',
    //   title: 'Youtube Link',
    //   placeholder: 'e.g. https://youtube.com/watch?v=abc123',
    // }),
    defineField({
      name: 'youtube',
      type: 'youtubeVideo',
      title: 'Youtube',
    }),
    defineField({
      name: 'vimeo',
      type: 'string',
      title: 'Vimeo Link',
      placeholder: 'e.g. https://viemo.com/abc123',
    }),
    defineField({ name: 'videoUpload', type: 'video', title: 'Upload' }),
  ],
  preview: {
    select: { youtube: 'youtube', vimeo: 'vimeo', file: 'videoUpload' },
    prepare: ({ youtube, vimeo, file }) => {
      if (youtube) return { title: 'Youtube link', subtitle: youtube }
      else if (vimeo) return { title: 'Vimeo link', subtitle: vimeo }
      else if (file) return { title: 'Video upload', subtitle: file?.alt }
      return { title: 'Video' }
    },
  },
})
