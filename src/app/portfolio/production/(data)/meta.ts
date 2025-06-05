import { ProductionPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const productionPageMeta = (data: ProductionPageData): Metadata => {
  const { productionPage } = data
  const { heading, seo } = productionPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/portfolio/production',
  })
}
