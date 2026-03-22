import { getCategories } from "@/lib/api/category.api"

import SearchToolbar from "../components/search-toolbar"

import { buildSearchQuery } from "../utils/build-search-query"

type SearchToolbarLoaderProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function SearchToolbarLoader({
  searchParams,
}: SearchToolbarLoaderProps) {
  const [params, categories] = await Promise.all([
    searchParams,
    getCategories(),
  ])

  const query = buildSearchQuery(params)

  return <SearchToolbar categories={categories.data} initialQuery={query} />
}
