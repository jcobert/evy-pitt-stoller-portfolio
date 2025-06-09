import { MdOutlineCollectionsBookmark } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const projectCollectionType = defineType({
  name: 'projectCollection',
  title: 'Project Collection',
  type: 'document',
  icon: MdOutlineCollectionsBookmark,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Name of the collection',
      type: 'string',
      // validation: (rules) => rules?.required(),
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
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
      title: 'Projects',
      description: 'All projects that are part of this collection.',
      options: { sortable: true, layout: 'grid' },
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => {
      return { title }
    },
  },
})
