import { ImageResponse } from "next/og"

import { getAppConfig } from "@/lib/data/app-configuration.api"
import { ogTheme } from "@/styles/og-theme"

import { join } from "node:path"
import { readFile } from "node:fs/promises"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Vercel Swag Store"

export default async function OpenGraphImage() {
  const res = await getAppConfig()

  const storeName = res.success ? res.data.storeName : "SwagStore"

  const [fontFile, heroImageFile] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "./public/hero-image.jpg")),
  ])

  const font = Uint8Array.from(fontFile).buffer
  const heroImageSrc = `data:image/jpeg;base64,${heroImageFile.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: ogTheme.background,
        position: "relative",
      }}
    >
      <img
        src={heroImageSrc}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to right, rgba(28,28,34,0.85) 50%, rgba(28,28,34,0.2))",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "Geist",
            fontSize: 22,
            fontWeight: 600,
            color: ogTheme.mutedForeground,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          {storeName}
        </p>

        <h1
          style={{
            fontFamily: "Geist",
            fontSize: 68,
            fontWeight: 600,
            color: ogTheme.foreground,
            lineHeight: 1.1,
            maxWidth: 820,
            margin: 0,
          }}
        >
          Wear the framework you ship with.
        </h1>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Geist", data: font, weight: 600, style: "normal" }],
    }
  )
}
