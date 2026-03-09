/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/scripture-journey',
  images: { unoptimized: true },
}

module.exports = nextConfig;
