import { groq } from 'next-sanity'

export const HOME_PAGE_QUERY = groq`*[_type=='homePage' && _id=="homePage"]{ ... }[0]`

export const ABOUT_PAGE_QUERY = groq`*[_type=='aboutPage' && _id=="aboutPage"]{ ... }[0]`

export const CONTACT_PAGE_QUERY = groq`*[_type=='contactPage' && _id=="contactPage"]{ ... }[0]`

export const PRODUCTION_PAGE_QUERY = groq`*[_type=='productionPage' && _id=="productionPage"]{ ... }[0]`

export const WRITING_PAGE_QUERY = groq`*[_type=='writingPage' && _id=="writingPage"]{ ... }[0]`
