import { ProductionSlugPageData } from '../page'
import { Metadata } from 'next'

import { getSanityVideo } from '@/utils/media'

import { generatePageMeta } from '@/configuration/seo'

export const productionSlugPageMeta = (
  data: ProductionSlugPageData,
): Metadata => {
  const { project, slug } = data
  const { seo } = project || {}

  const thumbnail = getSanityVideo(project?.mainVideo, {
    thumbnailImage: project?.mainImage,
  })?.thumbnailUrl

  return generatePageMeta({
    title: `Production - ${project?.title || 'Not found'}`,
    description: seo?.description,
    url: `/portfolio/production/${slug}`,
    // images: thumbnail ? [thumbnail] : undefined,
  })
}
