/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_URL],
  },
  experimental: {
    appDir: true,
    typedRoutes: false
  },
}

module.exports = nextConfig
