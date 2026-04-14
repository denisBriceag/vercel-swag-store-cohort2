export default function HomeLayout({ children, featured }: LayoutProps<"/">) {
  return (
    <>
      {children}
      {featured}
    </>
  )
}
