import { NextResponse } from "next/server"

import { checkHealth } from "@/lib/data/app-health.api"

export async function GET() {
  try {
    await checkHealth()

    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() })
  } catch {
    return NextResponse.json({ status: "error" }, { status: 503 })
  }
}
