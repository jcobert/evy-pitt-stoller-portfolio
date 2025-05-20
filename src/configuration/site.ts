export const siteConfig = {
  title: 'Evy Pitt Stoller',
  description: '',
  url: process.env.NEXT_PUBLIC_SITE_BASE_URL || '',
} as const

/** Appends the provided pathname to the site's base URL. */
export const canonicalUrl = (path?: string) =>
  path ? `${siteConfig?.url}${path}` : siteConfig?.url
