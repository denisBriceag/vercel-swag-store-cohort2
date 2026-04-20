"use server"

import { updateTag } from "next/cache"

import {
  addToCart,
  createCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/data/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"
import {
  AddToCartSchema,
  CartItemIdSchema,
  UpdateCartItemSchema,
} from "@/lib/validations/cart"

import { BaseResponse } from "@/types/response"
import { ApiHttpError } from "@/types/server-error"

import { cartCacheTag } from "@/constants/app-constants"

/**
 * All the cart server actions are specifically designed to handle the action failure because of invalid cart token stored inside server cookies.
 *
 * We use updateTag strategy rathen than React context api here. The visible trade-off - we don't have optimistic UI, and we are totally dependent on api speed
 * */

type ActionType = BaseResponse & { error?: string; sessionExpired?: boolean }

/**
 * @description 1. Gets cart token form server cookies.
 * 2. For the defensive reasons, if token doesn't exist - silently creates a new cart
 * 3. Performs http call for adding the product to the cart.
 * 4. Updates the cart tag to revalidate cache. This ensures that all the components that are using {@link getCachedCart} will be up to date
 *
 * If error occurs we need to identify which type od error has occurred.
 *
 * 1. We need to handle 404 error which signalizes us about expired or not-found cart token.
 * In this case we clear the cart as it's expired, silently create a new one and adding the product to the newly created cart.
 * After that we need to update the cache tag to immediately reflet the state of the cart counter inside header.
 *
 * 2. We handle any other errors with a generic error message.
 * */
export async function addToCartAction(
  productId: string,
  quantity: number
): Promise<ActionType> {
  const validation = AddToCartSchema.safeParse({ productId, quantity })

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Invalid input",
    }
  }

  try {
    const token = await getCartToken()

    if (!token) {
      await createCart()
    }

    await addToCart(productId, quantity)

    const currentToken = await getCartToken()

    if (currentToken) updateTag(cartCacheTag(currentToken))

    return { success: true }
  } catch (error) {
    if (error instanceof ApiHttpError && error.status === 404) {
      try {
        await clearCart()
        await createCart()
        await addToCart(productId, quantity)

        const newToken = await getCartToken()
        if (newToken) updateTag(cartCacheTag(newToken))

        return { success: true, sessionExpired: true }
      } catch {
        return { success: false, error: "Failed to restore cart." }
      }
    }

    return { success: false, error: "Failed to add item to cart." }
  }
}

/**
 * @description We are trying to update the quantity of the specific cart item.
 * If it fails with the status 404 we clear the cart as we know that the cart session has expired
 * If the update fails for any other reasons - return generic error response.
 * */
export async function updateQuantityAction(
  productId: string,
  quantity: number
): Promise<ActionType> {
  const validation = UpdateCartItemSchema.safeParse({ productId, quantity })

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Invalid input",
    }
  }

  try {
    await updateQuantity(productId, quantity)

    const token = await getCartToken()

    if (token) updateTag(cartCacheTag(token))

    return { success: true }
  } catch (error) {
    if (error instanceof ApiHttpError && error.status === 404) {
      await clearCart()

      return { success: false, sessionExpired: true }
    }

    return { success: false, error: "Failed to update quantity." }
  }
}

/**
 * @description We are trying to remove a specific cart item for the cart within a cart session.
 * If it fails with the status 404 we clear the cart as we know that the cart session has expired
 * If the update fails for any other reasons - return generic error response.
 * */
export async function removeFromCartAction(
  productId: string
): Promise<ActionType> {
  const validation = CartItemIdSchema.safeParse(productId)

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message ?? "Invalid input",
    }
  }

  try {
    await removeFromCart(productId)

    const token = await getCartToken()

    if (token) updateTag(cartCacheTag(token))

    return { success: true }
  } catch (error) {
    if (error instanceof ApiHttpError && error.status === 404) {
      await clearCart()

      return { success: false, sessionExpired: true }
    }

    return { success: false, error: "Failed to remove item." }
  }
}
