import { WritingPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const writingPageMeta = (data: WritingPageData): Metadata => {
  const { writingPage } = data
  const { heading, seo } = writingPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/portfolio/writing',
  })
}
