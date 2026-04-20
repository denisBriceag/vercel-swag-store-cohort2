import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { CACHE_TAGS } from "@/constants/app-constants"

import { isAuthorizedRevalidateRequest } from "@/lib/revalidate-auth"

export async function POST(req: NextRequest) {
  if (!isAuthorizedRevalidateRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    revalidateTag(CACHE_TAGS.PRODUCTS, "max")
    revalidateTag(CACHE_TAGS.FEATURED_PRODUCTS, "max")

    return NextResponse.json({
      revalidated: true,
      tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.FEATURED_PRODUCTS],
    })
  } catch {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 })
  }
}
