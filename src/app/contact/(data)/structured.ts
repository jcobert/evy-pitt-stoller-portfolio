import { contactPageMeta } from './meta'
import { WebPage, WithContext } from 'schema-dts'

import { websiteJsonLd } from '@/configuration/structured-data'

export const contactPageJsonLd = async (
  ...params: Parameters<typeof contactPageMeta>
) => {
  const website = await websiteJsonLd()
  const meta = contactPageMeta(...params)

  const url = meta?.openGraph?.url as string

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': url,
    name: meta?.title as string,
    description: meta?.description as string,
    url,
    isPartOf: website,
  } satisfies WithContext<WebPage>

  return webPage
}
