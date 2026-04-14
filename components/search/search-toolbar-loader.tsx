import { getCategories } from "@/lib/data/category.api"

import SearchToolbar from "./search-toolbar"

import { SearchPageProps } from "@/types/search/search-params-props"
import { buildSearchQuery } from "@/utils/search/build-search-query"

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
