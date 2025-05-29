import { apiVersion, dataset, projectId, studioUrl } from '../env'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl, enabled: process.env.NODE_ENV !== 'production' },
})
