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
      const refreshToken = hashParams.get('refresh_token')
      const next = searchParams.get('next')

      if (!accessToken || !refreshToken) {
        setError('Verification link is invalid or incomplete.')
        return
      }

      try {
        // 2. Set the session using the tokens from the URL
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })

        if (sessionError) {
          console.error('Auth callback: Session error:', sessionError)
          setError('Verification failed. Please request a new verification email.')
          return
        }

        // 3. Now the user is authenticated — fetch user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error('Auth callback: No user found after session set')
          setError('Authentication failed. Please try again.')
          return
        }

        console.log('Auth callback: User authenticated:', user.email)

        // 4. Check role
        let isAdmin = false
        try {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single()

          isAdmin = roleData?.role === 'admin'
        } catch (roleError) {
          console.error('Auth callback: Role check failed:', roleError)
          isAdmin = user.email === 'mindspringpath@gmail.com'
        }

        // 5. Redirect
        if (next) {
          router.replace(next)
        } else if (isAdmin) {
          router.replace('/admin/appointments')
        } else {
          router.replace('/dashboard')
        }

      } catch (err) {
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