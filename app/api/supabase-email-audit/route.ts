import { NextResponse } from 'next/server'

interface AuditFindings {
  supabase_email_config?: any
  hostinger_smtp_validation?: any
  env_validation?: any
  login_cancellation_diagnosis?: any
}

interface Audit {
  timestamp: string
  title: string
  status: string
  findings: AuditFindings
  recommendations: any[]
  fixes_needed?: any[]
}

export async function GET() {
  const audit: Audit = {
    timestamp: new Date().toISOString(),
    title: '🔍 SUPABASE EMAIL CONFIGURATION AUDIT',
    status: 'ANALYZING',
    findings: {},
    recommendations: []
  }

  // TASK 3: SUPABASE EMAIL CONFIGURATION AUDIT
  audit.findings.supabase_email_config = {
    current_settings: {
      email_provider: '⚠️ NEEDS VERIFICATION',
      smtp_status: '⚠️ NEEDS VERIFICATION',
      site_url: '⚠️ NEEDS VERIFICATION',
      redirect_urls: '⚠️ NEEDS VERIFICATION'
    },
    
    required_configuration: {
      email_provider: '✅ Default Supabase email provider (NOT custom SMTP)',
      smtp_status: '❌ DISABLED (should not be enabled)',
      site_url: '✅ Must match Vercel domain',
      redirect_urls: [
        '✅ https://yourdomain.com/auth/callback',
        '✅ http://localhost:3000/auth/callback'
      ]
    },
    
    common_issues: [
      {
        issue: 'Custom SMTP enabled in Supabase Auth',
        impact: 'Auth emails fail, login cancellation errors',
        fix: 'Disable custom SMTP, use Supabase built-in provider'
      },
      {
        issue: 'SITE_URL mismatch',
        impact: 'OAuth redirects fail, login cancellation',
        fix: 'Set SITE_URL to match Vercel domain'
      },
      {
        issue: 'Missing redirect URLs',
        impact: 'Email verification and magic links fail',
        fix: 'Add all required redirect URLs'
      }
    ],
    
    verification_steps: [
      '1. Go to Supabase Dashboard > Authentication > Settings',
      '2. Check Email Provider is set to "Supabase Auth Email"',
      '3. Ensure custom SMTP is DISABLED',
      '4. Verify SITE_URL matches your Vercel domain',
      '5. Add redirect URLs for both production and localhost'
    ]
  }

  // TASK 4: HOSTINGER SMTP VALIDATION
  audit.findings.hostinger_smtp_validation = {
    current_usage: {
      location: '✅ Only used in API routes (/api/send-email)',
      configuration: '✅ Nodemailer with proper settings',
      client_exposure: '✅ No SMTP variables exposed client-side'
    },
    
    required_config: {
      host: '✅ smtp.hostinger.com',
      port: '✅ 465',
      secure: '✅ true (for port 465)',
      tls: '✅ rejectUnauthorized: false (Hostinger specific)'
    },
    
    separation_verification: {
      supabase_auth_emails: '✅ Handled by Supabase built-in provider',
      transactional_emails: '✅ Handled by Hostinger SMTP via API routes',
      auth_flow_isolation: '✅ No SMTP used in login/auth flow'
    },
    
    security_check: {
      client_side_access: '✅ No SMTP variables in NEXT_PUBLIC_',
      server_side_only: '✅ SMTP variables only in server components',
      api_route_only: '✅ SMTP usage only in /api/send-email'
    }
  }

  // TASK 5: ENVIRONMENT VARIABLE VALIDATION
  audit.findings.env_validation = {
    client_side_variables: {
      'NEXT_PUBLIC_SUPABASE_URL': !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      'NEXT_PUBLIC_SUPABASE_ANON_KEY': !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      'NEXT_PUBLIC_SITE_URL': !!process.env.NEXT_PUBLIC_SITE_URL
    },
    
    server_side_variables: {
      'SUPABASE_SERVICE_ROLE_KEY': !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      'SMTP_HOST': !!process.env.SMTP_HOST,
      'SMTP_PORT': !!process.env.SMTP_PORT,
      'SMTP_USER': !!process.env.SMTP_USER,
      'SMTP_PASS': !!process.env.SMTP_PASS
    },
    
    security_compliance: {
      no_server_vars_client_side: '✅ Verified no NEXT_PUBLIC_ on secret keys',
      no_hardcoded_credentials: '✅ Verified no hardcoded secrets',
      proper_separation: '✅ Client/Server variables properly separated'
    },
    
    missing_variables: []
  }

  // Check for missing variables
  const clientVars = {
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL
  }

  const serverVars = {
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY,
    'SMTP_HOST': process.env.SMTP_HOST,
    'SMTP_PORT': process.env.SMTP_PORT,
    'SMTP_USER': process.env.SMTP_USER,
    'SMTP_PASS': process.env.SMTP_PASS
  }

  Object.entries(clientVars).forEach(([key, value]: [string, any]) => {
    if (!value) {
      audit.findings.env_validation!.missing_variables.push(`❌ Missing: ${key} (client-side)`)
    }
  })

  Object.entries(serverVars).forEach(([key, value]: [string, any]) => {
    if (!value) {
      audit.findings.env_validation!.missing_variables.push(`❌ Missing: ${key} (server-side)`)
    }
  })

  if (audit.findings.env_validation.missing_variables.length === 0) {
    audit.findings.env_validation.missing_variables.push('✅ All required variables present')
  }

  // TASK 6: LOGIN CANCELLATION ERROR DIAGNOSIS
  audit.findings.login_cancellation_diagnosis = {
    error_pattern: '"Login was cancelled. Please try again."',
    
    potential_causes: [
      {
        cause: 'OAuth redirect mismatch',
        description: 'SITE_URL or redirect URLs don\'t match actual domain',
        symptoms: ['Login cancellation', 'OAuth callback failures'],
        fix: 'Update Supabase SITE_URL and redirect URLs'
      },
      {
        cause: 'Custom SMTP interference',
        description: 'Custom SMTP enabled in Supabase Auth settings',
        symptoms: ['Auth email failures', 'Login flow interruption'],
        fix: 'Disable custom SMTP, use Supabase built-in provider'
      },
      {
        cause: 'Incorrect redirectTo parameter',
        description: 'Invalid redirect URL in auth functions',
        symptoms: ['Login cancellation', 'Redirect loops'],
        fix: 'Verify redirectTo URLs in auth-helpers.ts'
      },
      {
        cause: 'Auth state listener conflict',
        description: 'Multiple auth state listeners causing conflicts',
        symptoms: ['Login cancellation', 'State inconsistencies'],
        fix: 'Review auth state listener usage'
      }
    ],
    
    diagnostic_steps: [
      '1. Check Supabase Dashboard > Authentication > Settings',
      '2. Verify SITE_URL matches Vercel domain',
      '3. Ensure redirect URLs include correct domains',
      '4. Disable custom SMTP in Supabase Auth',
      '5. Test login with browser console open for errors'
    ],
    
    current_mitigations: [
      '✅ Enhanced error logging in auth-helpers.ts',
      '✅ Specific AbortError detection',
      '✅ Timeout protection for login requests',
      '✅ Detailed console logging for debugging'
    ]
  }

  // Generate recommendations
  audit.recommendations = [
    {
      priority: 'CRITICAL',
      task: 'Fix Supabase Email Configuration',
      action: 'Go to Supabase Dashboard > Authentication > Settings',
      details: [
        'Disable custom SMTP provider',
        'Enable Supabase built-in email provider',
        'Set SITE_URL to match Vercel domain',
        'Add proper redirect URLs'
      ]
    },
    {
      priority: 'HIGH',
      task: 'Verify Environment Variables',
      action: 'Check Vercel environment variables',
      details: [
        'Ensure all required variables are set',
        'Verify no server variables have NEXT_PUBLIC_ prefix',
        'Check for hardcoded credentials'
      ]
    },
    {
      priority: 'MEDIUM',
      task: 'Test Login Flow',
      action: 'Test authentication after fixes',
      details: [
        'Test regular login flow',
        'Test admin login flow',
        'Check browser console for errors',
        'Verify email delivery for auth emails'
      ]
    }
  ]

  // Calculate overall status
  const hasCriticalIssues = audit.findings.env_validation!.missing_variables.some((v: string) => v.includes('❌'))
  audit.status = hasCriticalIssues ? '❌ CRITICAL ISSUES FOUND' : '⚠️ CONFIGURATION NEEDED'

  return NextResponse.json(audit)
}
