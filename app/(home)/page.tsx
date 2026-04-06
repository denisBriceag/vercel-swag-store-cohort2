import { Metadata } from "next"

import Hero from "@/components/home/hero"

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

export default function HomePage() {
  return <Hero />
}
