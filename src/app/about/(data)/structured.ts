import { aboutPageMeta } from './meta'
import { WebPage, WithContext } from 'schema-dts'

import { websiteJsonLd } from '@/configuration/structured-data'

export const aboutPageJsonLd = async (
  ...params: Parameters<typeof aboutPageMeta>
) => {
  const website = await websiteJsonLd()
  const meta = aboutPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  } satisfies WithContext<WebPage>

  return webPage
}
