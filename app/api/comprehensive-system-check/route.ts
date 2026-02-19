import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

interface CheckResults {
  environment?: {
    supabase: {
      NEXT_PUBLIC_SUPABASE_URL: boolean
      NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean
      SUPABASE_SERVICE_ROLE_KEY: boolean
    }
    smtp: {
      SMTP_HOST: boolean
      SMTP_PORT: boolean
      SMTP_USER: boolean
      SMTP_PASS: boolean
    }
    status: string
  }
  supabase_connection?: {
    status: string
    error?: string
    can_access_appointments?: boolean
  }
  smtp_connection?: {
    status: string
    error?: string
    message_id?: string
  }
  database_schema?: Record<string, any>
  admin_user?: {
    status: string
    admin_user_id?: string | null
    error?: string
  }
}

interface SystemResults {
  timestamp: string
  status: string
  checks: CheckResults
  overall_status?: string
}

export async function GET() {
  const results: SystemResults = {
    timestamp: new Date().toISOString(),
    status: '🔍 COMPREHENSIVE SYSTEM DIAGNOSTIC',
    checks: {}
  }

  try {
    // 1. Environment Variables Check
    results.checks.environment = {
      supabase: {
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      },
      smtp: {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_PORT: !!process.env.SMTP_PORT,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS
      },
      status: Object.values({...results.checks.environment!.supabase, ...results.checks.environment!.smtp}).every(Boolean) ? '✅ All variables present' : '❌ Missing variables'
    }

    // 2. Supabase Connection Test
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )
        
        const { data, error } = await supabase.from('appointments').select('count').limit(1)
        
        results.checks.supabase_connection = {
          status: !error ? '✅ Connected' : '❌ Failed',
          error: error?.message,
          can_access_appointments: !error
        }
      } catch (err: any) {
        results.checks.supabase_connection = {
          status: '❌ Exception',
          error: err.message
        }
      }
    } else {
      results.checks.supabase_connection = {
        status: '❌ Cannot test - missing environment variables'
      }
    }

    // 3. SMTP Connection Test
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const emailTest = await sendEmail({
          to: process.env.SMTP_USER, // Send test to self
          subject: '🧪 System Test - MindSpring Path',
          html: `
            <h2>System Test Email</h2>
            <p>This is an automated test of the email system.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Status:</strong> Email system is working correctly.</p>
          `
        })
        
        results.checks.smtp_connection = {
          status: emailTest.success ? '✅ Connected' : '❌ Failed',
          error: emailTest.error,
          message_id: emailTest.messageId
        }
      } catch (err: any) {
        results.checks.smtp_connection = {
          status: '❌ Exception',
          error: err.message
        }
      }
    } else {
      results.checks.smtp_connection = {
        status: '❌ Cannot test - missing SMTP environment variables'
      }
    }

    // 4. Database Schema Check
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const tables = ['appointments', 'user_roles', 'availability_slots', 'contact_messages']
      const schemaCheck: Record<string, any> = {}
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase.from(table).select('count').limit(1)
          schemaCheck[table] = {
            status: !error ? '✅ Accessible' : '❌ Failed',
            error: error?.message
          }
        } catch (err: any) {
          schemaCheck[table] = {
            status: '❌ Exception',
            error: err.message
          }
        }
      }
      
      results.checks.database_schema = schemaCheck
    } catch (err: any) {
      results.checks.database_schema = {
        status: '❌ Cannot test',
        error: err.message
      }
    }

    // 5. Admin User Check
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      const { data: adminData, error: adminError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin')
        .single()
      
      results.checks.admin_user = {
        status: !adminError && adminData ? '✅ Admin user exists' : '❌ No admin user',
        admin_user_id: adminData?.user_id || null,
        error: adminError?.message
      }
    } catch (err: any) {
      results.checks.admin_user = {
        status: '❌ Exception',
        error: err.message
      }
    }

    // 6. Overall System Status
    const allChecks = [
      results.checks.environment?.status,
      results.checks.supabase_connection?.status,
      results.checks.smtp_connection?.status,
      results.checks.admin_user?.status
    ]
    
    results.overall_status = allChecks.every(check => check?.includes('✅')) ? '✅ All systems operational' : '⚠️ Some issues detected'

    return NextResponse.json(results)

  } catch (error: any) {
    return NextResponse.json({
      error: 'System diagnostic failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
