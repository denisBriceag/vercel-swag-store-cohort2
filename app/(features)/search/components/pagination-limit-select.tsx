"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buildUpdatedSearchParams } from "@/app/(features)/search/utils/build-updated-search-params"
import {
  DEFAULT_PAGE,
  PAGE_SIZE_OPTIONS,
} from "@/app/(features)/search/constants/constants"

type PaginationLimitSelectProps = {
  currentLimit: number
}

export default function PaginationLimitSelect({
  currentLimit,
}: PaginationLimitSelectProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleLimitChange(value: string) {
    const params = buildUpdatedSearchParams(searchParams, {
      page: DEFAULT_PAGE,
      limit: Number(value),
    })

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={String(currentLimit)} onValueChange={handleLimitChange}>
      <SelectTrigger
        className="w-20"
        id="select-page-size"
        aria-label="Rows per page"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
