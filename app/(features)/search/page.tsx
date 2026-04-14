import { Suspense } from "react"
import { Metadata } from "next"

import { nanoid } from "nanoid"

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

  return {
    title,
    openGraph: {
      title,
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

      <Suspense key={nanoid()} fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  )
}
