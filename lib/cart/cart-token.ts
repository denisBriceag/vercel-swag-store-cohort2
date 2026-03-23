import { cookies } from "next/headers"

const CART_TOKEN_COOKIE = "cart-token"

/**
 * @description Keep cart token inside http cookies for 1 week
 * */
const CART_TOKEN_MAX_AGE = 60 * 60 * 24 * 7

export async function getCartToken(): Promise<string | undefined> {
  const cookieStore = await cookies()

  return cookieStore.get(CART_TOKEN_COOKIE)?.value
}

export async function clearCartToken(): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.delete(CART_TOKEN_COOKIE)
}

export async function setCartToken(token: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(CART_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_TOKEN_MAX_AGE,
  })
}
