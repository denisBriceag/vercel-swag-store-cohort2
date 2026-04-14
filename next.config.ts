import type { NextConfig } from "next"

import { CACHE_TAGS } from "@/constants/app-constants"

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  cacheLife: {
    [CACHE_TAGS.PAGES]: {
      stale: Number(process.env.PAGES_STALE) || 300,
      revalidate: Number(process.env.PAGES_REVALIDATE) || 3600,
      expire: Number(process.env.PAGES_EXPIRE) || 86400,
    },
    [CACHE_TAGS.PROMO]: {
      stale: Number(process.env.PROMO_STALE) || 300,
      revalidate: Number(process.env.PROMO_REVALIDATE) || 604800,
      expire: Number(process.env.PROMO_EXPIRE) || 2592000,
    },
    [CACHE_TAGS.PRODUCTS]: {
      stale: Number(process.env.PRODUCTS_STALE) || 300,
      revalidate: Number(process.env.PRODUCTS_REVALIDATE) || 3600,
      expire: Number(process.env.PRODUCTS_EXPIRE) || 86400,
    },
    [CACHE_TAGS.FEATURED_PRODUCTS]: {
      stale: Number(process.env.FEATURED_PRODUCTS_STALE) || 300,
      revalidate: Number(process.env.FEATURED_PRODUCTS_REVALIDATE) || 172800,
      expire: Number(process.env.FEATURED_PRODUCTS_EXPIRE) || 604800,
    },
    [CACHE_TAGS.APP_CONFIG]: {
      stale: Number(process.env.APP_CONFIG_STALE) || 300,
      revalidate: Number(process.env.APP_CONFIG_REVALIDATE) || 604800,
      expire: Number(process.env.APP_CONFIG_EXPIRE) || 2592000,
    },
    [CACHE_TAGS.CATEGORIES]: {
      stale: Number(process.env.CATEGORIES_STALE) || 300,
      revalidate: Number(process.env.CATEGORIES_REVALIDATE) || 3600,
      expire: Number(process.env.CATEGORIES_EXPIRE) || 86400,
    },
    [CACHE_TAGS.CART]: {
      stale: Number(process.env.CART_STALE) || 30,
      revalidate: Number(process.env.CART_REVALIDATE) || 60,
      expire: Number(process.env.CART_EXPIRE) || 3600,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              babel: true,
              titleProp: true,
              svgo: false,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
}

export default nextConfig
