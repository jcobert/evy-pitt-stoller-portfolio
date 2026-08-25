import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'
import { HOME_PAGE_QUERY_RESULT } from '@/sanity/types/generated/types'

export const homePageMeta = (data: HOME_PAGE_QUERY_RESULT): Metadata => {
  const seo = data?.seo

  return generatePageMeta({
    title: 'Home',
    description: seo?.description,
    url: '/',
  })
}
