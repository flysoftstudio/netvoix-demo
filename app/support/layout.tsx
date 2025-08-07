import Sidebar from "@/components/sidebar"

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Sidebar>{children}</Sidebar>
}
