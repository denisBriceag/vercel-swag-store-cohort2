import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"

import { ProductSearchQuery } from "@/types/products/product-search-query"
import { Pagination as PaginationMeta } from "@/types/pagination"

import { DEFAULT_LIMIT } from "../constants/constants"
import PaginationLimitSelect from "./pagination-limit-select"

type SearchPaginationProps = {
  query: ProductSearchQuery
  pagination: PaginationMeta
}

function buildPageUrl(query: ProductSearchQuery, page: number): string {
  const params = new URLSearchParams()

  if (query.search) params.set("search", query.search)
  if (query.category) params.set("category", query.category)
  if (query.featured) params.set("featured", "true")
  if (query.limit && query.limit !== DEFAULT_LIMIT)
    params.set("limit", String(query.limit))

  params.set("page", String(page))

  return `/search?${params.toString()}`
}

function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | "ellipsis")[] = [1]

  if (currentPage > 3) pages.push("ellipsis")

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (currentPage < totalPages - 2) pages.push("ellipsis")

  pages.push(totalPages)

  return pages
}

export default function SearchPagination({
  query,
  pagination,
}: SearchPaginationProps) {
  const { page, totalPages, hasPreviousPage, hasNextPage } = pagination
  const currentLimit = query.limit ?? DEFAULT_LIMIT

  if (totalPages <= 1 && totalPages !== 0) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Label htmlFor="select-page-size">Rows per page</Label>
        <PaginationLimitSelect currentLimit={currentLimit} />
      </div>

      {totalPages > 1 && (
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={hasPreviousPage ? buildPageUrl(query, page - 1) : "#"}
                aria-disabled={!hasPreviousPage}
                className={
                  !hasPreviousPage
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>

            {pages.map((p, i) =>
              p === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href={buildPageUrl(query, p)}
                    isActive={p === page}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={hasNextPage ? buildPageUrl(query, page + 1) : "#"}
                aria-disabled={!hasNextPage}
                className={
                  !hasNextPage ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
