import { groq } from 'next-sanity'

/** @todo Ideal to use fragments but typegen can't generate query response types properly. Revisit if sanity updates to support this. */
// export const PROJECTS_QUERY = groq`*[_type=='project' && defined(slug)]{ ..., mainImage${fragments.image}, mainVideo${fragments.videoGroup} }`

export const PROJECTS_QUERY = groq`*[_type=='project' && defined(slug)]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ ..., videoUpload{ ..., file{ ..., asset-> } } }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, series->{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, roles[]->, category-> }`

export const PROJECTS_BY_TYPE_QUERY = groq`*[_type=='project' && projectType==$projectType && defined(slug)]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ ..., videoUpload{ ..., file{ ..., asset-> } } }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, series->{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, roles[]->, category-> }`

export const PROJECTS_BY_SERIES_QUERY = groq`*[_type=='project' && series._ref==$seriesId]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ ..., videoUpload{ ..., file{ ..., asset-> } } }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, series->{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, roles[]->, category-> }`

export const PROJECTS_BY_FEATURED_QUERY = groq`*[_type=='project' && featured==$featured]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ ..., videoUpload{ ..., file{ ..., asset-> } } }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, series->{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, roles[]->, category-> }`

export const PROJECT_BY_SLUG_QUERY = groq`*[_type=='project' && slug.current==$slug]{ ..., "tags": coalesce(tags, []), mainImage{ ..., asset-> }, mainVideo{ ..., videoUpload{ ..., file{ ..., asset-> } } }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, series->{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, roles[]->, "category": *[_type == "projectCollection" && references(^._id)]{ _id, title, "subcategory": *[_type == "projectCollection" && references(^.^._id)][0].sections[]{_key, title, "projects": projects[^.^.^._id == _ref]}[length(projects) > 0][0].title }[0] }[0]`
