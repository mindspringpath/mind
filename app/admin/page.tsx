'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Clock,
  TrendingUp,
  Activity,
  Database,
  AlertCircle,
  CheckCircle,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalAppointments: 0,
    newContacts: 0,
    pendingAppointments: 0,
    totalUsers: 0,
    todayAppointments: 0,
    thisWeekAppointments: 0
  })
  const [supabaseStatus, setSupabaseStatus] = useState<'active' | 'paused' | 'error'>('active')
  const [lastSync, setLastSync] = useState<Date | null>(null)

  // Check Supabase status
  const checkSupabaseStatus = async () => {
    try {
      const response = await fetch('/api/test-booking')
      if (response.ok) {
        setSupabaseStatus('active')
        setLastSync(new Date())
      } else {
        setSupabaseStatus('error')
      }
    } catch (error) {
      setSupabaseStatus('error')
      console.error('Supabase status check failed:', error)
    }
  }

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        console.log('Admin dashboard: Checking access...')
        
        // Add timeout to prevent hanging
        const timeoutId = setTimeout(() => {
          console.error('Admin dashboard: Access check timeout')
          router.replace('/admin/login')
        }, 15000) // 15 second timeout
        
        const currentUser = await getCurrentUser()
        const adminStatus = await isAdmin()
        clearTimeout(timeoutId)
        
        if (!currentUser) {
          console.log('Admin dashboard: No user found, redirecting to login')
          router.replace('/admin/login')
          return
        }

        if (!adminStatus) {
          console.log('Admin dashboard: User is not admin, redirecting')
          router.replace('/admin/login')
          return
        }

        setUser(currentUser)
        
        // Load some basic stats (you can expand this)
        setStats({
          totalAppointments: 0, // You can fetch this from database
          newContacts: 0, // You can fetch this from database
          pendingAppointments: 0, // You can fetch this from database
          totalUsers: 0, // You can fetch this from database
          todayAppointments: 0, // You can fetch this from database
          thisWeekAppointments: 0 // You can fetch this from database
        })
        
        // Check Supabase status
        await checkSupabaseStatus()
        
        console.log('Admin dashboard: Access granted')
      } catch (error) {
        console.error('Admin dashboard: Error checking access:', error)
        router.replace('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
    
    // Set up periodic status check
    const interval = setInterval(checkSupabaseStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const getStatusIcon = () => {
    switch (supabaseStatus) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'paused':
        return <Pause className="w-5 h-5 text-amber-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <RefreshCw className="w-5 h-5 text-softwhite/40" />
    }
  }

  const getStatusText = () => {
    switch (supabaseStatus) {
      case 'active':
        return 'Connected'
      case 'paused':
        return 'Paused'
      case 'error':
        return 'Error'
      default:
        return 'Checking...'
    }
  }

  const getStatusColor = () => {
    switch (supabaseStatus) {
      case 'active':
        return 'text-green-400'
      case 'paused':
        return 'text-amber-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-softwhite/60'
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      {/* Header */}
      <div className="border-b border-graphite bg-charcoal/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-softwhite">Admin Dashboard</h1>
              <p className="text-softwhite/60 text-sm mt-1">
                Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Supabase Status */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate/20 rounded-lg border border-graphite">
                <Database className="w-4 h-4 text-softwhite/60" />
                <span className="text-sm text-softwhite/80">Supabase:</span>
                {getStatusIcon()}
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={checkSupabaseStatus}
                  className="ml-2"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-softwhite/60 text-sm">
                {user?.email}
              </span>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Switch Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Total Appointments</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.totalAppointments}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">New Contacts</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.newContacts}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Pending Appointments</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.pendingAppointments}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Today & This Week Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Today's Appointments</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.todayAppointments}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">This Week</p>
                <p className="text-2xl font-bold text-softwhite mt-1">{stats.thisWeekAppointments}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-softwhite mb-6">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/appointments">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <Calendar className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Appointments</h3>
                <p className="text-softwhite/60 text-sm">Manage all appointments</p>
              </div>
            </Link>

            <Link href="/admin/contacts">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <MessageSquare className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Contacts</h3>
                <p className="text-softwhite/60 text-sm">View contact messages</p>
              </div>
            </Link>

            <Link href="/admin/time-slots">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <Clock className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Time Slots</h3>
                <p className="text-softwhite/60 text-sm">Manage availability</p>
              </div>
            </Link>

            <Link href="/admin/settings">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <Settings className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Settings</h3>
                <p className="text-softwhite/60 text-sm">System configuration</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Session Management */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-softwhite mb-6">Session Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/session-revisions">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <RefreshCw className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Date Revisions</h3>
                <p className="text-softwhite/60 text-sm">Modify session dates</p>
              </div>
            </Link>

            <Link href="/admin/availability-manager">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6 hover:bg-slate/30 transition-colors cursor-pointer">
                <Calendar className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-lg font-semibold text-softwhite mb-2">Availability</h3>
                <p className="text-softwhite/60 text-sm">Manage time slots</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-softwhite mb-6">System Status</h2>
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getStatusIcon()}
                  <span className={`ml-2 font-medium ${getStatusColor()}`}>
                    {getStatusText()}
                  </span>
                </div>
                <p className="text-softwhite/60 text-sm">Supabase Connection</p>
                {lastSync && (
                  <p className="text-softwhite/40 text-xs mt-1">
                    Last check: {lastSync.toLocaleTimeString()}
                  </p>
                )}
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="ml-2 font-medium text-green-400">Active</span>
                </div>
                <p className="text-softwhite/60 text-sm">Email Service</p>
                <p className="text-softwhite/40 text-xs mt-1">Hostinger SMTP</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Play className="w-5 h-5 text-blue-400" />
                  <span className="ml-2 font-medium text-blue-400">Running</span>
                </div>
                <p className="text-softwhite/60 text-sm">Application</p>
                <p className="text-softwhite/40 text-xs mt-1">All systems operational</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={checkSupabaseStatus} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Status
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-softwhite mb-6">Recent Activity</h2>
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-softwhite/40 mx-auto mb-4" />
              <p className="text-softwhite/60">Activity tracking coming soon</p>
              <p className="text-softwhite/40 text-sm mt-2">
                Check appointments and contacts for recent activity
              </p>
            </div>
          </div>
        </div>

        {/* Back to Main Site */}
        <div className="mt-8 text-center">
          <Link href="/home">
            <Button variant="outline">
              ← Back to Main Site
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
