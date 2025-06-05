import { Person, WebSite, WithContext } from 'schema-dts'

import { getContactLinksArray } from '@/components/general/contact-links'

import { canonicalUrl, siteConfig } from '@/configuration/site'
import { getProfile } from '@/sanity/lib/fetch'

export const personJsonLd = async () => {
  const { contactInfo } = (await getProfile()) || {}

  const links = contactInfo
    ? getContactLinksArray(contactInfo, { exclude: ['email', 'phone'] })?.map(
        ([, { url }]) => url,
      )
    : []

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': canonicalUrl('#evy-pitt-stoller'),
    name: 'Evy Pitt-Stoller',
    familyName: 'Pitt-Stoller',
    givenName: 'Evy',
    alternateName: 'Evelyn Pitt-Stoller',
    sameAs: links,
  } satisfies WithContext<Person>
}

export const websiteJsonLd = async () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteConfig?.url,
    name: siteConfig?.title,
    url: siteConfig?.url,
    publisher: await personJsonLd(),
  } satisfies WithContext<WebSite>
}
