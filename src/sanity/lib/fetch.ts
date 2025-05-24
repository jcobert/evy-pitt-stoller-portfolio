import {
  PROJECTS_BY_TYPE_QUERYResult,
  PROJECTS_QUERYResult,
  Project,
} from '../types/generated/types'
import { client } from './client'
import {
  PROJECTS_BY_TYPE_QUERY,
  PROJECTS_QUERY,
} from './queries/projects-query'
import { sortBy } from 'lodash'

import { withoutBlanks } from '@/utils/general'

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

  return sortBy(projects, (proj) => proj?.datePublished)
}
