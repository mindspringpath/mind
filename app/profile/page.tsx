'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          setUser(null)
          setLoading(false)
          return
        }
        setUser(currentUser)
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-charcoal text-softwhite">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
              My Profile
            </h1>
            <div className="bg-slate/20 border border-graphite rounded-xl p-8">
              <p className="text-lg text-softwhite/70 mb-6">
                Please log in to view your profile.
              </p>
              <Link href="/auth/login">
                <Button className="btn-mindspring-primary">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
            My Profile
          </h1>
          
          <p className="text-lg text-softwhite/70 mb-8">
            View and manage your account details.
          </p>

          <div className="bg-slate/20 border border-graphite rounded-xl p-8">
            <h2 className="text-xl font-semibold text-softwhite mb-6">Profile Summary</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-softwhite/60 block mb-1">Full Name</label>
                <p className="text-softwhite">
                  {user?.user_metadata?.full_name || 'Not set'}
                </p>
              </div>
              
              <div>
                <label className="text-sm text-softwhite/60 block mb-1">Email</label>
                <p className="text-softwhite">
                  {user?.email || 'Not set'}
                </p>
              </div>
              
              <div>
                <label className="text-sm text-softwhite/60 block mb-1">Phone</label>
                <p className="text-softwhite">
                  {user?.user_metadata?.phone || 'Not set'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-graphite">
              <p className="text-sm text-softwhite/60 mb-6">
                Profile editing will be available soon.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard">
              <Button className="btn-mindspring-primary">
                Dashboard
              </Button>
            </Link>
            <Link href="/appointments">
              <Button className="btn-mindspring-outline">
                My Appointments
              </Button>
            </Link>
            <Link href="/home">
              <Button className="btn-mindspring-outline">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
