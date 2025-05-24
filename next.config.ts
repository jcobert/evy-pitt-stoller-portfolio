import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_BASE_URL:
      process.env.NEXT_PUBLIC_SITE_BASE_URL ??
      `https://${process.env.VERCEL_URL}`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
