import {
  InfoFilledIcon,
  ProjectsIcon,
  SearchIcon,
  VideoIcon,
} from '@sanity/icons'
import { upperFirst } from 'lodash'
import { defineField, defineType } from 'sanity'

import {
  SanityTextAreaInput,
  SanityTextField,
} from '@/sanity/components/sanity-text-input'
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
    {
      name: 'article',
      title: 'Article',
      description: 'Add the link and preview for the article.',
      // 'The main image or video for the project. If both are added, only the video will be used.',
      options: { collapsible: true },
    },
  ],
  groups: [
    { name: 'info', icon: InfoFilledIcon },
    { name: 'media', icon: VideoIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
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
      validation: (rule) => {
        return rule.custom((val, ctx) => {
          const values = ctx?.parent as PROJECT_BY_SLUG_QUERYResult
          if (
            values?.projectType === 'production' &&
            (!!values?.mainVideo?.videoUpload?.file ||
              !!values?.mainVideo?.otherLink) &&
            !val
          ) {
            return { message: 'Required.' }
          }
          return true
        })
      },
      hidden: (props) => {
        const values = props?.parent as PROJECT_BY_SLUG_QUERYResult
        return (
          values?.projectType === 'production' &&
          !values?.mainVideo?.videoUpload?.file &&
          !values?.mainVideo?.otherLink
        )
      },
    }),
    // article info
    defineField({
      name: 'articleLink',
      type: 'url',
      title: 'Article Link',
      description: 'Paste the link to your article here.',
      fieldset: 'article',
      validation: (rule) => {
        return rule.custom((val, ctx) => {
          const values = ctx?.parent as PROJECT_BY_SLUG_QUERYResult
          if (values?.projectType === 'writing' && !val) {
            return { message: 'Required.' }
          }
          return true
        })
      },
      hidden: (props) => {
        const values = props?.parent as PROJECT_BY_SLUG_QUERYResult
        return values?.projectType !== 'writing'
      },
    }),
    defineField({
      name: 'articlePreview',
      type: 'string',
      title: 'Article Preview',
      description:
        'A sample of the article (e.g. the first paragraph). A link will be provided to the reader to continue reading at the link you provided above.',
      fieldset: 'article',
      components: { input: SanityTextAreaInput, field: SanityTextField },
      hidden: (props) => {
        const values = props?.parent as PROJECT_BY_SLUG_QUERYResult
        return values?.projectType !== 'writing'
      },
    }),
    // body
    defineField({
      name: 'description',
      type: 'blockContent',
      title: 'Description',
      description:
        'Provide some background or introduction to the work - things you learned, problems you solved, etc.',
    }),
    // series
    defineField({
      name: 'series',
      type: 'reference',
      to: { type: 'projectSeries' },
      title: 'Project Series',
      description:
        'Use if project is part of a series. Select an existing or create a new series.',
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
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', projectType: 'projectType' },
    prepare: ({ title, projectType }) => {
      return { title, subtitle: upperFirst((projectType as string) || '') }
    },
  },
})
