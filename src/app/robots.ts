import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL || ''

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

export default robots
