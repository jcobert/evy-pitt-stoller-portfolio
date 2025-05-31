import { PageDocumentType } from '../types/general'
import {
  ABOUT_PAGE_QUERYResult,
  CONTACT_PAGE_QUERYResult,
  HOME_PAGE_QUERYResult,
  PRODUCTION_PAGE_QUERYResult,
  PROFILE_QUERYResult,
  PROJECTS_BY_TYPE_QUERYResult,
  PROJECTS_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
  Project,
  Slug,
  WRITING_PAGE_QUERYResult,
} from '../types/generated/types'
import { client } from './client'
import {
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  PRODUCTION_PAGE_QUERY,
  WRITING_PAGE_QUERY,
} from './queries/page-query'
import { PROFILE_QUERY } from './queries/profile-query'
import {
  PROJECTS_BY_TYPE_QUERY,
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
} from './queries/projects-query'
import { sortBy } from 'lodash'

import { withoutBlanks } from '@/utils/general'

/** Gets many projects. */
export const getProjects = async <
  TProjectType extends Project['projectType'],
>(params?: {
  projectType: TProjectType
}) => {
  const { projectType } = params || {}
  const query = projectType ? PROJECTS_BY_TYPE_QUERY : PROJECTS_QUERY

  const queryParams = { projectType }

  const projects = await client.fetch<
    TProjectType extends undefined
      ? PROJECTS_QUERYResult
      : PROJECTS_BY_TYPE_QUERYResult
  >(query, withoutBlanks(queryParams))

  return sortBy(projects, (proj) => proj?.datePublished)?.reverse()
}

/** Gets a single project by slug. */
export const getProject = async (params: { slug: Slug['current'] }) => {
  const { slug } = params || {}

  if (!slug) throw new Error('Missing slug.')

  const queryParams = { slug }

  const project = await client.fetch<PROJECT_BY_SLUG_QUERYResult>(
    PROJECT_BY_SLUG_QUERY,
    queryParams,
  )

  return project
}

/** Gets profile. */
export const getProfile = async () => {
  const profile = await client.fetch<PROFILE_QUERYResult>(PROFILE_QUERY)
  return profile
}

const PAGE_QUERIES = {
  aboutPage: ABOUT_PAGE_QUERY,
  contactPage: CONTACT_PAGE_QUERY,
  homePage: HOME_PAGE_QUERY,
  productionPage: PRODUCTION_PAGE_QUERY,
  writingPage: WRITING_PAGE_QUERY,
} satisfies { [x in PageDocumentType]: string }

/** Gets page. */
export const getPage = async <TPage extends PageDocumentType>(page: TPage) => {
  const query = PAGE_QUERIES?.[page]

  if (!query)
    throw new Error(
      'Unable to find page query. Invalid argument or PAGES_QUERIES missing definition.',
    )

  const res =
    await client.fetch<
      TPage extends 'aboutPage'
        ? ABOUT_PAGE_QUERYResult
        : TPage extends 'contactPage'
          ? CONTACT_PAGE_QUERYResult
          : TPage extends 'homePage'
            ? HOME_PAGE_QUERYResult
            : TPage extends 'productionPage'
              ? PRODUCTION_PAGE_QUERYResult
              : TPage extends 'writingPage'
                ? WRITING_PAGE_QUERYResult
                : null
    >(query)
  return res
}
