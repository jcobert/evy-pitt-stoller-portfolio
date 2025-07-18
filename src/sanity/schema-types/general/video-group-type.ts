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
      description: 'Enter the full URL.',
    }),
    defineField({
      name: 'vimeo',
      type: 'vimeo',
      title: 'Vimeo',
      description:
        'Enter just the ID at the end of the URL (e.g. for "https://vimeo.com/12345" put "12345").',
      options: {
        fields: ['link', 'description', 'description_rich'],
      },
    }),
    defineField({
      name: 'otherLink',
      type: 'url',
      title: 'Other Link',
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
