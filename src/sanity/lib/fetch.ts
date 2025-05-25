import {
  PROJECTS_BY_TYPE_QUERYResult,
  PROJECTS_QUERYResult,
  PROJECT_BY_SLUG_QUERYResult,
  Project,
  Slug,
} from '../types/generated/types'
import { client } from './client'
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

  const queryParams = { slug }

  const project = await client.fetch<PROJECT_BY_SLUG_QUERYResult>(
    PROJECT_BY_SLUG_QUERY,
    queryParams,
  )

  return project
}
