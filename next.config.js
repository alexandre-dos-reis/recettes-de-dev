/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: process.env.NEXT_IMAGE_URL,
      port: '',
    }]
  },
  experimental: {
    appDir: true,
    typedRoutes: false
  },
}

module.exports = nextConfig
