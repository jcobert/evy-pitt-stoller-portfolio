import { groq } from 'next-sanity'

const image = groq`{ ..., asset-> }`

const video = groq`{ ..., file{ ..., asset-> } }`

const videoGroup = groq`{ ..., videoUpload${video} }`

export const fragments = { image, video, videoGroup }
