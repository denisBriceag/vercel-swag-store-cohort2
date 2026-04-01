import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { productCacheTag, CACHE_TAGS } from "@/constants/app-constants"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  revalidateTag(productCacheTag(slug), "max")
  revalidateTag(CACHE_TAGS.PRODUCTS, CACHE_TAGS.PRODUCTS)

  return NextResponse.json({ revalidated: true, slug })
}
