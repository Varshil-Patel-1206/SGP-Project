'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  FileText,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminEmail')
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#fffaf3] shadow-lg border-[#e6dcd0] text-[#3b2412]"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-[#2b1a12] to-[#3a2418] text-[#f7f1e8]
          w-64 transform transition-transform duration-300 ease-in-out z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-[#4a2c14]
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#4a2c14]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4a2c14] rounded-md flex items-center justify-center shadow-lg">
              <span className="text-[#f5efe6] font-serif text-xl font-bold">W</span>
            </div>
            <div>
              <h1 className="text-xl font-serif tracking-wide">
                Wood<span className="text-[#9b7b65]">Maps</span>
              </h1>
              <p className="text-xs text-[#9b7b65]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#9b7b65] text-white shadow-lg' 
                      : 'text-[#d4b896] hover:bg-[#3a2418] hover:text-[#f7f1e8]'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* User info & Logout */}
        <div className="p-4 border-t border-[#4a2c14]">
          <div className="mb-3 p-3 bg-[#3a2418] rounded-lg border border-[#4a2c14]">
            <p className="text-sm font-medium text-[#f7f1e8]">Admin User</p>
            <p className="text-xs text-[#9b7b65]">admin@woodmaps.com</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 border-[#4a2c14] text-[#d4b896] hover:bg-[#9b7b65] hover:text-white hover:border-[#9b7b65]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#2b1a12] bg-opacity-70 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
