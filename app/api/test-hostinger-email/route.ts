import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { testEmail } = await req.json()
    
    if (!testEmail) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Test email address is required' 
      }, { status: 400 })
    }

    console.log('Testing Hostinger email configuration...')
    
    // Test email with Hostinger
    const result = await sendEmail({
      to: testEmail,
      subject: 'MindSpring Path - Hostinger Email Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; margin-bottom: 20px;">Hostinger Email Test Successful!</h2>
          <p style="color: #666; line-height: 1.6;">
            This is a test email to verify that your Hostinger SMTP configuration is working correctly.
          </p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Test Details:</strong></p>
            <p>• SMTP Host: ${process.env.SMTP_HOST}</p>
            <p>• SMTP Port: ${process.env.SMTP_PORT}</p>
            <p>• From Email: ${process.env.SMTP_USER}</p>
            <p>• Sent At: ${new Date().toLocaleString('en-AU')}</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you received this email, your Hostinger email configuration is working properly!
          </p>
        </div>
      `
    })

    if (result.success) {
      console.log('Hostinger email test successful:', result.messageId)
      return NextResponse.json({ 
        ok: true, 
        message: 'Test email sent successfully',
        messageId: result.messageId,
        details: {
          smtpHost: process.env.SMTP_HOST,
          smtpPort: process.env.SMTP_PORT,
          fromEmail: process.env.SMTP_USER,
          sentTo: testEmail
        }
      })
    } else {
      console.error('Hostinger email test failed:', result.error)
      return NextResponse.json({ 
        ok: false, 
        error: 'Failed to send test email',
        details: result.error 
      }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Hostinger email test exception:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Email test failed',
      details: error?.message || 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Hostinger Email Test API',
    usage: 'POST to this endpoint with { "testEmail": "your-email@example.com" }',
    config: {
      smtpHost: process.env.SMTP_HOST ? '✓ Configured' : '✗ Missing',
      smtpPort: process.env.SMTP_PORT ? '✓ Configured' : '✗ Missing',
      smtpUser: process.env.SMTP_USER ? '✓ Configured' : '✗ Missing',
      smtpPass: process.env.SMTP_PASS ? '✓ Configured' : '✗ Missing'
    }
  })
}
