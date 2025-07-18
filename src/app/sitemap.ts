import { MetadataRoute } from 'next'

import { siteConfig } from '@/configuration/site'
import { getAllProjectCollections, getProjects } from '@/sanity/lib/fetch'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_URL = siteConfig.url

  const [productions, writing, collections] = await Promise.all([
    getProjects({ projectType: 'production' }),
    getProjects({ projectType: 'writing' }),
    getAllProjectCollections(),
  ])

  // Dynamic project routes
  const productionRoutes = (productions || [])?.map(
    (proj) =>
      ({
        url: `${BASE_URL}/portfolio/production/${proj?.slug?.current}`,
        lastModified: proj?._updatedAt || new Date(),
        changeFrequency: 'monthly',
      }) satisfies MetadataRoute.Sitemap[number],
  )

  const writingRoutes = (writing || [])?.map(
    (proj) =>
      ({
        url: `${BASE_URL}/portfolio/writing/${proj?.slug?.current}`,
        lastModified: proj?._updatedAt || new Date(),
        changeFrequency: 'monthly',
      }) satisfies MetadataRoute.Sitemap[number],
  )

  const collectionRoutes = (collections || [])?.map(
    (col) =>
      ({
        url: `${BASE_URL}/portfolio/collections/${col?.slug?.current}`,
        lastModified: col?._updatedAt || new Date(),
        changeFrequency: 'monthly',
      }) satisfies MetadataRoute.Sitemap[number],
  )

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/portfolio/production`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/portfolio/writing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    ...productionRoutes,
    ...writingRoutes,
    ...collectionRoutes,
  ]
}

export default sitemap
