'use client'

import { useState, useEffect } from 'react'
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
import { supabase, getCurrentUser } from '@/lib/auth-helpers'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.replace('/auth/login')
          return
        }
        setUser(currentUser)
      } catch (error) {
        router.replace('/auth/login')
      }
    }

    checkAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
    { name: 'Programs', href: '/dashboard/programs', icon: Target },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.replace('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.replace('/auth/login')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
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
                  {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-softwhite">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-sm text-softwhite/60">{user?.email || ''}</div>
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
