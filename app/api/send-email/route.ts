import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { kind, appointment, data, to, subject, html } = body

    console.log('Email API: Request received:', { kind, to, subject })

    // Handle direct email sending (from auth-helpers)
    if (to && subject && html) {
      try {
        await sendEmail({
          to,
          subject,
          html
        })
        console.log('Email API: Direct email sent successfully')
        return NextResponse.json({ ok: true })
      } catch (emailError: any) {
        console.error('Email API: Direct email failed:', emailError)
        return NextResponse.json({ ok: false, error: emailError?.message || 'Email sending failed' }, { status: 500 })
      }
    }

    if (!kind) {
      return NextResponse.json({ ok: false, error: 'Missing kind' }, { status: 400 })
    }

    // ✅ Booking confirmation emails
    if (kind === 'booking_created') {
      if (!appointment) {
        return NextResponse.json({ ok: false, error: 'Missing appointment data' }, { status: 400 })
      }

      // client
      if (appointment.email) {
        await sendEmail({
          to: appointment.email,
          subject: 'MindSpring Path — Booking Confirmed',
          html: `
            <h2>Your booking is confirmed</h2>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Session Type:</strong> ${appointment.session_type}</p>
            <br/>
            <p>Thank you,<br/>MindSpring Path</p>
          `
        })
      }

      // admin
      await sendEmail({
        to: 'info@mindspringpath.com.au',
        subject: 'New Booking Received',
        html: `
          <h2>New booking</h2>
          <p><strong>Name:</strong> ${appointment.full_name}</p>
          <p><strong>Email:</strong> ${appointment.email}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Session:</strong> ${appointment.session_type}</p>
        `
      })
    }

    // ✅ Contact form submissions
    if (kind === 'contact_received') {
      if (!data) {
        return NextResponse.json({ ok: false, error: 'Missing contact data' }, { status: 400 })
      }

      await sendEmail({
        to: 'info@mindspringpath.com.au',
        subject: 'New Contact Form Submission',
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          <p><em>Received: ${new Date().toLocaleDateString('en-AU')}</em></p>
        `
      })
    }

    // ✅ Cancellation emails (for your appointments page)
    if (kind === 'appointment_cancelled') {
      if (!appointment) {
        return NextResponse.json({ ok: false, error: 'Missing appointment data' }, { status: 400 })
      }

      if (appointment.email) {
        await sendEmail({
          to: appointment.email,
          subject: 'MindSpring Path — Appointment Cancelled',
          html: `
            <h2>Your appointment has been cancelled</h2>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Session Type:</strong> ${appointment.session_type}</p>
            <br/>
            <p>You can book again anytime.</p>
            <p>MindSpring Path</p>
          `
        })
      }

      await sendEmail({
        to: 'info@mindspringpath.com.au',
        subject: 'Appointment Cancelled',
        html: `
          <h2>Appointment Cancelled</h2>
          <p><strong>Name:</strong> ${appointment.full_name}</p>
          <p><strong>Email:</strong> ${appointment.email}</p>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Session:</strong> ${appointment.session_type}</p>
        `
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Email API error:', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
