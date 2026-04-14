export const STATIC_PAGES = {
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  privacy: "Privacy",
  terms: "Terms",
  "shipping-returns": "Shipping & Returns",
} as const

export const CACHE_TAGS = {
  PAGES: "pages",
  PROMO: "promo",
  PRODUCTS: "products",
  FEATURED_PRODUCTS: "featured-products",
  APP_CONFIG: "app-config",
  CATEGORIES: "categories",
  CART: "cart",
} as const

export function productCacheTag(slug: string) {
  return `product-${slug}`
}

export function cartCacheTag(token: string) {
  return `cart-${token}`
}
