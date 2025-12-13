import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: './',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  transpilePackages: ['@repo/shared'],
};

export default nextConfig;
