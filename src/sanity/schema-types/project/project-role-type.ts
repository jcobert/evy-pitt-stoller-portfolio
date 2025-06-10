import { RobotIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const projectRoleType = defineType({
  name: 'projectRole',
  title: 'Role',
  type: 'document',
  icon: RobotIcon,
  description:
    'Represents your role in a project (e.g. Editor). Here is where you define available role options. You can then assign these roles within the project.',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
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
