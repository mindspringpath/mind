'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import AvailabilityManager from '@/components/admin/AvailabilityManager'

export default function TimeSlotsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'manager'>('overview')

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
        console.error('Time slots: Error checking access:', error)
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
          <p>Loading time slots management...</p>
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
              <h1 className="text-2xl font-bold text-softwhite">Time Slots Management</h1>
              <p className="text-softwhite/60 text-sm mt-1">
                Manage your availability and booking slots
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
                size="sm"
              >
                Overview
              </Button>
              <Button 
                variant={activeTab === 'manager' ? 'default' : 'outline'}
                onClick={() => setActiveTab('manager')}
                size="sm"
              >
                Manager
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/admin')}
              >
                ← Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate/20 border border-graphite rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-softwhite/60 text-sm">Total Slots</p>
                    <p className="text-2xl font-bold text-softwhite mt-1">0</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="bg-slate/20 border border-graphite rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-softwhite/60 text-sm">Available Today</p>
                    <p className="text-2xl font-bold text-softwhite mt-1">0</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-slate/20 border border-graphite rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-softwhite/60 text-sm">Booked Today</p>
                    <p className="text-2xl font-bold text-softwhite mt-1">0</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Recent Time Slots */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-softwhite mb-6">Recent Time Slots</h2>
              <div className="bg-slate/20 border border-graphite rounded-xl p-6">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-softwhite/40 mx-auto mb-4" />
                  <p className="text-softwhite/60">Switch to Manager tab to view and manage time slots</p>
                  <Button 
                    onClick={() => setActiveTab('manager')}
                    className="mt-4"
                  >
                    Open Time Slot Manager
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-softwhite mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  onClick={() => setActiveTab('manager')}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Plus className="w-6 h-6 mb-2" />
                  <span>Add Time Slot</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  disabled
                >
                  <Edit className="w-6 h-6 mb-2" />
                  <span>Bulk Edit</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  disabled
                >
                  <RefreshCw className="w-6 h-6 mb-2" />
                  <span>Sync Calendar</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                  disabled
                >
                  <Trash2 className="w-6 h-6 mb-2" />
                  <span>Clear Old Slots</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manager' && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-softwhite">Time Slot Manager</h2>
                <div className="flex items-center gap-2">
                  <span className="text-softwhite/60 text-sm">
                    Full management interface
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('overview')}
                  >
                    ← Overview
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Availability Manager Component */}
            <AvailabilityManager />
          </div>
        )}
      </div>
    </div>
  )
}
