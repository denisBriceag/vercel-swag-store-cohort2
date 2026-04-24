import { Suspense } from "react"
import { Metadata } from "next"

import { SearchPageProps } from "@/types/search/search-params-props"

import SearchToolbarLoader from "@/components/search/search-toolbar-loader"
import SearchToolbarSkeleton from "@/components/search/search-toolbar-skeleton"
import SearchResultsSkeleton from "@/components/search/search-results-skeleton"
import SearchResults from "@/components/search/search-results"

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { search } = await searchParams
  const title = search ? `Search results for "${search}"` : "Search"

  const description = search
    ? `Showing results for "${search}". Browse matching products in our swag store.`
    : "Browse and filter our full catalog of swag. Search by name, category, or featured products to find exactly what you're looking for."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: search ? `/search?search=${encodeURIComponent(search)}` : "/search",
    },
    ...(search && { robots: { index: false } }),
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <>
      <Suspense fallback={<SearchToolbarSkeleton />}>
        <SearchToolbarLoader searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  )
}
