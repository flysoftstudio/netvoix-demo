import Sidebar from "@/components/sidebar"

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Sidebar>{children}</Sidebar>
}
