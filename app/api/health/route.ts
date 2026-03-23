import { NextResponse } from "next/server"

import { checkHealth } from "@/lib/api/app-health.api"

export async function GET() {
  try {
    const { data } = await checkHealth()

    return NextResponse.json(data)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Health check failed"

    return NextResponse.json({ status: "error", message }, { status: 503 })
  }
}
