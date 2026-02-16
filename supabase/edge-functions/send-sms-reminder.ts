import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SMSData {
  appointmentId: string
  phoneNumber: string
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
    const { appointmentId, phoneNumber, userName, sessionType, date, time }: SMSData = await req.json()

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Format phone number (remove spaces, dashes, etc.)
    const formattedPhone = phoneNumber.replace(/[\s\-\(\)]/g, '')
    
    // SMS message template
    const smsMessage = `Hi ${userName}, this is a reminder for your MindSpring Path session tomorrow at ${time}. Your ${sessionType} is scheduled for ${date}. We look forward to seeing you! Reply STOP to unsubscribe.`

    // Use a free SMS API service (Twilio, ClickSend, etc.)
    // For this example, we'll use a webhook-based approach
    const smsPayload = {
      to: formattedPhone,
      message: smsMessage,
      from: 'MindSpring',
      // Add your SMS provider specific fields here
    }

    // Example using a generic webhook (replace with your SMS provider)
    const smsResponse = await fetch('https://api.sms-service.com/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SMS_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(smsPayload)
    })

    if (!smsResponse.ok) {
      throw new Error(`SMS API error: ${smsResponse.statusText}`)
    }

    const smsResult = await smsResponse.json()

    // Log the SMS reminder
    await supabase
      .from('sms_logs')
      .insert({
        appointment_id: appointmentId,
        phone_number: formattedPhone,
        message: smsMessage,
        sent_at: new Date().toISOString(),
        status: 'sent',
        provider_response: smsResult
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS reminder sent successfully',
        smsId: smsResult.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('SMS Edge function error:', error)
    
    // Log failed SMS attempt
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      await supabase
        .from('sms_logs')
        .insert({
          appointment_id: 'unknown',
          phone_number: 'unknown',
          message: 'Failed to send SMS reminder',
          sent_at: new Date().toISOString(),
          status: 'failed',
          error_message: error.message
        })
    } catch (logError) {
      console.error('Failed to log SMS error:', logError)
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
