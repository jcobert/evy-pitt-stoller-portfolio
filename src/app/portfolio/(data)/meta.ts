import { PortfolioPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const portfolioPageMeta = (data: PortfolioPageData): Metadata => {
  const { portfolioPage } = data
  const { heading, seo } = portfolioPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/portfolio',
  })
}
