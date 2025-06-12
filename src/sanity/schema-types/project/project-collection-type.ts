import { BsCollectionPlay } from 'react-icons/bs'
// import { MdOutlineCollectionsBookmark } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const projectCollectionType = defineType({
  name: 'projectCollection',
  title: 'Project Collection',
  type: 'document',
  icon: BsCollectionPlay,
  groups: [
    { name: 'basicInfo', title: 'Basic Info', default: true },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Name of the collection (e.g. Film).',
      type: 'string',
      group: ['basicInfo'],
      // validation: (rules) => rules?.required(),
    }),
    // sections
    defineField({
      name: 'sections',
      title: 'Sections',
      description:
        'Add projects here. Group them into sections to further organize projects within this collection.',
      group: ['basicInfo'],
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'The title of the section (e.g. Scripted).',
            }),
            defineField({
              name: 'projects',
              type: 'array',
              of: [{ type: 'reference', to: { type: 'project' } }],
              title: 'Projects',
              description:
                'All projects that are part of this collection. Note: If adding a series, use the series field below. Do not add the individual projects here.',
              options: { sortable: true, layout: 'list' },
            }),
            defineField({
              name: 'series',
              type: 'array',
              of: [{ type: 'reference', to: { type: 'projectSeries' } }],
              title: 'Series',
              description: 'All series that are part of this collection.',
              options: { sortable: true, layout: 'list' },
            }),
          ],
        },
      ],

      options: { sortable: true, layout: 'list', modal: { type: 'dialog' } },
    }),
    // slug
    // defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'slug',
      title: 'URL-friendly Name (required)',
      type: 'slug',
      hidden: true,
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Just click "Generate" after entering something in the Title field above, to automatically fill this in.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Preview Image',
      type: 'image',
      description:
        'Optional cover photo for the collection. If omitted, photo from one of the projects will be used.',
      group: ['details'],
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
      description: 'Overview of the collection.',
      group: ['details'],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => {
      return { title }
    },
  },
})
