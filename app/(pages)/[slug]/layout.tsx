export default function PageLayout({ children }: LayoutProps<"/[slug]">) {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col justify-center">
      {children}
    </div>
  )
}
