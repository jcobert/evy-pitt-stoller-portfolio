import { BsCollectionPlay } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export const projectSeriesType = defineType({
  name: 'projectSeries',
  title: 'Project Series',
  type: 'document',
  icon: BsCollectionPlay,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      // validation: (rules) => rules?.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Preview Image',
      type: 'image',
      description:
        'Optional cover photo for the series. If omitted photo from one of the projects will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Image Description (alt text)',
          type: 'imageAltText',
        }),
      ],
    }),
    // description
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
      description: 'Provide an introduction to the series.',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => {
      return { title }
    },
  },
})
