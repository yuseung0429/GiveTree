import type { NextConfig } from 'next';

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.*',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        'givetree.co.kr',
        'localhost:3000',
        '192.168.100.77:8080',
        '192.168.100.80:3000',
      ],
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

export default withVanillaExtract(nextConfig);
