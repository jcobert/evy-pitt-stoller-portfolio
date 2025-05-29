import {
  PROFILE_QUERYResult,
  PROJECTS_BY_TYPE_QUERYResult,
  PROJECTS_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
  Project,
  Slug,
} from '../types/generated/types'
import { sanityFetch } from './live'
import { PROFILE_QUERY } from './queries/profile-query'
import {
  PROJECTS_BY_TYPE_QUERY,
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from './queries/projects-query'
import { sortBy } from 'lodash'
import { draftMode } from 'next/headers'

import { withoutBlanks } from '@/utils/general'

export type SanityFetchContext =
  | 'component'
  | 'generateMetadata'
  | 'generateStaticParams'
  | 'generateSitemaps'
// | 'generateViewport'
// | 'generateImageMetadata'

const alwaysPublishContext = ['generateStaticParams'] as SanityFetchContext[]

type SanityFetchParams = Parameters<typeof sanityFetch>['0'] & {
  context: SanityFetchContext
}

type SanityFetchOptions = Omit<SanityFetchParams, 'query'>

const liveFetch = async <TData>(options: SanityFetchParams) => {
  const { query, context, ...opts } = options || {}

  const ctx = context || 'page'

  let perspective = 'published' as (typeof options)['perspective']
  if (alwaysPublishContext?.includes(ctx)) perspective = 'published'
  else if ((await draftMode()).isEnabled) perspective = 'previewDrafts'

  const res = await sanityFetch({
    query,
    perspective,
    stega: ctx === 'component' ? true : false,
    ...opts,
  })

  return res?.data as TData
}

/** Gets many projects. */
export const getProjects = async <TProjectType extends Project['projectType']>(
  params: SanityFetchOptions & { projectType?: TProjectType },
) => {
  const { projectType, ...options } = params || {}
  const query = projectType ? PROJECTS_BY_TYPE_QUERY : PROJECTS_QUERY

  const queryParams = { projectType }

  // const projects = await client.fetch<
  //   TProjectType extends undefined
  //     ? PROJECTS_QUERYResult
  //     : PROJECTS_BY_TYPE_QUERYResult
  // >(query, withoutBlanks(queryParams))

  const projects = await liveFetch<
    TProjectType extends undefined
      ? PROJECTS_QUERYResult
      : PROJECTS_BY_TYPE_QUERYResult
  >({ query, params: withoutBlanks(queryParams), ...options })

  return sortBy(projects, (proj) => proj?.datePublished)?.reverse()
}

/** Gets a single project by slug. */
export const getProject = async (
  params: SanityFetchOptions & { slug: Slug['current'] },
) => {
  const { slug, ...options } = params || {}

  const queryParams = { slug }

  // const project = await client.fetch<PROJECT_BY_SLUG_QUERYResult>(
  //   PROJECT_BY_SLUG_QUERY,
  //   queryParams,
  // )

  const project = await liveFetch<PROJECT_BY_SLUG_QUERYResult>({
    query: PROJECT_BY_SLUG_QUERY,
    params: queryParams,
    ...options,
  })

  return project
}
/** Gets profile. */
export const getProfile = async (options: SanityFetchOptions) => {
  // const profile = await client.fetch<PROFILE_QUERYResult>(PROFILE_QUERY)
  const profile = await liveFetch<PROFILE_QUERYResult>({
    query: PROFILE_QUERY,
    ...options,
  })
  return profile
}
