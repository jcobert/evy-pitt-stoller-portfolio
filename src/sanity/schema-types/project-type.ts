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
      title: 'Image',
      type: 'image',
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
      hidden: (props) => props?.parent?.projectType === 'production',
    }),
    // video
    defineField({
      name: 'mainVideo',
      title: 'Video',
      type: 'video',
      hidden: (props) => props?.parent?.projectType === 'writing',
    }),
    // body
    defineField({
      name: 'description',
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
