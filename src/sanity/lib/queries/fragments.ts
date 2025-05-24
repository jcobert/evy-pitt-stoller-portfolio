import { groq } from 'next-sanity'

const image = groq`{ ..., asset-> }`

const file = groq`{ ..., file{ ..., asset-> } }`

// const videoGroup = groq`{ ..., videoUpload${file} }`
const videoGroup = groq`{ "youtube": coalesce(youtube, ''), "vimeo": coalesce(vimeo, ''), videoUpload${file} }`

export const fragments = { image, file, videoGroup }
