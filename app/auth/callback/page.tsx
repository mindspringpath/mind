'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const next = searchParams.get('next')

      if (!code) {
        setError('No verification code provided.')
        return
      }

      try {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          setError('Verification link is invalid or expired.')
          return
        }

        // Redirect to login after successful verification
        if (next) {
          router.replace(next)
        } else {
          router.replace('/auth/login')
        }
      } catch (err: any) {
        setError('Verification failed. Please try again.')
      }
    }

    handleCallback()
  }, [router, searchParams])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Verification Error</h1>
        <p className="text-softwhite/80 mb-6">{error}</p>
        <button
          onClick={() => router.replace('/auth/login')}
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
      <p className="text-softwhite/70">Please wait while we complete your verification.</p>
    </div>
  )
}