import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yipxoh5esvgq5lcw.public.blob.vercel-storage.com'
      }
    ]
  }
};

export default nextConfig;
