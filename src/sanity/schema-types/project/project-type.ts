import {
  InfoFilledIcon,
  ProjectsIcon,
  SearchIcon,
  TagsIcon,
  VideoIcon,
} from '@sanity/icons'
import { upperFirst } from 'lodash'
import { defineField, defineType } from 'sanity'

import { getSanityImageUrl, getSanityVideo } from '@/utils/media'

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
    { name: 'classification', title: 'Classification', icon: TagsIcon },
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

    // CLASSIFICATION
    // roles
    defineField({
      name: 'roles',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'projectRole' } }],
      title: 'Roles',
      description:
        'Your involvement in the project (e.g. Marketing, Project Management).',
      options: { sortable: true },
      group: 'classification',
    }),
    // // category
    // defineField({
    //   name: 'category',
    //   type: 'reference',
    //   to: { type: 'projectCategory' },
    //   title: 'Category',
    //   description: 'The top-level classification (e.g. Film).',
    //   group: 'classification',
    // }),
    // // subcategory
    // defineField({
    //   name: 'subcategory',
    //   type: 'reference',
    //   to: { type: 'projectSubcategory' },
    //   title: 'Subcategory',
    //   description:
    //     'Further classification within the specified category (e.g. Scripted).',
    //   group: 'classification',
    //   options: {
    //     filter: `*[_type=="projectCategory" && _id==^.category._ref][0]`,
    //   },
    // }),
    // joint category/subcateory selector.
    // defineField({
    //   name: 'category',
    //   type: 'reference',
    //   to: [{ type: 'projectSubcategory' }],
    //   title: 'Category',
    //   group: 'classification',
    // }),
    // series
    defineField({
      name: 'series',
      type: 'reference',
      to: { type: 'projectSeries' },
      title: 'Project Series',
      description:
        'If project is part of a series add it here. Select from existing series or create a new one.',
      group: 'classification',
    }),
    // tags
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Any additional categories/relevant keywords (e.g. "Climate change, Soft-core porn")',
      options: { layout: 'tags' },
      group: 'classification',
    }),

    // SEO
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projectType: 'projectType',
      media: 'mainImage',
      video: 'mainVideo',
    },
    prepare: ({ title, projectType, media, video }) => {
      const img = getSanityImageUrl(media)
      const videoThumbnail = getSanityVideo(video)?.thumbnailUrl

      return {
        title,
        subtitle: upperFirst((projectType as string) || ''),
        imageUrl: img || videoThumbnail || undefined,
      }
    },
  },
})
