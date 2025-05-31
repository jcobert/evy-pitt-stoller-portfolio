import { BsPersonFill } from 'react-icons/bs'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'titles',
      type: 'array',
      title: 'Titles',
      description:
        'Job role or professional identity. Add multiple items separately.',
      of: [
        defineArrayMember({
          type: 'string',
          placeholder: 'e.g. Licensed Electrician',
        }),
      ],
    }),
    defineField({
      name: 'locations',
      type: 'array',
      title: 'Locations',
      description:
        'Where you are based/located. Add multiple items separately.',
      of: [
        defineArrayMember({
          type: 'string',
          placeholder: 'e.g. New York, NY',
        }),
      ],
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
