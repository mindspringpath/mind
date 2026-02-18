'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import AvailabilityManager from '@/components/admin/AvailabilityManager'

export default function AvailabilityManagerPage() {
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
        console.error('Availability manager: Error checking access:', error)
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
          <p>Loading availability manager...</p>
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
              <h1 className="text-2xl font-bold text-softwhite">Availability Manager</h1>
              <p className="text-softwhite/60 text-sm mt-1">
                Manage time slots and availability
              </p>
            </div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Total Slots</p>
                <p className="text-2xl font-bold text-softwhite mt-1">0</p>
              </div>
              <div className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Available</p>
                <p className="text-2xl font-bold text-green-400 mt-1">0</p>
              </div>
              <div className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate/20 border border-graphite rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-softwhite/60 text-sm">Booked</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">0</p>
              </div>
              <div className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Availability Manager Component */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-softwhite">Time Slot Management</h2>
            <div className="flex items-center gap-2">
              <span className="text-softwhite/60 text-sm">Full management interface</span>
            </div>
          </div>
          
          <AvailabilityManager />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-softwhite mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => router.push('/admin/time-slots')}
            >
              <div className="w-6 h-6 mb-2" />
              <span>Time Slots</span>
            </Button>

            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => router.push('/admin/session-revisions')}
            >
              <div className="w-6 h-6 mb-2" />
              <span>Session Revisions</span>
            </Button>

            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => router.push('/admin/appointments')}
            >
              <div className="w-6 h-6 mb-2" />
              <span>Appointments</span>
            </Button>

            <Button 
              variant="outline"
              className="h-20 flex flex-col items-center justify-center"
              onClick={() => router.push('/admin')}
            >
              <div className="w-6 h-6 mb-2" />
              <span>Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
