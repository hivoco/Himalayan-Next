import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qcbucket-971565583415-ap-south-1.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
