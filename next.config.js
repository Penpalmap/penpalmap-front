/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false, // Désactive l'en-tête "X-Powered-By" de Next.js pour des raisons de sécurité.
    output: 'standalone',
}

module.exports = nextConfig
