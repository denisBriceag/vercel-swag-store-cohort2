import { getCategories } from "@/lib/api/category.api"

import SearchToolbar from "../components/search-toolbar"

import { buildSearchQuery } from "../utils/build-search-query"
import { SearchPageProps } from "../types/search-params-props"

export default async function SearchToolbarLoader({
  searchParams,
}: SearchPageProps) {
  const [params, categories] = await Promise.all([
    searchParams,
    getCategories(),
  ])

  const query = buildSearchQuery(params)

  return <SearchToolbar categories={categories.data} initialQuery={query} />
}
