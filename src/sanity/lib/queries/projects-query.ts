import { fragments } from './fragments'
import { groq } from 'next-sanity'

export const PROJECTS_QUERY = groq`*[_type=='project' && defined(slug)]{ ..., mainImage${fragments.image}, mainVideo${fragments.videoGroup} }`
