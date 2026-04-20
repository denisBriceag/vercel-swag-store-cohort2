import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { productCacheTag, CACHE_TAGS } from "@/constants/app-constants"

import { isAuthorizedRevalidateRequest } from "@/lib/revalidate-auth"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAuthorizedRevalidateRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await params

  if (!slug || slug.trim().length === 0) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  try {
    revalidateTag(productCacheTag(slug), "max")
    revalidateTag(CACHE_TAGS.PRODUCTS, "max")

    return NextResponse.json({ revalidated: true, slug })
  } catch {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 })
  }
}
