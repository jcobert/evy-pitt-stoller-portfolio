import { ProjectsIcon, VideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fieldsets: [
    {
      name: 'media',
      description: '',
      // 'The main image or video for the project. If both are added, only the video will be used.',
      options: { collapsible: true },
    },
  ],
  groups: [{ name: 'info' }, { name: 'media', icon: VideoIcon }],
  fields: [
    // title
    defineField({
      name: 'title',
      type: 'string',
      validation: (rules) => rules?.required(),
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
        layout: 'radio',
        direction: 'vertical',
      },
      initialValue: 'production',
      validation: (rules) => rules?.required(),
    }),
    // video
    defineField({
      name: 'mainVideo',
      title: 'Video',
      type: 'videoGroup',
      group: 'media',
      hidden: (props) => props?.parent?.projectType === 'writing',
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
      group: 'media',
      // hidden: (props) => props?.parent?.projectType === 'production',
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
