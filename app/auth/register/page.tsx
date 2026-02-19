'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth-helpers'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setError('Registration is taking longer than expected. Please try again.')
      setLoading(false)
    }, 15000) // 15 second timeout

    try {
      console.log('Registration page: Attempting to register:', email)
      await signUp(email, password, fullName)
      clearTimeout(timeoutId)
      
      console.log('Registration page: Registration successful')
      setSuccess('Account created! Check your email to verify your account.')
      
      // Redirect after delay to show success message
      setTimeout(() => {
        router.replace('/auth/login')
      }, 2000)
    } catch (err: any) {
      clearTimeout(timeoutId)
      console.log('Registration page: Error caught:', err?.message)
      
      if (err.message.includes('User already registered')) {
        setError('This email is already registered. Please sign in instead.')
      } else if (err.message.includes('timeout') || err.message.includes('TIMEOUT')) {
        setError('Registration timed out. Please check your connection and try again.')
      } else if (err.message.includes('Password')) {
        setError('Password is too weak. Please use a stronger password.')
      } else if (err.message.includes('Email')) {
        setError('Invalid email address. Please check and try again.')
      } else if (err.message.includes('signal is aborted') || err.message.includes('was cancelled')) {
        setError('Registration was cancelled. Please try again.')
      } else if (err.message.includes('interrupted')) {
        setError('Registration was interrupted. Please try again.')
      } else {
        setError(err.message || 'Registration failed. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

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

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="mindspring-input w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="mindspring-input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="mindspring-input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-softwhite/70 text-center mt-6">
          Already have an account?{' '}
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