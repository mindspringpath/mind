'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Settings, 
  Mail, 
  Shield, 
  Database,
  Bell,
  Palette
} from 'lucide-react'

export default function AdminSettings() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await getCurrentUser()
        const adminStatus = await isAdmin()
        
        if (!currentUser || !adminStatus) {
          router.replace('/admin/login')
          return
        }

        setUser(currentUser)
      } catch (error) {
        console.error('Admin settings: Error checking access:', error)
        router.replace('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      {/* Header */}
      <div className="border-b border-graphite bg-charcoal/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-softwhite">Admin Settings</h1>
              <p className="text-softwhite/60 text-sm mt-1">
                Configure your admin preferences
              </p>
            </div>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email Settings */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-softwhite">Email Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">SMTP Host</p>
                <p className="text-softwhite/60 text-xs">smtp.hostinger.com</p>
              </div>
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">SMTP Port</p>
                <p className="text-softwhite/60 text-xs">465</p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Configure Email
              </Button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-lg font-semibold text-softwhite">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Two-Factor Authentication</p>
                <p className="text-softwhite/60 text-xs">Not configured</p>
              </div>
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Session Timeout</p>
                <p className="text-softwhite/60 text-xs">24 hours</p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Security Settings
              </Button>
            </div>
          </div>

          {/* Database Settings */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-lg font-semibold text-softwhite">Database</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Connection Status</p>
                <p className="text-green-400 text-xs">● Connected</p>
              </div>
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Last Backup</p>
                <p className="text-softwhite/60 text-xs">Not configured</p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Database Settings
              </Button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-amber-400 mr-3" />
              <h2 className="text-lg font-semibold text-softwhite">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">New Appointments</p>
                <p className="text-green-400 text-xs">Email enabled</p>
              </div>
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">New Contacts</p>
                <p className="text-green-400 text-xs">Email enabled</p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Notification Settings
              </Button>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-lg font-semibold text-softwhite">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Theme</p>
                <p className="text-softwhite/60 text-xs">Dark Mode</p>
              </div>
              <div className="p-4 bg-slate/10 rounded-lg">
                <p className="text-softwhite/80 text-sm mb-2">Language</p>
                <p className="text-softwhite/60 text-xs">English</p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                Appearance Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-softwhite mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/appointments">
              <Button variant="outline" className="w-full">
                Manage Appointments
              </Button>
            </Link>
            <Link href="/admin/contacts">
              <Button variant="outline" className="w-full">
                View Contacts
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="w-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
