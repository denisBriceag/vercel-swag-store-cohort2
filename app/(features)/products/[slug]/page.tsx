import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { Package } from "lucide-react"

import { getProductById } from "@/lib/api/products.api"

import { ApiHttpError } from "@/types/server-error"
import { ERROR_CODE } from "@/types/error-code"

import { pricePipe } from "@/utils/price"

import ProductStockSkeleton from "./components/product-stock-skeleton"
import ProductStock from "./components/product-stock"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  const res = await getProductById(slug)

  if (!res.success) return {}

  const { name, description, images } = res.data

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      url: `/products/${slug}`,
      type: "website",
      ...(images[0] && {
        images: [{ url: images[0], alt: name }],
      }),
    },
  }
}

async function ProductPageContent({
  params,
}: ProductPageProps) {
  const { slug } = await params

  let product

  try {
    const response = await getProductById(slug)
    product = response.data
  } catch (error) {
    if (
      error instanceof ApiHttpError &&
      error.serverError.code === ERROR_CODE.NOT_FOUND
    ) {
      notFound()
    }

    throw error
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="size-16 text-muted-foreground/30" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold text-foreground tabular-nums">
              {pricePipe(product.price)}
            </p>
          </div>

          <Suspense fallback={<ProductStockSkeleton />}>
            <ProductStock productId={product.id} />
          </Suspense>

          <p className="text-sm leading-7 text-muted-foreground">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense>
      <ProductPageContent params={params} />
    </Suspense>
  )
}
