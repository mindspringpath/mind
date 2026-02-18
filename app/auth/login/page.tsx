'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getCurrentUser } from '@/lib/auth-helpers'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Only check auth on client side
    if (typeof window === 'undefined') return
    
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          router.replace('/dashboard')
        }
      } catch (err) {
        // User not logged in, continue with login page
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setError('Login is taking longer than expected. Please try again.')
      setLoading(false)
    }, 10000) // 10 second timeout

    try {
      console.log('Login page: Attempting login for:', email)
      const result = await signIn(email, password)
      clearTimeout(timeoutId)
      
      // Check if login was successful
      if (result.user) {
        console.log('Login page: Login successful, redirecting to dashboard')
        router.replace('/dashboard')
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (err: any) {
      clearTimeout(timeoutId)
      const msg = err?.message || ''

      console.log('Login page: Error caught:', msg)

      if (msg.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.')
      } else if (msg.includes('Email not confirmed')) {
        setError('Please verify your email before logging in.')
      } else if (msg.includes('User not found')) {
        setError('No account found with this email.')
      } else if (msg.includes('can only be called on client side')) {
        setError('Login is only available in browser.')
      } else if (msg.includes('timeout') || msg.includes('TIMEOUT')) {
        setError('Login timed out. Please check your connection and try again.')
      } else {
        setError(msg || 'Login failed. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
            <p className="text-softwhite/70">
              Sign in to your MindSpring Path account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-slate border border-red-500/40 text-red-300 rounded-xl">
              {error}
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
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p className="text-softwhite/70">
              Don't have an account?{' '}
              <span
                onClick={() => router.push('/auth/register')}
                className="text-primary cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>

            <p className="text-softwhite/70">
              <span
                onClick={() => router.push('/auth/forgot-password')}
                className="text-primary cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}