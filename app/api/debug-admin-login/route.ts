import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log('Debug: Testing admin login for:', email)
    
    // Create a direct Supabase client for testing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Missing Supabase configuration',
        supabaseUrl: !!supabaseUrl,
        supabaseAnonKey: !!supabaseAnonKey
      }, { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test 1: Direct sign in
    console.log('Debug: Attempting direct sign in...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    console.log('Debug: Sign in result:', { 
      success: !signInError, 
      error: signInError?.message,
      userId: signInData.user?.id 
    })
    
    if (signInError) {
      return NextResponse.json({
        step: 'sign_in',
        success: false,
        error: signInError.message,
        errorDetails: signInError,
        debug: {
          email,
          timestamp: new Date().toISOString()
        }
      })
    }
    
    // Test 2: Check user roles
    console.log('Debug: Checking user roles...')
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', signInData.user?.id)
      .single()
    
    console.log('Debug: Role check result:', { 
      success: !roleError, 
      error: roleError?.message,
      role: roleData?.role 
    })
    
    if (roleError) {
      return NextResponse.json({
        step: 'role_check',
        signInSuccess: true,
        roleCheckSuccess: false,
        error: roleError.message,
        errorDetails: roleError,
        debug: {
          userId: signInData.user?.id,
          timestamp: new Date().toISOString()
        }
      })
    }
    
    // Test 3: Verify admin status
    const isAdmin = roleData?.role === 'admin'
    
    console.log('Debug: Final admin status:', isAdmin)
    
    return NextResponse.json({
      step: 'complete',
      success: true,
      signInSuccess: true,
      roleCheckSuccess: true,
      isAdmin,
      debug: {
        email,
        userId: signInData.user?.id,
        role: roleData?.role,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error: any) {
    console.error('Debug: Unexpected error:', error)
    return NextResponse.json({
      step: 'unexpected_error',
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
    message: 'Admin Login Debug Endpoint',
    usage: 'POST with { email, password } to debug admin login issues',
    tests: [
      'Direct Supabase sign in',
      'User role lookup',
      'Admin status verification'
    ]
  })
}
