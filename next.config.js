/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce logging verbosity
  logging: {
    fetches: {
      fullUrl: false
    }
  },
  // Suppress some development warnings
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.stats = 'errors-only';
    }
    return config;
  }
};

module.exports = nextConfig; 