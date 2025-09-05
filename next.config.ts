/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  
  // External image domains configuration
  images: {
    domains: [
      'raw.githubusercontent.com', // For project screenshots hosted on GitHub
    ],
  },
  
  // Performance optimizations
  compress: true,
  
  // Webpack optimizations for bundle size
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Only add JSON chunk splitting without conflicting optimizations
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Split large JSON data into separate chunks
          jsonData: {
            test: /\.json$/,
            chunks: 'all',
            name: 'json-data',
            priority: 10,
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Enable stable optimizations
  poweredByHeader: false,
};

module.exports = nextConfig;
