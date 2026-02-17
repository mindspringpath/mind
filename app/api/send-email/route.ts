import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { kind, appointment } = body

    if (!kind || !appointment) {
      return NextResponse.json({ ok: false, error: 'Missing payload' }, { status: 400 })
    }

    // ✅ Booking confirmation emails
    if (kind === 'booking_created') {
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

    // ✅ Cancellation emails (for your appointments page)
    if (kind === 'appointment_cancelled') {
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
    console.error(err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
