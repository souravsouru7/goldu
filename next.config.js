/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.michelin.com',
      'www.bridgestone.com',
      'www.goodyear.com',
      'www.apollotyres.com',
      'images.unsplash.com',
      'i.imgur.com',
      'media3.giphy.com',
      'media4.giphy.com',
      'images.pexels.com',
      'placehold.co',
      'via.placeholder.com',
      'picsum.photos',
      'www.tyremarket.com',
      'localhost',
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig