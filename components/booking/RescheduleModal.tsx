'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/auth-helpers'

type Props = {
  appt: any
  onClose: () => void
  onUpdated: (updated: any) => void
}

export default function RescheduleModal({ appt, onClose, onUpdated }: Props) {
  const [date, setDate] = useState(appt?.date ?? '')
  const [time, setTime] = useState(appt?.time ?? '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)

    const { data, error } = await supabase
      .from('appointments')
      .update({
        date,
        time,
        updated_at: new Date().toISOString()
      })
      .eq('id', appt.id)
      .select('*')
      .single()

    setSaving(false)

    if (error) {
      console.error(error)
      alert('Could not reschedule appointment.')
      return
    }

    onUpdated(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-graphite bg-charcoal p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-softwhite mb-4">Reschedule</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-softwhite/70 mb-1">Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md bg-graphite/40 border border-graphite px-3 py-2 text-softwhite"
              placeholder="YYYY-MM-DD"
            />
          </div>

          <div>
            <label className="block text-softwhite/70 mb-1">Time</label>
            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-md bg-graphite/40 border border-graphite px-3 py-2 text-softwhite"
              placeholder="HH:MM"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <Button variant="outline" className="btn-mindspring-outline" onClick={onClose}>
            Close
          </Button>
          <Button className="btn-mindspring-primary" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}
