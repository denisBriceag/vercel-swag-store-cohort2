import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
}

export default nextConfig
