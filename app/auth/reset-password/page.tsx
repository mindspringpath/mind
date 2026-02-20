'use client'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const router = useRouter()

  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // ⭐ FIX: Read token from URL hash, not query params
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')

    if (!accessToken) {
      setError('Invalid or missing reset token.')
    } else {
      setToken(accessToken)
    }
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!token) {
      setError('Missing reset token.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)

    try {
      // ⭐ FIX: Must exchange token before updating password
      const { error: sessionError } = await supabase.auth.exchangeCodeForSession(token)
      if (sessionError) {
        console.error('Reset password: Session exchange error:', sessionError)
        setError('Invalid or expired reset link. Please request a new one.')
        setLoading(false)
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        console.error('Reset password: Update error:', updateError)
        throw updateError
      }

      setSuccess('Password updated successfully!')
      setTimeout(() => router.replace('/auth/login'), 2000)
    } catch (err: any) {
      console.error('Reset password: Error:', err?.message)

      if (err.message?.includes('weak password')) {
        setError('Password is too weak. Please choose a stronger password.')
      } else {
        setError(err.message || 'Failed to update password.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center text-red-400 mt-20">
        Invalid or missing reset token.
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold text-softwhite mb-6 text-center">
        Reset Password
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

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          className="mindspring-input w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="mindspring-input w-full"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}