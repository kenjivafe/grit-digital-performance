/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/utils"],
  images: {
    domains: ['localhost', 'admin-grit-digital-performance.vercel.app'],
  },
}

module.exports = nextConfig
