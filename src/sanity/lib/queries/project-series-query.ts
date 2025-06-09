import { groq } from 'next-sanity'

export const PROJECT_SERIES_QUERY = groq`*[_type=='projectSeries']{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }`

export const PROJECT_SERIES_BY_ID_QUERY = groq`*[_type=='projectSeries' && _id==$id]{ ..., mainImage{ ..., asset-> }, description[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }[0]`
