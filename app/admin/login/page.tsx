'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin, signIn, signOut } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [roleCheckError, setRoleCheckError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        console.log('Admin login: Checking user status...')
        
        // Add timeout to prevent hanging
        const timeoutId = setTimeout(() => {
          console.error('Admin login: Role check timeout')
          setRoleCheckError('Role verification is taking too long. Please refresh the page.')
          setShowLogin(true)
          setLoading(false)
        }, 10000) // 10 second timeout for role check
        
        const user = await getCurrentUser()
        clearTimeout(timeoutId)
        
        console.log('Admin login: User found:', !!user)
        setUser(user)
        
        if (!user) {
          console.log('Admin login: No user found, showing login page')
          setShowLogin(true)
          setLoading(false)
          return
        }

        const adminStatus = await isAdmin()
        console.log('Admin login: Admin status:', adminStatus)
        setIsAdminUser(adminStatus)
        
        if (adminStatus) {
          console.log('Admin login: User is admin, redirecting to appointments')
          router.replace('/admin/appointments')
        } else {
          console.log('Admin login: User is not admin, showing access denied')
        }
      } catch (error) {
        console.error('Admin login: Error checking admin status:', error)
        setShowLogin(true)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setLoginError('Login is taking longer than expected. Please try again.')
      setLoginLoading(false)
    }, 30000) // 30 second timeout

    try {
      console.log('Admin login: Attempting login for:', email)
      const result = await signIn(email, password)
      clearTimeout(timeoutId)
      
      if (result.user) {
        console.log('Admin login: Login successful, checking admin status')
        
        // Add timeout for admin status check
        const adminTimeoutId = setTimeout(() => {
          console.error('Admin login: Admin status check timeout')
          setLoginError('Role verification is taking too long. Please try again.')
          setLoginLoading(false)
        }, 10000) // 10 second timeout
        
        // Check admin status after login
        const adminStatus = await isAdmin()
        clearTimeout(adminTimeoutId)
        
        console.log('Admin login: Admin status after login:', adminStatus)
        
        if (adminStatus) {
          console.log('Admin login: User is admin, redirecting to appointments')
          router.replace('/admin/appointments')
        } else {
          setLoginError('Access denied. Admin privileges required.')
          // Sign out non-admin user
          await signOut()
        }
      } else {
        setLoginError('Login failed. Please try again.')
      }
    } catch (err: any) {
      clearTimeout(timeoutId)
      console.error('Admin login: Login error:', err)
      const msg = err?.message || ''
      
      if (msg.includes('Invalid login credentials')) {
        setLoginError('Invalid email or password.')
      } else if (msg.includes('Email not confirmed')) {
        setLoginError('Please verify your email first.')
      } else if (msg.includes('signal is aborted') || msg.includes('was cancelled')) {
        // TEMPORARILY DISABLED: Let's see the actual error
        setLoginError(msg || 'Login failed. Please try again.')
      } else if (msg.includes('interrupted')) {
        // TEMPORARILY DISABLED: Let's see the actual error
        setLoginError(msg || 'Login failed. Please try again.')
      } else {
        setLoginError(msg || 'Login failed. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoginLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-softwhite mb-2">Checking access...</p>
          {roleCheckError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
              <p className="text-red-400 text-sm">{roleCheckError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-mindspring-primary mt-3 text-sm"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isAdminUser) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirecting to admin appointments...</p>
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
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
          <p className="text-softwhite/70">
            Sign in with your admin account to access the dashboard.
          </p>
        </div>

        {loginError && (
          <div className="mb-4 p-4 bg-slate border border-red-500/40 text-red-300 rounded-xl">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-softwhite mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="mindspring-input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-softwhite mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="mindspring-input w-full pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 text-softwhite/60 hover:text-softwhite"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          >
            {loginLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <p className="text-softwhite/70">
            <Link href="/auth/login" className="text-primary hover:underline">
              Regular User Login
            </Link>
          </p>

          <p className="text-softwhite/70">
            <Link href="/home" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
