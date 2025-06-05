import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'
import { HOME_PAGE_QUERYResult } from '@/sanity/types/generated/types'

export const homePageMeta = (data: HOME_PAGE_QUERYResult): Metadata => {
  const seo = data?.seo

  return generatePageMeta({
    title: 'Home',
    description: seo?.description,
    url: '/',
  })
}
