'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase, getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'

type NavItem = { href: string; label: string }

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const accountDropdownRef = useRef<HTMLDivElement>(null)

  const [user, setUser] = useState<any>(null)
  const [admin, setAdmin] = useState(false)
  const [openMobile, setOpenMobile] = useState(false)
  const [openAccount, setOpenAccount] = useState(false)

  const nav: NavItem[] = useMemo(
    () => [
      { href: '/home', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/services', label: 'What we offer' },
      { href: '/contact', label: 'Contact' },
    ],
    []
  )
  useEffect(() => {
    const load = async () => {
      const u = await getCurrentUser()
      setUser(u || null)
      setAdmin(u ? await isAdmin() : false)
    }
    load()

    const { data } = supabase.auth.onAuthStateChange(() => load())
    return () => data.subscription.unsubscribe()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setOpenAccount(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')?.[0] ||
    'My Account'

  const logout = async () => {
    await supabase.auth.signOut()
    setOpenAccount(false)
    setOpenMobile(false)
    router.push('/home')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-graphite bg-charcoal/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-2 md:py-3 lg:py-4 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/home" className="flex items-center gap-2">
          <Logo variant="dark" className="h-12 w-auto md:h-14 lg:h-20 xl:h-24" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  'text-sm transition ' +
                  (active ? 'text-softwhite' : 'text-softwhite/70 hover:text-softwhite')
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="btn-mindspring-outline">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="btn-mindspring-primary">Sign up</Button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={accountDropdownRef}>
              <Button
                className="btn-mindspring-outline"
                variant="outline"
                onClick={() => setOpenAccount((v) => !v)}
              >
                My Account
              </Button>

              {openAccount && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-graphite bg-charcoal shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-graphite">
                    <div className="text-sm text-softwhite">{displayName}</div>
                    <div className="text-xs text-softwhite/60">{user.email}</div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/appointments"
                      className="block px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                      onClick={() => setOpenAccount(false)}
                    >
                      My Appointments
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                      onClick={() => setOpenAccount(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                      onClick={() => setOpenAccount(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                      onClick={() => setOpenAccount(false)}
                    >
                      Settings
                    </Link>

                    {admin && (
                      <Link
                        href="/admin/appointments"
                        className="block px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                        onClick={() => setOpenAccount(false)}
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-softwhite/80 hover:bg-graphite/40"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="outline"
            className="btn-mindspring-outline"
            onClick={() => setOpenMobile((v) => !v)}
          >
            ☰
          </Button>
        </div>
      </div>

      {/* Mobile panel */}
      {openMobile && (
        <div className="md:hidden border-t border-graphite bg-charcoal">
          <div className="px-4 py-3 space-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40"
                onClick={() => setOpenMobile(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-graphite/60 my-2" />

            {!user ? (
              <div className="flex gap-2">
                <Link href="/auth/login" className="flex-1" onClick={() => setOpenMobile(false)}>
                  <Button variant="outline" className="btn-mindspring-outline w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="flex-1" onClick={() => setOpenMobile(false)}>
                  <Button className="btn-mindspring-primary w-full">Sign up</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="px-3 py-2">
                  <div className="text-sm text-softwhite">{displayName}</div>
                  <div className="text-xs text-softwhite/60">{user.email}</div>
                </div>

                <Link href="/appointments" className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40" onClick={() => setOpenMobile(false)}>
                  My Appointments
                </Link>
                <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40" onClick={() => setOpenMobile(false)}>
                  Dashboard
                </Link>
                <Link href="/profile" className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40" onClick={() => setOpenMobile(false)}>
                  Profile
                </Link>
                <Link href="/settings" className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40" onClick={() => setOpenMobile(false)}>
                  Settings
                </Link>

                {admin && (
                  <Link href="/admin/appointments" className="block px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40" onClick={() => setOpenMobile(false)}>
                    Admin
                  </Link>
                )}

                <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-softwhite/80 hover:bg-graphite/40">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
