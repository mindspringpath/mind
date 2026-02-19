import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log('=== DIRECT LOGIN TEST ===')
    console.log('Email:', email)
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Has Anon Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    // Create direct Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    // Test direct authentication
    console.log('Attempting direct sign in...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('Direct auth result:', {
      success: !error,
      error: error?.message,
      errorName: error?.name,
      errorStatus: error?.status,
      userExists: !!data?.user,
      sessionExists: !!data?.session,
      userId: data?.user?.id
    })
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        errorName: error.name,
        errorStatus: error.status,
        errorDetails: error,
        debug: {
          email,
          timestamp: new Date().toISOString(),
          environment: {
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          }
        }
      })
    }
    
    // Test admin role check
    console.log('Checking admin role...')
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user?.id)
      .single()
    
    console.log('Role check result:', {
      success: !roleError,
      error: roleError?.message,
      role: roleData?.role,
      isAdmin: roleData?.role === 'admin'
    })
    
    return NextResponse.json({
      success: true,
      authSuccess: true,
      roleCheckSuccess: !roleError,
      isAdmin: roleData?.role === 'admin',
      debug: {
        email,
        userId: data.user?.id,
        role: roleData?.role,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('Direct login test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      debug: {
        timestamp: new Date().toISOString()
      }
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Direct Login Test',
    usage: 'POST with { email, password }',
    purpose: 'Test Supabase auth without auth-helpers'
  })
}
