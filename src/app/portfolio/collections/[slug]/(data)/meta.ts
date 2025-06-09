import { CollectionSlugPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const collectionSlugPageMeta = (
  data: CollectionSlugPageData,
): Metadata => {
  const { collection, slug } = data
  // const { seo } = collection || {}

  // const thumbnail = getSanityVideo(project?.mainVideo, {
  //   thumbnailImage: project?.mainImage,
  // })?.thumbnailUrl

  return generatePageMeta({
    title: `Project Collections - ${collection?.title || 'Not found'}`,
    // description: seo?.description,
    url: `/portfolio/collections/${slug}`,
    // images: thumbnail ? [thumbnail] : undefined,
  })
}
