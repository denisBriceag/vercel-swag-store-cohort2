import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { Package } from "lucide-react"

import { getProductDetails, getProducts } from "@/lib/data/products.api"

import { ApiHttpError } from "@/types/server-error"
import { ERROR_CODE } from "@/types/error-code"

import { pricePipe } from "@/utils/price"

import ProductStock from "@/components/products/product-stock"
import ProductStockSkeleton from "@/components/products/product-stock-skeleton"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const response = await getProducts()

  if (!response.success) return []

  return response.data.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  const res = await getProductDetails(slug)

  if (!res.success)
    return {
      title: "Product not found",
      description: "The requested product could not be found",
    }

  const { name, description, images, tags } = res.data

  return {
    title: name,
    description,
    keywords: [name, ...tags],
    openGraph: {
      title: name,
      description,
      url: `/products/${slug}`,
      type: "website",
      ...(images[0] && {
        images: [{ url: images[0], alt: name }],
      }),
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/products/${slug}`
        : "",
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  let product

  try {
    const response = await getProductDetails(slug)
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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""
  const productUrl = `${appUrl}/products/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    category: product.category,
    url: productUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      url: productUrl,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <article className="text-sm leading-7 text-muted-foreground">
              {product.description}
            </article>

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
    </>
  )
}
