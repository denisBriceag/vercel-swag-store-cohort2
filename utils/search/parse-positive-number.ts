export function parsePositiveNumber(
  value: string | number | undefined,
  fallback: number
): number {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }

  return parsed
}
