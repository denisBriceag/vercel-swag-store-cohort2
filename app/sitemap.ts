import { MetadataRoute } from "next"

import { getProducts } from "@/lib/data/products.api"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""

  const res = await getProducts()

  const productEntries: MetadataRoute.Sitemap = res.success
    ? res.data.map((product) => ({
        url: `${appUrl}/products/${product.slug}`,
      }))
    : []

  return [{ url: appUrl }, { url: `${appUrl}/search` }, ...productEntries]
}
