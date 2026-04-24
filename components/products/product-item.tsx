import Image from "next/image"
import Link from "next/link"
import { pricePipe } from "@/utils/price"
import { Product } from "@/types/products/product"

type ProductPreviewProps = Pick<
  Product,
  "name" | "images" | "price" | "slug"
> & { index: number }

export default function ProductItem({
  slug,
  images,
  name,
  price,
  index,
}: ProductPreviewProps) {
  const formattedPrice = pricePipe(price)

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={name}
              preload={index < 6}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/40"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-foreground">
              {name}
            </span>

            <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
