/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.pexels.com', 'i.pinimg.com'],
  },
}
module.exports = nextConfig
