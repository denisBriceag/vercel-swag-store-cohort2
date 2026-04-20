/*
 * @description We use this component for deployment preview only.
 */
export default function PreviewBanner() {
  if (process.env.VERCEL_ENV !== "preview") return null

  const branch = process.env.VERCEL_GIT_COMMIT_REF ?? "unknown branch"

  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-amber-400 py-1.5 text-center text-xs font-medium text-amber-950">
      Preview deployment &mdash; branch:{" "}
      <span className="font-semibold">{branch}</span>
    </div>
  )
}
