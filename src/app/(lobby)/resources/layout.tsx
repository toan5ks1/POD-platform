interface ResourcesLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function ProductsLayout({
  children,
  modal,
}: ResourcesLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
