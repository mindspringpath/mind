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
      const code = searchParams.get('code')
      const next = searchParams.get('next')

      if (!code) {
        setError('No verification code provided.')
        return
      }

      try {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

        if (exchangeError) {
          console.error('Auth callback: Exchange error:', exchangeError)
          
          // Handle specific verification errors
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
        
        // Get user after session exchange
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          console.log('Auth callback: User authenticated:', user.email)
          
          // Check if user has admin role and redirect accordingly
          try {
            const { data: roleData } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', user.id)
              .single()
            
            const isAdmin = roleData?.role === 'admin'
            console.log('Auth callback: Admin status:', isAdmin)
            
            // Redirect to appropriate page
            if (next) {
              router.replace(next)
            } else if (isAdmin) {
              router.replace('/admin/appointments')
            } else {
              router.replace('/dashboard')
            }
          } catch (roleError) {
            console.error('Auth callback: Role check failed:', roleError)
            
            // If role check fails, still redirect based on user email
            if (user?.email === 'mindspringpath@gmail.com') {
              console.log('Auth callback: Known admin user, redirecting to appointments')
              router.replace('/admin/appointments')
            } else {
              console.log('Auth callback: Role check failed, redirecting to dashboard')
              router.replace('/dashboard')
            }
          }
        } else {
          console.error('Auth callback: No user found after exchange')
          setError('Authentication failed. Please try again.')
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