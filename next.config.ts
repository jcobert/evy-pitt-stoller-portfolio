import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_BASE_URL:
      process.env.NEXT_PUBLIC_SITE_BASE_URL ??
      `https://${process.env.VERCEL_URL}`,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
  },
}

export default nextConfig
