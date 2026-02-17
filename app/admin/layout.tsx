import { AdminNav } from '@/components/admin-nav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#fffaf3]">
      <AdminNav />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
