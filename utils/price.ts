/**
 * @description Price pipe. Converts cents to a dollar price
 *
 * @example 2800 -> $28
 * */
export function pricePipe(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}
