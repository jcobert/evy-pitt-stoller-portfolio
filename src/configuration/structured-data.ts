import { Person, WebSite, WithContext } from 'schema-dts'

import { canonicalUrl, siteConfig } from '@/configuration/site'

export const personJsonLd = () =>
  ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': canonicalUrl('#evy-pitt-stoller'),
    name: 'Evy Pitt-Stoller',
    familyName: 'Pitt-Stoller',
    givenName: 'Evy',
    alternateName: 'Evelyn Pitt-Stoller',
    /** @todo add social links. */
    sameAs: [''],
  }) satisfies WithContext<Person>

export const websiteJsonLd = () => {
  const website: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteConfig?.url,
    name: siteConfig?.title,
    url: siteConfig?.url,
    publisher: personJsonLd(),
  }

  return website
}
