import { WritingSlugPageData } from '../page'
import { Metadata } from 'next'

import { getSanityImageUrl } from '@/utils/media'

import { buildOgImage, generatePageMeta } from '@/configuration/seo'

export const writingSlugPageMeta = (data: WritingSlugPageData): Metadata => {
  const { project, slug } = data
  const { seo } = project || {}

  const image = getSanityImageUrl(project?.mainImage, {
    ratio: '4/3',
    width: 800,
  })

  return generatePageMeta({
    title: `Writing - ${project?.title}`,
    description: seo?.description,
    url: `/portfolio/writing/${slug}`,
    // images: image ? [image] : undefined,
    // images: [
    //   buildOgImage({
    //     url: image,
    //     alt: project?.title,
    //     width: 533,
    //     height: 400,
    //   }),
    // ],
  })
}
