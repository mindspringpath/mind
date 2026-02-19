import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('=== BASIC SUPABASE CONNECTION TEST ===')
    
    // Check environment variables
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NODE_ENV: process.env.NODE_ENV
    }
    
    console.log('Environment check:', envCheck)
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Missing required Supabase environment variables',
        envCheck,
        fix: 'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel'
      }, { status: 500 })
    }
    
    // Test basic Supabase connection
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    console.log('Testing Supabase connection...')
    
    // Test 1: Basic connection
    const { data, error } = await supabase.from('user_roles').select('count').limit(1)
    
    console.log('Connection test result:', { success: !error, error: error?.message })
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Supabase connection failed',
        details: error.message,
        envCheck,
        fix: 'Check Supabase URL, anon key, and database accessibility'
      }, { status: 500 })
    }
    
    // Test 2: Check if user_roles table exists and has data
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, role')
      .limit(5)
    
    console.log('User roles test:', { success: !rolesError, count: rolesData?.length })
    
    if (rolesError) {
      return NextResponse.json({
        success: false,
        error: 'User roles table access failed',
        details: rolesError.message,
        envCheck,
        fix: 'Check if user_roles table exists and RLS policies allow access'
      }, { status: 500 })
    }
    
    // Test 3: Check for admin user
    const { data: adminData, error: adminError } = await supabase
      .from('user_roles')
      .select('user_id, role')
      .eq('role', 'admin')
      .single()
    
    console.log('Admin check result:', { 
      success: !adminError, 
      hasAdmin: !!adminData,
      adminUserId: adminData?.user_id 
    })
    
    return NextResponse.json({
      success: true,
      connection: '✅ Supabase connection working',
      database: '✅ Database accessible',
      user_roles: {
        table_exists: '✅ Table exists and accessible',
        has_data: rolesData && rolesData.length > 0 ? '✅ Has data' : '⚠️ No data',
        sample_data: rolesData?.slice(0, 3) || []
      },
      admin_user: {
        exists: !!adminData,
        user_id: adminData?.user_id || '❌ No admin user found',
        fix: !adminData ? 'Create admin entry in user_roles table' : '✅ Admin user exists'
      },
      envCheck,
      next_steps: [
        'If admin user missing: Create entry in user_roles table',
        'If connection failed: Check Supabase URL and keys',
        'If table access failed: Check RLS policies'
      ]
    })
    
  } catch (error: any) {
    console.error('Basic connection test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Unexpected error during connection test',
      details: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
