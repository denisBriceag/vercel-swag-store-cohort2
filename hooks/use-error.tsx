import { startTransition } from "react"

import { useRouter } from "next/navigation"

export default function useError(resetCb: () => void): () => void {
  const router = useRouter()

  function reload(): void {
    startTransition(() => {
      router.refresh()

      resetCb()
    })
  }

  return reload
}
