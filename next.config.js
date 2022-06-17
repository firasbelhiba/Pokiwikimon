/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'www.pngall.com',
      'www.pokepedia.fr',
      'res.cloudinary.com',
    ],
  },
}
const withCSS = require('@zeit/next-css')
module.exports = withCSS()

module.exports = nextConfig
