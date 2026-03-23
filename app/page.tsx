import { Metadata } from "next"

import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    url: "/",
  },
}

export default function MainPage() {
  return (
    <main>
      <Hero />

      <FeaturedProducts />
    </main>
  )
}
