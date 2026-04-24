import { Metadata } from "next"
import { Geist } from "next/font/google"

import "../styles/globals.css"

import Header from "@/components/header/header"
import Footer from "@/components/home/footer"
import PreviewBanner from "@/components/preview-banner"
import { Toaster } from "@/components/ui/sonner"

import { getAppConfig } from "@/lib/data/app-configuration.api"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const fontSans = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  adjustFontFallback: true,
})

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const metadataBase = appUrl ? new URL(appUrl) : undefined

  let res: Awaited<ReturnType<typeof getAppConfig>>

  try {
    res = await getAppConfig()
  } catch {
    return { metadataBase }
  }

  if (!res.success) return { metadataBase }

  const { seo } = res.data

  return {
    metadataBase,
    title: {
      default: seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.defaultDescription,
    openGraph: {
      type: "website",
      siteName: seo.defaultTitle,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      url: appUrl,
      locale: "en_US",
    },
    twitter: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontSans.variable} antialiased`}>
      <body>
        <PreviewBanner />
        <Header />

        <main className="mt-(--header-height) min-h-screen">{children}</main>

        <Footer />

        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
