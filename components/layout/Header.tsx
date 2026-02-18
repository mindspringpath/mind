'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { getCurrentUser, isAdmin, signOut, supabase, getProfile } from '@/lib/auth-helpers'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        setLoadingUser(false)
        return
      }

      let userProfile = null
      try {
        userProfile = await getProfile(currentUser.id)
      } catch (profileError) {
        console.log('Profile not found:', profileError)
      }

      const adminCheck = await isAdmin()
      setUser({ ...currentUser, isAdmin: adminCheck })
      setProfile(userProfile)
      setLoadingUser(false)
    } catch (error) {
      console.error('Error loading user:', error)
      setLoadingUser(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUserData()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setProfile(null)
    window.location.href = '/login'
  }

  const displayName = profile?.first_name || user?.user_metadata?.full_name || user?.email || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase()

  return (
    <header className="fixed top-0 w-full bg-charcoal/95 backdrop-blur-sm border-b border-graphite z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/home" className="flex items-center space-x-3 group">
            <Logo variant="dark" className="h-16 w-auto sm:h-16 sm:w-auto" />
          </Link>

          {loadingUser ? (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-softwhite rounded-full animate-pulse"></div>
              <span className="text-softwhite text-sm">Loading...</span>
            </div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <span className="text-softwhite/80">Welcome back, {displayName}</span>
              
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-sm text-softwhite/80 hover:text-softwhite px-3 py-2 rounded-md hover:bg-slate"
                >
                  {initials}
                  <span className="ml-2">{isMenuOpen ? '▲' : '▼'}</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-charcoal border border-graphite rounded-xl shadow-xl py-2 z-50">
                    <Link
                      href="/appointments"
                      className="block px-4 py-2 text-softwhite/80 hover:bg-slate hover:text-softwhite rounded transition"
                    >
                      My Appointments
                    </Link>
                    
                    <Link
                      href="/booking"
                      className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl transition"
                    >
                      Book Session
                    </Link>

                    {user?.isAdmin && (
                      <Link
                        href="/admin/appointments"
                        className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-softwhite/80 hover:bg-slate hover:text-softwhite rounded-xl transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="mindspring-button">
                Sign In
              </Link>
              <Link href="/auth/register" className="mindspring-button-outline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
