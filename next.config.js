// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Disable "X-Powered-By" header from de Next.js for security.
  output: 'standalone',
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.MINIO_HOST ?? 'localhost',
        port: process.env.MINIO_PORT ?? '9000',
        pathname: '/map/**',
      },
      {
        protocol: 'https',
        hostname: process.env.MINIO_HOST ?? 'localhost',
        port: process.env.MINIO_PORT ?? '9000',
        pathname: '/profils/**',
      },
    ],
  },
}

module.exports = nextConfig
