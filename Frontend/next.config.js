/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['bayut-production.s3.eu-central-1.amazonaws.com', 'raw.githubusercontent.com', 'img.freepik.com', 'lh3.googleusercontent.com'],
    

  },
}

module.exports = nextConfig
