'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await getCurrentUser()
        if (!user) {
          setLoading(false)
          return
        }

        const adminStatus = await isAdmin()
        setIsAdminUser(adminStatus)
        
        if (adminStatus) {
          router.replace('/admin/appointments')
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Checking access...</p>
        </div>
      </div>
    )
  }

  if (isAdminUser) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirecting to admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <p className="text-softwhite/70 mb-8">
          Please sign in with your admin account to access the dashboard.
        </p>
        
        <Link href="/auth/login">
          <Button className="btn-mindspring-primary w-full py-3">
            Go to Login
          </Button>
        </Link>
        
        <div className="mt-6">
          <Link 
            href="/home" 
            className="text-softwhite/60 hover:text-softwhite text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
