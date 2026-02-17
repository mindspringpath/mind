'use client'

import { useState } from 'react'
import { supabase } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { sendEmail } from '@/lib/email'   // ⭐ ADD THIS

export default function RescheduleModal({ appt, onClose, onUpdated }) {
  const [date, setDate] = useState(appt.date)
  const [time, setTime] = useState(appt.time)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)

    const oldDate = appt.date
    const oldTime = appt.time

    const { error } = await supabase
      .from('appointments')
      .update({
        date,
        time,
        updated_at: new Date().toISOString()
      })
      .eq('id', appt.id)

    setSaving(false)

    if (error) {
      alert('Could not reschedule appointment.')
      return
    }

    // ⭐ SEND RESCHEDULE EMAIL TO CLIENT
    await sendEmail({
      to: appt.email,
      subject: 'Your MindSpring Path Appointment Has Been Rescheduled',
      html: `
        <h2>Your appointment has been rescheduled</h2>
        <p><strong>Old Date:</strong> ${oldDate}</p>
        <p><strong>Old Time:</strong> ${oldTime}</p>
        <br/>
        <p><strong>New Date:</strong> ${date}</p>
        <p><strong>New Time:</strong> ${time}</p>
        <p><strong>Session Type:</strong> ${appt.session_type}</p>
        <br/>
        <p>If you need to adjust again, you can reschedule anytime.</p>
        <p>MindSpring Path</p>
      `
    })

    // ⭐ SEND ADMIN NOTIFICATION
    await sendEmail({
      to: 'info@mindspringpath.com.au',
      subject: 'Appointment Rescheduled',
      html: `
        <h2>Appointment Rescheduled</h2>
        <p><strong>Name:</strong> ${appt.full_name}</p>
        <p><strong>Email:</strong> ${appt.email}</p>
        <p><strong>Old Date:</strong> ${oldDate}</p>
        <p><strong>Old Time:</strong> ${oldTime}</p>
        <p><strong>New Date:</strong> ${date}</p>
        <p><strong>New Time:</strong> ${time}</p>
        <p><strong>Session:</strong> ${appt.session_type}</p>
      `
    })

    onUpdated({ ...appt, date, time })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-charcoal border border-graphite rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-softwhite mb-4">
          Reschedule Appointment
        </h2>

        <label className="block text-softwhite/80 mb-1">New Date</label>
        <input
          type="date"
          className="input-mindspring mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block text-softwhite/80 mb-1">New Time</label>
        <input
          type="time"
          className="input-mindspring mb-6"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="btn-mindspring-outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="btn-mindspring-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}