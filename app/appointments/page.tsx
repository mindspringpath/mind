'use client'

import { useEffect, useState } from 'react'
import { supabase, getCurrentUser } from '@/lib/auth-helpers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RescheduleModal from '@/components/booking/RescheduleModal'

export default function AppointmentsPage() {
  const [user, setUser] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reschedule, setReschedule] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)

      const currentUser = await getCurrentUser()

      if (!currentUser) {
        setUser(null)
        setAppointments([])
        setLoading(false)
        return
      }

      setUser(currentUser)

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('date', { ascending: true })
        .order('time', { ascending: true })

      if (!error && data) setAppointments(data)

      setLoading(false)
    }

    loadData()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadData()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="text-softwhite/80">Loading your appointments...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-center px-4">
        <h1 className="text-3xl font-bold text-softwhite mb-4">You are not logged in</h1>
        <p className="text-softwhite/70 mb-6">Please log in to view your booked sessions.</p>
        <Link href="/login">
          <Button className="btn-mindspring-primary px-6 py-3">Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-softwhite mb-8">My Appointments</h1>

        {appointments.length === 0 && (
          <div className="bg-slate/20 border border-graphite rounded-xl p-8 text-center">
            <p className="text-softwhite/80 mb-6">You have no booked sessions yet.</p>
            <Link href="/booking">
              <Button className="btn-mindspring-primary px-6 py-3">Book a Session</Button>
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-slate/20 border border-graphite rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-softwhite">{appt.session_type}</h2>

                <span
                  className={
                    'text-sm px-3 py-1 rounded-full ' +
                    (appt.status === 'confirmed'
                      ? 'bg-emerald-600/30 text-emerald-300'
                      : appt.status === 'cancelled'
                      ? 'bg-red-600/30 text-red-300'
                      : 'bg-amber-600/30 text-amber-200')
                  }
                >
                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                </span>
              </div>

              <p className="text-softwhite/80">
                <strong>Date:</strong> {appt.date}
              </p>
              <p className="text-softwhite/80">
                <strong>Time:</strong> {appt.time}
              </p>

              {appt.notes && (
                <p className="text-softwhite/70 mt-2">
                  <strong>Notes:</strong> {appt.notes}
                </p>
              )}

              {appt.status !== 'cancelled' && (
                <div className="mt-4 flex gap-3">
                  <Button
                    variant="outline"
                    className="btn-mindspring-outline"
                    onClick={async () => {
                      const ok = confirm('Cancel this appointment?')
                      if (!ok) return

                      const { error } = await supabase
                        .from('appointments')
                        .update({
                          status: 'cancelled',
                          updated_at: new Date().toISOString()
                        })
                        .eq('id', appt.id)

                      if (error) {
                        console.error(error)
                        alert('Could not cancel appointment.')
                        return
                      }

                      // Email client
                      await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    kind: 'appointment_cancelled',
    appointment: appt
  })
})


                      // Email admin
                      await sendEmail({
                        to: 'info@mindspringpath.com.au',
                        subject: 'Appointment Cancelled',
                        html: `
                          <h2>Appointment Cancelled</h2>
                          <p><strong>Name:</strong> ${appt.full_name}</p>
                          <p><strong>Email:</strong> ${appt.email}</p>
                          <p><strong>Date:</strong> ${appt.date}</p>
                          <p><strong>Time:</strong> ${appt.time}</p>
                          <p><strong>Session:</strong> ${appt.session_type}</p>
                        `
                      })

                      setAppointments((prev) =>
                        prev.map((a) => (a.id === appt.id ? { ...a, status: 'cancelled' } : a))
                      )
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="btn-mindspring-primary"
                    onClick={() => setReschedule(appt)}
                  >
                    Reschedule
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {reschedule && (
        <RescheduleModal
          appt={reschedule}
          onClose={() => setReschedule(null)}
          onUpdated={(updated: any) =>
            setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
          }
        />
      )}
    </div>
  )
}
