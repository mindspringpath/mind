import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .limit(1)

    if (error) {
      console.error('Auth test: Database error:', error)
      return NextResponse.json({ 
        ok: false, 
        error: 'Database connection failed',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      ok: true, 
      message: 'Auth system is working',
      supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Configured' : '✗ Missing',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Configured' : '✗ Missing',
        serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Configured' : '✗ Missing'
      },
      database: {
        connected: true,
        sampleData: data?.length || 0
      }
    })

  } catch (error: any) {
    console.error('Auth test error:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Auth system test failed',
      details: error?.message || 'Unknown error' 
    }, { status: 500 })
  }
}
