import { Metadata } from "next"
import { Geist } from "next/font/google"

import "../styles/globals.css"

import Header from "@/components/header/header"
import Footer from "@/components/home/footer"
import { Toaster } from "@/components/ui/sonner"

import { getAppConfig } from "@/lib/data/app-configuration.api"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const fontSans = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export async function generateMetadata(): Promise<Metadata> {
  const res = await getAppConfig()

  if (!res.success) return {}

  const { seo } = res.data
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  return {
    metadataBase: appUrl ? new URL(appUrl) : undefined,
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
