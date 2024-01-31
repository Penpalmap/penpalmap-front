// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Désactive l'en-tête "X-Powered-By" de Next.js pour des raisons de sécurité.
  output: 'standalone',
  i18n,
}

module.exports = nextConfig
