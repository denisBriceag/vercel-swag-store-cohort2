// "use client"
//
// import { useTransition } from "react"
// import { Button } from "@/components/ui/button"
// import { Loader2, Trash2 } from "lucide-react"
// import { removeFromCartAction } from "@/lib/actions/cart-actions"
// import { toast } from "sonner"
// import { CartItemWithProduct } from "@/types/cart/cart-item-product"
//
// type CartItemRemoveFormType = {
//   productId: CartItemWithProduct["productId"]
//   name: CartItemWithProduct["product"]["name"]
// }
//
// export default function CartItemRemoveForm({
//   productId,
//   name,
// }: CartItemRemoveFormType) {
//   const [isPending, startTransition] = useTransition()
//
//   function handleRemove() {
//     startTransition(async () => {
//       const result = await removeFromCartAction(productId)
//
//       if (result.sessionExpired) {
//         toast.warning("Your cart session has expired.")
//       }
//     })
//   }
//
//   return (
//     <form>
//       <input type="hidden" name="productId" value={productId} />
//
//       <Button
//         type="submit"
//         variant="ghost"
//         size="icon"
//         className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
//         aria-label={`Remove ${name}`}
//         disabled={isPending}
//       >
//         {isPending ? (
//           <Loader2 className="size-3.5 animate-spin" />
//         ) : (
//           <Trash2 className="size-3.5" />
//         )}
//       </Button>
//     </form>
//   )
// }
