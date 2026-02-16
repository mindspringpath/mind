'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: '12-Week Program', href: '/program' },
    { name: 'Book Session', href: '/booking' },
  ]

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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-softwhite hover:text-softwhite"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
                  className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl font-medium transition-all duration-200 relative z-10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-graphite mt-4">
                <Link
                  href="/login"
                  className="block px-4 py-3 text-softwhite/80 hover:text-softwhite hover:bg-slate rounded-xl font-medium transition-all duration-200 relative z-10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/booking"
                  className="block bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold transition-all duration-200 relative z-10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
