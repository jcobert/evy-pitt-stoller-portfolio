import { portfolioPageMeta } from './meta'
import { WebPage, WithContext } from 'schema-dts'

import { websiteJsonLd } from '@/configuration/structured-data'

export const portfolioPageJsonLd = async (
  ...params: Parameters<typeof portfolioPageMeta>
) => {
  const website = await websiteJsonLd()
  const meta = portfolioPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  } satisfies WithContext<WebPage>

  return webPage
}
