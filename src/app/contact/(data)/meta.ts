import { ContactPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const contactPageMeta = (data: ContactPageData): Metadata => {
  const { contactPage } = data
  const { heading, seo } = contactPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/contact',
  })
}
