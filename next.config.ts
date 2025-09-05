/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  
  // Performance optimizations
  compress: true,
  
  // Webpack optimizations for bundle size
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Enable gzip compression for static assets
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    
    // Optimize JSON imports
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
