'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Programs', href: '/dashboard/programs', icon: Target },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      {/* Mobile Header */}
      <div className="lg:hidden bg-charcoal border-b border-graphite px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="text-lg font-bold tracking-tight">MindSpring Path</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-softwhite hover:text-softwhite"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate border-r border-graphite transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center space-x-2 p-6 border-b border-graphite">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
              <span className="text-lg font-bold tracking-tight text-softwhite">MindSpring Path</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-charcoal rounded-xl transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-graphite">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <div className="font-medium text-softwhite">John Doe</div>
                  <div className="text-sm text-softwhite/60">john.doe@example.com</div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-softwhite/80 hover:text-softwhite hover:bg-charcoal"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-charcoal border-b border-graphite px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-softwhite tracking-tight">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="mindspring-primary" size="sm">
                  Book Session
                </Button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
