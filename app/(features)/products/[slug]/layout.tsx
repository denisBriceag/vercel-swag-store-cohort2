export default function ProductLayout({
  children,
}: LayoutProps<"/products/[slug]">) {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col justify-center">
      {children}
    </div>
  )
}
