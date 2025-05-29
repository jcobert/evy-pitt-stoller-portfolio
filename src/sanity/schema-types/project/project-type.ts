import { ProjectsIcon, VideoIcon } from '@sanity/icons'
import { upperFirst } from 'lodash'
import { defineField, defineType } from 'sanity'

import { PROJECT_BY_SLUG_QUERYResult } from '@/sanity/types/generated/types'

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
      hidden: (props) => {
        const values = props?.parent as PROJECT_BY_SLUG_QUERYResult
        return values?.projectType === 'writing'
      },
    }),
    // image
    defineField({
      name: 'mainImage',
      title: 'Preview Image',
      type: 'image',
      description:
        'Used as cover photo for articles or thumbnail for uploaded videos.',
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
      hidden: (props) => {
        const values = props?.parent as PROJECT_BY_SLUG_QUERYResult
        return (
          values?.projectType === 'production' &&
          !values?.mainVideo?.videoUpload?.file
        )
      },
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
      description:
        'Any relevant categories (e.g. "Climate change, Documentary, Soft-core porn")',
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: { title: 'title', projectType: 'projectType' },
    prepare: ({ title, projectType }) => {
      return { title, subtitle: upperFirst((projectType as string) || '') }
    },
  },
})
