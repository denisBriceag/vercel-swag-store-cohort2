import * as React from "react"
import Link from "next/link"

import { cn } from "@/utils/utils"

interface EmptyStateProps {
  title: string
  description?: string
  errorCode?: string | number
  actionHref?: string
  actionLabel?: string
  className?: string
  children?: React.ReactNode
}

export default function EmptyState({
  title,
  description,
  errorCode,
  actionHref,
  actionLabel,
  className,
  children,
}: EmptyStateProps) {
  return (
    <section
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-6 text-center",
        className
      )}
    >
      {children && (
        <div className="flex items-center justify-center">{children}</div>
      )}

      <div className="flex flex-col items-center gap-1.5">
        {errorCode && (
          <span className="text-sm font-medium text-muted-foreground tabular-nums">
            Error {errorCode}
          </span>
        )}

        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-1 rounded-4xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          {actionLabel}
        </Link>
      )}
    </section>
  )
}
