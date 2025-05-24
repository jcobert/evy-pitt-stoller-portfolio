import { groq } from 'next-sanity'

const image = groq`{ ..., asset-> }`

const video = groq`{ ..., file{ ..., asset-> } }`

export const fragments = { image, video }
