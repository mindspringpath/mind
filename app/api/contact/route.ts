export const runtime = 'nodejs'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create a Supabase client with service role key to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
}

const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function POST(req: Request) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Database not configured' 
      }, { status: 500 })
    }

    const body = await req.json()
    const { fullName, email, phone, message } = body

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Missing required fields: fullName, email, message' 
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    console.log('Contact API: Submitting message from:', email)

    // Insert contact message using service role key to bypass RLS
    const { error } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        full_name: fullName,
        email: email,
        phone: phone || null,
        message: message,
        status: 'new',
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Contact API: Database error:', error)
      return NextResponse.json({ 
        ok: false, 
        error: 'Failed to save message to database',
        details: error.message 
      }, { status: 500 })
    }

    console.log('Contact API: Message saved successfully')

    // Send email notification
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kind: 'contact_received',
          data: {
            fullName,
            email,
            phone,
            message
          }
        })
      })

      if (!emailResponse.ok) {
        const emailError = await emailResponse.text()
        console.error('Contact API: Email notification failed:', emailError)
        // Don't fail the request if email fails
        return NextResponse.json({ 
          ok: true, 
          message: 'Message saved successfully (email notification failed)',
          emailError: emailError
        })
      }

      console.log('Contact API: Email notification sent successfully')
    } catch (emailError: any) {
      console.error('Contact API: Email notification exception:', emailError)
      // Don't fail the request if email fails
      return NextResponse.json({ 
        ok: true, 
        message: 'Message saved successfully (email notification failed)',
        emailError: emailError?.message || 'Email service error'
      })
    }

    return NextResponse.json({ 
      ok: true, 
      message: 'Message sent successfully' 
    })

  } catch (error: any) {
    console.error('Contact API: Unexpected error:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'Server error',
      details: error?.message || 'Unknown error' 
    }, { status: 500 })
  }
}
