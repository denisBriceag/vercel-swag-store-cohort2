import { Suspense } from "react"
import { Metadata } from "next"

import { SearchPageProps } from "@/types/search/search-params-props"

import SearchToolbarLoader from "@/components/products/search/search-toolbar-loader"
import SearchToolbarSkeleton from "@/components/products/search/search-toolbar-skeleton"
import SearchResultsSkeleton from "@/components/products/search/search-results-skeleton"
import SearchResults from "@/components/products/search/search-results"

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { search } = await searchParams
  const title = search ? `Search results for "${search}"` : "Search"

  return {
    title,
    openGraph: {
      title,
      url: search ? `/search?search=${encodeURIComponent(search)}` : "/search",
    },
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
