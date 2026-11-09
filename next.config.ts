/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,

  // External image domains configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Performance optimizations
  compress: true,

  // Enable stable optimizations
  poweredByHeader: false,

  // The old About page became the Resume page.
  async redirects() {
    return [{ source: '/about', destination: '/resume', permanent: true }];
  },

  // Next.js 16: Turbopack is now the default bundler
  // Enable filesystem caching for faster compile times
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

module.exports = nextConfig;
