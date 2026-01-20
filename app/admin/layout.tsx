import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen flex font-sans text-white"
      style={{
        background: "linear-gradient(135deg, #120c2b 0%, #1e1245 50%, #2a165e 100%)",
      }}
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        {children}
      </div>
    </div>
  )
}
