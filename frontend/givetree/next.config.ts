import type { NextConfig } from 'next';

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  disableDevLogs: true,
});

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'givetree-bucket.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ['givetree.co.kr', 'localhost:3000'],
    },
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
    ];
  },
};

export default withVanillaExtract(withPWA({ nextConfig }) as NextConfig);
