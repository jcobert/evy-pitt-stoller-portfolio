import { groq } from 'next-sanity'

export const PROFILE_QUERY = groq`*[_type=='profile' && _id=="profile"]{ ..., photo{ ..., asset-> }, companies[]{ ..., logo{ ..., asset-> } } }[0]`
