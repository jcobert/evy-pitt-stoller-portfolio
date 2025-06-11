import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projectSubcategoryType = defineType({
  name: 'projectSubcategory',
  title: 'Subcategory',
  type: 'document',
  icon: TagIcon,
  description:
    'Represents a project subcategory (e.g. Scripted). Here is where you define available subcategory options. You can then assign a subcategory within the project.',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rules) => rules?.required(),
    }),
  ],
  preview: {
    select: { title: 'name' },
    prepare: ({ title }) => {
      return { title }
    },
  },
})
