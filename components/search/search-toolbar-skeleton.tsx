export default function SearchToolbarSkeleton() {
  return (
    <div className="p-6">
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-end">
        <div className="flex w-fit items-center gap-2">
          <div className="size-4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-9 w-full animate-pulse rounded-md bg-muted md:max-w-56" />

        <div className="flex w-full items-center gap-3 md:w-fit">
          <div className="h-9 w-full animate-pulse rounded-4xl bg-muted md:min-w-96" />
          <div className="size-9 shrink-0 animate-pulse rounded-4xl bg-muted" />
        </div>
      </div>
    </div>
  )
}
