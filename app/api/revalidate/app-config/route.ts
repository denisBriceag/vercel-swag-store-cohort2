import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { CACHE_TAGS } from "@/constants/app-constants"

export async function POST() {
  revalidateTag(CACHE_TAGS.APP_CONFIG, "max")

  return NextResponse.json({ revalidated: true, tags: [CACHE_TAGS.APP_CONFIG] })
}
