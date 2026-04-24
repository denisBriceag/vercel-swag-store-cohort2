export default function CartLayout({ children }: LayoutProps<"/cart">) {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col">
      {children}
    </div>
  )
}
