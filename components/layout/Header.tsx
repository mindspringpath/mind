'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'
import { getCurrentUser, signOut } from '@/lib/auth-helpers'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: '12-Week Program', href: '/program' },
    { name: 'Book Session', href: '/booking' },
  ]

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      const current = await getCurrentUser()
      setUser(current)
      setLoadingUser(false)
    }
    loadUser()
  }, [])

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    'User'

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="fixed top-0 w-full bg-charcoal/95 backdrop-blur-sm border-b border-graphite z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-3 group">
            <Logo variant="dark" className="h-16 w-auto sm:h-16 sm:w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-base relative z-10"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Loading shimmer */}
            {loadingUser && (
              <div className="h-8 w-24 bg-graphite/40 rounded animate-pulse" />
            )}

            {/* Logged-out state */}
            {!loadingUser && !user && (
              <>
                <Link href="/login">
                  <Button className="btn-mindspring-outline px-6 py-2">
                    Login
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button className="btn-mindspring-primary px-6 py-2">
                    Free Consultation
                  </Button>
                </Link>
              </>
            )}

            {/* Logged-in state */}
            {!loadingUser && user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-softwhite/90 hover:text-softwhite transition"
                >
                  <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {initials}
                  </div>
                  <span className="font-medium">{displayName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-charcoal border border-graphite rounded-xl shadow-xl py-2 z-50">
                    <Link
                      href="/appointments"
                      className="block px-4 py-2 text-softwhite/80 hover:bg-slate hover:text-softwhite rounded transition"
                    >
                      My Appointments
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-softwhite/80 hover:bg-slate hover:text-softwhite rounded transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-softwhite hover:text-softwhite"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-charcoal border-t border-graphite">

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2 border-t border-graphite mt-4">

                {/* Logged-out mobile */}
                {!user && (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl font-medium transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>

                    <Link
                      href="/booking"
                      className="block bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Free Consultation
                    </Link>
                  </>
                )}

                {/* Logged-in mobile */}
                {user && (
                  <>
                    <div className="px-4 py-3 text-softwhite/80 font-medium">
                      {displayName}
                    </div>

                    <Link
                      href="/appointments"
                      className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Appointments
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl transition"
                    >
                      Logout
                    </button>
                  </>
                )}

              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}