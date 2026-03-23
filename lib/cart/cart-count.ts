import { cookies } from "next/headers"

const CART_COUNT_COOKIE = "cart-count"
const CART_COUNT_MAX_AGE = 60 * 60 * 24 * 7

export async function getCartCount(): Promise<number> {
  const cookieStore = await cookies()

  return Number(cookieStore.get(CART_COUNT_COOKIE)?.value ?? 0)
}

export async function setCartCount(count: number): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(CART_COUNT_COOKIE, String(count), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_COUNT_MAX_AGE,
  })
}

export async function clearCartCount(): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(CART_COUNT_COOKIE)
}
