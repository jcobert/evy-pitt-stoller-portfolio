import { ProjectsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    // title
    defineField({ name: 'title', type: 'string' }),
    // slug
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    // date published
    defineField({ name: 'datePublished', type: 'date' }),
    // project type
    defineField({
      name: 'projectType',
      type: 'string',
      options: {
        list: [
          { title: 'Production', value: 'production' },
          { title: 'Writing', value: 'writing' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'production',
    }),
    // image
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Image Description (alt text)',
          description:
            'Used for people who cannot see the image. E.g. "A woman gardening"',
        }),
      ],
    }),
    // body
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    // tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
