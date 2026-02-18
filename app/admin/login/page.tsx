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
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        console.log('Admin login: Checking user status...')
        const user = await getCurrentUser()
        console.log('Admin login: User found:', !!user)
        setUser(user)
        
        if (!user) {
          console.log('Admin login: No user found, showing login page')
          setLoading(false)
          return
        }

        const adminStatus = await isAdmin()
        console.log('Admin login: Admin status:', adminStatus)
        setIsAdminUser(adminStatus)
        
        if (adminStatus) {
          console.log('Admin login: User is admin, redirecting to dashboard')
          router.replace('/admin')
        } else {
          console.log('Admin login: User is not admin, showing access denied')
        }
      } catch (error) {
        console.error('Admin login: Error checking admin status:', error)
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

  // Access denied case - user is logged in but not admin
  if (user && !isAdminUser) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-red-400">Access Denied</h1>
          <p className="text-softwhite/70 mb-8">
            You don't have admin privileges to access this area.
          </p>
          
          <div className="bg-slate/20 border border-graphite rounded-xl p-6 mb-8">
            <p className="text-softwhite/80 mb-4">
              Please contact an administrator if you believe this is an error.
            </p>
            <div className="space-y-2">
              <Link href="/home">
                <Button className="btn-mindspring-outline w-full">
                  Back to Home
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="btn-mindspring-primary w-full">
                  Try Different Account
                </Button>
              </Link>
            </div>
          </div>
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
