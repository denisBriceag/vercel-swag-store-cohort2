import { MetadataRoute } from "next"

import { getProducts } from "@/lib/data/products.api"
import { STATIC_PAGES } from "@/constants/app-constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""

  const res = await getProducts()

  const productEntries: MetadataRoute.Sitemap = res.success
    ? res.data.map((product) => ({
        url: `${appUrl}/products/${product.slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    : []

  const staticPageEntries: MetadataRoute.Sitemap = Object.keys(STATIC_PAGES).map(
    (slug) => ({
      url: `${appUrl}/${slug}`,
      changeFrequency: "monthly",
      priority: ["privacy", "terms"].includes(slug) ? 0.3 : 0.5,
    })
  )

  return [
    { url: appUrl, changeFrequency: "daily", priority: 1 },
    ...staticPageEntries,
    ...productEntries,
  ]
}
