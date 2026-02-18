'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/lib/auth-helpers'
import { Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setError('Password reset is taking longer than expected. Please try again.')
      setLoading(false)
    }, 15000) // 15 second timeout

    try {
      console.log('Forgot password: Sending reset email to:', email)
      await resetPassword(email)
      clearTimeout(timeoutId)
      
      console.log('Forgot password: Reset email sent successfully')
      setSuccess('Password reset email sent! Check your inbox.')
      setTimeout(() => router.replace('/auth/login'), 2000)
    } catch (err: any) {
      clearTimeout(timeoutId)
      console.error('Forgot password: Error:', err?.message)
      
      if (err.message.includes('User not found')) {
        setError('No account found with this email address.')
      } else if (err.message.includes('timeout') || err.message.includes('TIMEOUT')) {
        setError('Request timed out. Please check your connection and try again.')
      } else if (err.message.includes('rate limit') || err.message.includes('too many')) {
        setError('Too many requests. Please wait a few minutes before trying again.')
      } else {
        setError(err.message || 'Failed to send reset email. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

        {error && (
          <div className="mb-4 p-4 bg-slate border border-red-500/40 text-red-300 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500/40 text-green-300 rounded-xl">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="mindspring-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Send Reset Email'}
          </button>
        </form>

        <p className="text-center mt-6 text-softwhite/70">
          Remember your password?{' '}
          <span
            onClick={() => router.replace('/auth/login')}
            className="text-primary cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}