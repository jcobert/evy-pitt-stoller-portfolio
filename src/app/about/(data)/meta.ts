import { AboutPageData } from '../page'
import { Metadata } from 'next'

import { generatePageMeta } from '@/configuration/seo'

export const aboutPageMeta = (data: AboutPageData): Metadata => {
  const { aboutPage } = data
  const { heading, seo } = aboutPage || {}

  const title = heading?.mainHeading

  return generatePageMeta({
    title,
    description: seo?.description,
    url: '/about',
    // images: [
    //   getSanityImageUrl(profile?.photo, {
    //     ratio: 'square',
    //     crop: 'top',
    //   }),
    // ],
  })
}
