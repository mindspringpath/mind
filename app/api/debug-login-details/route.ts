import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, userAgent, timestamp } = await request.json()
    
    console.log('=== DETAILED LOGIN DEBUG ===')
    console.log('Email:', email)
    console.log('User Agent:', userAgent)
    console.log('Timestamp:', timestamp)
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
    
    // Test direct Supabase connection
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    console.log('Testing direct Supabase connection...')
    
    // Test 1: Simple auth test
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('Direct Supabase Result:', {
      success: !authError,
      error: authError?.message,
      errorName: authError?.name,
      errorStatus: authError?.status,
      userId: authData?.user?.id,
      sessionExists: !!authData?.session
    })
    
    if (authError) {
      return NextResponse.json({
        success: false,
        step: 'direct_supabase_auth',
        error: authError.message,
        errorName: authError.name,
        errorStatus: authError.status,
        errorDetails: authError,
        debug: {
          email,
          timestamp,
          environment: {
            NODE_ENV: process.env.NODE_ENV,
            hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          }
        }
      })
    }
    
    // Test 2: Role check
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user?.id)
      .single()
    
    console.log('Role Check Result:', {
      success: !roleError,
      error: roleError?.message,
      role: roleData?.role,
      isAdmin: roleData?.role === 'admin'
    })
    
    return NextResponse.json({
      success: true,
      step: 'complete',
      authSuccess: true,
      roleCheckSuccess: !roleError,
      isAdmin: roleData?.role === 'admin',
      debug: {
        email,
        userId: authData.user?.id,
        role: roleData?.role,
        timestamp,
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        }
      }
    })
    
  } catch (error: any) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      success: false,
      step: 'debug_endpoint_error',
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
    message: 'Detailed Login Debug Endpoint',
    usage: 'POST with { email, password, userAgent, timestamp }',
    purpose: 'Diagnose exact cause of login interruption errors',
    tests: [
      'Environment variable verification',
      'Direct Supabase connection test',
      'Authentication attempt analysis',
      'Role verification check',
      'Detailed error reporting'
    ]
  })
}
