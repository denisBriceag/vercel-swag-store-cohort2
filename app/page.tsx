import { Metadata } from "next"

import { Suspense } from "react"

import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"

import FeaturedProductsSkeleton from "@/components/home/featured-products-skeleton"

export const metadata: Metadata = {
  description:
    "Wear the framework you ship with. Browse our featured products and find your next favorite piece of Vercel swag.",
  openGraph: {
    type: "website",
    url: "/",
    description:
      "Wear the framework you ship with. Browse our featured products and find your next favorite piece of Vercel swag.",
  },
}

export default function MainPage() {
  return (
    <main>
      <Hero />

      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  )
}
