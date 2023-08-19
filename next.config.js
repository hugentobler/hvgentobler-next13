/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  images: {
    domains: ['images.unsplash.com']
  }
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
