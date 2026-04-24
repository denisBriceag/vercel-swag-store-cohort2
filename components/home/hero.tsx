import Link from "next/link"
import Image from "next/image"

import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative mt-(--header-height) min-h-125 overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Wear the framework you ship with."
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/70 to-background/10 md:from-background/85 md:via-background/55 md:to-transparent" />

      <div className="absolute inset-y-0 left-0 w-full backdrop-blur-[2px] md:w-2/3" />

      <div className="relative z-1 mx-auto flex min-h-125 w-full max-w-7xl items-center px-8 py-12 md:px-12 lg:px-16">
        <div className="max-w-130">
          <h1 className="text-4xl leading-none font-black text-foreground sm:text-5xl">
            Wear the framework you ship with.
          </h1>

          <p className="mt-5 max-w-90 text-sm leading-7 text-muted-foreground sm:text-base">
            Premium swag for developers who build with Vercel. From tees to tech
            gear, represent the tools you love.
          </p>

          <Link
            href="/search"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 dark:bg-primary-foreground"
          >
            Browse All Products
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
