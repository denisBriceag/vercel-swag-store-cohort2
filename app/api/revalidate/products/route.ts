import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { CACHE_TAGS } from "@/constants/app-constants"

export async function POST() {
  revalidateTag(CACHE_TAGS.PRODUCTS, CACHE_TAGS.PRODUCTS)
  revalidateTag(CACHE_TAGS.FEATURED_PRODUCTS, CACHE_TAGS.FEATURED_PRODUCTS)

  return NextResponse.json({
    revalidated: true,
    tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.FEATURED_PRODUCTS],
  })
}
