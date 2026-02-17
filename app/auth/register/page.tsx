'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth-helpers'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await signUp(email, password, fullName)

      setSuccess(
        'Account created successfully! Please check your email to verify your account.'
      )

      // Redirect to login after a short delay
      setTimeout(() => {
        router.replace('/login')
      }, 1500)
    } catch (err: any) {
      if (err.message?.includes('User already registered')) {
        setError('This email is already registered. Please sign in instead.')
      } else {
        setError(err.message || 'Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold text-softwhite mb-6 text-center">
        Create Your Account
      </h1>

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
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="text-softwhite/70 text-center mt-6">
        Already have an account?{' '}
        <span
          onClick={() => router.push('/login')}
          className="text-primary cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  )
}