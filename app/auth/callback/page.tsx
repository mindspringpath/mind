'use client'
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

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
      // 1. Read hash fragment from Supabase email link
      const hash = window.location.hash.substring(1)
      const hashParams = new URLSearchParams(hash)

      const accessToken = hashParams.get('access_token')
      const type = hashParams.get('type')
      const next = searchParams.get('next')

      if (!accessToken) {
        setError('No verification code provided.')
        return
      }

      try {
        // 2. Exchange token for session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(accessToken)

        if (exchangeError) {
          console.error('Auth callback: Exchange error:', exchangeError)

          if (exchangeError.message?.includes('Invalid token')) {
            setError('Verification link is invalid. Please request a new verification email.')
          } else if (exchangeError.message?.includes('expired')) {
            setError('Verification link has expired. Please request a new verification email.')
          } else if (exchangeError.message?.includes('already been used')) {
            setError('Verification link has already been used. Please try logging in.')
          } else {
            setError('Verification failed. Please try again or request a new verification email.')
          }
          return
        }

        console.log('Auth callback: Session exchanged successfully')

        // 3. Get authenticated user
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          console.error('Auth callback: No user found after exchange')
          setError('Authentication failed. Please try again.')
          return
        }

        console.log('Auth callback: User authenticated:', user.email)

        // 4. Check role
        try {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single()

          const isAdmin = roleData?.role === 'admin'
          console.log('Auth callback: Admin status:', isAdmin)

          // 5. Redirect
          if (next) {
            router.replace(next)
          } else if (isAdmin) {
            router.replace('/admin/appointments')
          } else {
            router.replace('/dashboard')
          }
        } catch (roleError) {
          console.error('Auth callback: Role check failed:', roleError)

          if (user?.email === 'mindspringpath@gmail.com') {
            router.replace('/admin/appointments')
          } else {
            router.replace('/dashboard')
          }
        }
      } catch (err: any) {
        console.error('Auth callback: Unexpected error:', err)
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