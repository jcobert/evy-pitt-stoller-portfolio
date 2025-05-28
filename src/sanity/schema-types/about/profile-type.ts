import { BsPersonFill } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: BsPersonFill,
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      description: 'For internal use only.',
      initialValue: 'profile',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Headshot',
      description: 'Featured on the home page.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'contactInfo',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
    }),
  ],
})
