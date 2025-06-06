import { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'Evy Pitt-Stoller',
    short_name: 'Evy',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#874b57',
    background_color: '#fcf9f7',
    display: 'standalone',
  }
}

export default manifest
