'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      // Try to exchange code from URL
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (exchangeError) {
        setError('Verification link is invalid or expired.')
        return
      }

      // Success → redirect to dashboard
      router.replace('/dashboard')
    }

    handleCallback()
  }, [router])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Verification Error</h1>
        <p className="text-softwhite/80 mb-6">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-primary text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
      <h1 className="text-xl font-semibold text-softwhite mb-2">Verifying your account…</h1>
      <p className="text-softwhite/70">Please wait while we complete your login.</p>
    </div>
  )
}