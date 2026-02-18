'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
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
          <p>Loading settings...</p>
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
              Account Settings
            </h1>
            <div className="bg-slate/20 border border-graphite rounded-xl p-8">
              <p className="text-lg text-softwhite/70 mb-6">
                Please log in to access your settings.
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
            Account Settings
          </h1>

          <div className="space-y-6">
            {/* Security Section */}
            <div className="bg-slate/20 border border-graphite rounded-xl p-6">
              <h2 className="text-xl font-semibold text-softwhite mb-4">Security</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-softwhite/70 mb-4">
                    Manage your account security and password.
                  </p>
                  <Link href="/auth/forgot-password">
                    <Button className="btn-mindspring-primary">
                      Change Password
                    </Button>
                  </Link>
                  <p className="text-sm text-softwhite/60 mt-2">
                    We'll send you a secure reset link via email.
                  </p>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-slate/20 border border-graphite rounded-xl p-6">
              <h2 className="text-xl font-semibold text-softwhite mb-4">Notifications</h2>
              <div className="space-y-3">
                <p className="text-softwhite/70">
                  Email notifications are automatically sent for:
                </p>
                <ul className="text-sm text-softwhite/60 space-y-1 ml-4">
                  <li>• Booking confirmations</li>
                  <li>• Reschedules</li>
                  <li>• Cancellations</li>
                </ul>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-slate/20 border border-graphite rounded-xl p-6">
              <h2 className="text-xl font-semibold text-softwhite mb-4">Support</h2>
              <div className="space-y-4">
                <p className="text-softwhite/70">
                  Need help? We're here to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/contact">
                    <Button className="btn-mindspring-primary">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button className="btn-mindspring-outline">
                      FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/profile">
              <Button className="btn-mindspring-outline">
                Profile
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="btn-mindspring-primary">
                Dashboard
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
