import { groq } from 'next-sanity'

/** @todo Ideal to use fragments but typegen can't generate query response types properly. Revisit if sanity updates to support this. */
// export const PROJECTS_QUERY = groq`*[_type=='project' && defined(slug)]{ ..., mainImage${fragments.image}, mainVideo${fragments.videoGroup} }`

export const PROJECTS_QUERY = groq`*[_type=='project' && defined(slug)]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ "youtube": coalesce(youtube, ''), "vimeo": coalesce(vimeo, ''), videoUpload{ ..., file{ ..., asset-> } } } }`

export const PROJECTS_BY_TYPE_QUERY = groq`*[_type=='project' && projectType==$projectType && defined(slug)]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ "youtube": coalesce(youtube, ''), "vimeo": coalesce(vimeo, ''), videoUpload{ ..., file{ ..., asset-> } } } }`
