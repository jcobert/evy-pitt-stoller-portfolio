import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_BASE_URL:
      process.env.NEXT_PUBLIC_SITE_BASE_URL ??
      `https://${process.env.VERCEL_URL}`,
  },
}

export default nextConfig
