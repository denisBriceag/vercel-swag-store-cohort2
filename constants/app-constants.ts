export const CACHE_TAGS = {
  PAGES: "pages",
  PROMO: "promo",
  PRODUCTS: "products",
  FEATURED_PRODUCTS: "featured-products",
  APP_CONFIG: "app-config",
  CATEGORIES: "categories",
} as const

export function productCacheTag(slug: string) {
  return `product-${slug}`
}
