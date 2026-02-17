import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { kind, appointment } = body

    if (!appointment?.email) {
      return NextResponse.json({ ok: false, error: 'Missing appointment data' }, { status: 400 })
    }

    if (kind === 'appointment_cancelled') {
      // Email client
      await sendEmail({
        to: appointment.email,
        subject: 'Your MindSpring Path Appointment Has Been Cancelled',
        html: `
          <h2>Your appointment has been cancelled</h2>
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Session Type:</strong> ${appointment.session_type}</p>
          <br/>
          <p>If this was a mistake, you can book again anytime.</p>
          <p>MindSpring Path</p>
        `
      })

      // Email admin
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
