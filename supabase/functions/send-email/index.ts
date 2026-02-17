// supabase/functions/send-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

serve(async (req) => {
  try {
    const { to, subject, html } = await req.json()

    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!)

    const { error } = await resend.emails.send({
      from: "MindSpring Path <no-reply@mindspringpath.com>",
      to,
      subject,
      html
    })

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})