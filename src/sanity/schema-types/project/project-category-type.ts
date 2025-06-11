import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projectCategoryType = defineType({
  name: 'projectCategory',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  description:
    'Represents a project category (e.g. Feature Film). Here is where you define available category options. You can then assign these categories within the project.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rules) => rules?.required(),
    }),
    defineField({
      name: 'subcategories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'projectSubcategory' } }],
      title: 'Subcategories',
      description: 'Multiple nested categories to further organize projects.',
      options: { sortable: true, layout: 'list' },
    }),
    // defineField({
    //   name: 'subcategories',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   title: 'Subcategories',
    //   description: 'Multiple nested categories to further organize projects.',
    //   options: { sortable: true, layout: 'list' },
    // }),
  ],
  preview: {
    select: { title: 'name' },
    prepare: ({ title }) => {
      return { title }
    },
  },
})
