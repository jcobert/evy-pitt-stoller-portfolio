import { defineType } from 'sanity'

export const imageAltText = defineType({
  name: 'imageAltText',
  type: 'string',
  title: 'Image Description (alt text)',
  description:
    'Used for people who cannot see the image and for Google search. E.g. "A woman gardening"',
})

export const videoAltText = defineType({
  name: 'videoAltText',
  type: 'string',
  title: 'Video Description (alt text)',
  description:
    'Used for people who cannot see the video and for Google search. E.g. "A man chopping vegetables"',
})
