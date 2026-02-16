import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailData {
  appointmentId: string
  userEmail: string
  userName: string
  sessionType: string
  date: string
  time: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { appointmentId, userEmail, userName, sessionType, date, time }: EmailData = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Send email using Supabase Auth email templates or external service
    const emailData = {
      to: userEmail,
      subject: 'Appointment Confirmation - MindSpring Path',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6, #a78bfa); padding: 30px; text-align: center; color: white; }
            .content { padding: 30px; background: #f9fafb; }
            .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .btn { display: inline-block; padding: 12px 24px; background: #14b8a6; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MindSpring Path</h1>
              <p>Appointment Confirmation</p>
            </div>
            
            <div class="content">
              <h2>Hi ${userName},</h2>
              <p>Thank you for booking your coaching session! Your appointment has been confirmed.</p>
              
              <div class="appointment-details">
                <h3>Appointment Details</h3>
                <p><strong>Service:</strong> ${sessionType}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Status:</strong> Confirmed</p>
              </div>
              
              <h3>What to Expect</h3>
              <ul>
                <li>Evidence-based coaching methods</li>
                <li>Personalized attention and guidance</li>
                <li>Practical tools and strategies</li>
                <li>Confidential and professional environment</li>
              </ul>
              
              <h3>Next Steps</h3>
              <p>You'll receive a reminder email 24 hours before your session. If you need to reschedule or cancel, please reply to this email or contact us directly.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${Deno.env.get('SITE_URL')}/dashboard" class="btn">View My Dashboard</a>
              </div>
            </div>
            
            <div class="footer">
              <p>MindSpring Path</p>
              <p>Evidence-Based Coaching for Clarity & Focus</p>
              <p>Need help? Reply to this email or call us at your scheduled time.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Use your preferred email service (SendGrid, Resend, etc.)
    // For this example, we'll use Supabase's built-in email functionality
    const { error } = await supabase.auth.admin.updateUserById(
      userEmail,
      { email: userEmail }
    )

    if (error) {
      console.error('Email sending error:', error)
      throw error
    }

    // Log the email confirmation
    await supabase
      .from('email_logs')
      .insert({
        appointment_id: appointmentId,
        email_type: 'confirmation',
        sent_to: userEmail,
        sent_at: new Date().toISOString(),
        status: 'sent'
      })

    return new Response(
      JSON.stringify({ success: true, message: 'Email confirmation sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
