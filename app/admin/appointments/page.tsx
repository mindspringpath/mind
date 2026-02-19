'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import RescheduleModal from '@/components/booking/RescheduleModal'
import AvailabilityManager from '@/components/admin/AvailabilityManager'

function SystemPanel() {
  const [dbStatus, setDbStatus] = useState<'unknown' | 'online' | 'offline'>('unknown')
  const [emailStatus, setEmailStatus] = useState<'unknown' | 'ok' | 'fail'>('unknown')

  const testDatabase = async () => {
    try {
      const res = await fetch('/api/test-db')
      setDbStatus(res.ok ? 'online' : 'offline')
    } catch {
      setDbStatus('offline')
    }
  }

  const testEmail = async () => {
    try {
      const res = await fetch('/api/test-email')
      setEmailStatus(res.ok ? 'ok' : 'fail')
    } catch {
      setEmailStatus('fail')
    }
  }

  return (
    <div className="bg-slate/20 border border-graphite rounded-xl p-6 mt-10">
      <h2 className="text-xl font-semibold text-softwhite mb-4">System Health</h2>

      <div className="mb-6">
        <a
          href="https://supabase.com/dashboard/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-graphite text-softwhite hover:bg-graphite/80 transition"
        >
          <LockClosedIcon className="w-4 h-4" />
          Resume Supabase Project
        </a>
      </div>

      <div className="mb-4">
        <button
          onClick={testDatabase}
          className="px-4 py-2 rounded-md bg-graphite text-softwhite hover:bg-graphite/80 transition"
        >
          Test Database Connection
        </button>

        <p className="text-softwhite/60 mt-2">
          Status: {dbStatus === 'unknown' && 'Unknown'}
          {dbStatus === 'online' && '🟢 Online'}
          {dbStatus === 'offline' && '🔴 Offline'}
        </p>
      </div>

      <div>
        <button
          onClick={testEmail}
          className="px-4 py-2 rounded-md bg-graphite text-softwhite hover:bg-graphite/80 transition"
        >
          Send Test Email
        </button>

        <p className="text-softwhite/60 mt-2">
          Status: {emailStatus === 'unknown' && 'Unknown'}
          {emailStatus === 'ok' && '🟢 Delivered'}
          {emailStatus === 'fail' && '🔴 Failed'}
        </p>
      </div>
    </div>
  )
}

export default function AdminAppointmentsPage() {
  const [user, setUser] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [reschedule, setReschedule] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'appointments' | 'availability'>('appointments')

useEffect(() => {
  let mounted = true

  const loadData = async () => {
    try {
      if (!mounted) return
      setLoading(true)

      const currentUser = await getCurrentUser()
      if (!mounted) return

      if (!currentUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const admin = await isAdmin() // ✅ no args
      if (!mounted) return

      if (!admin) {
        setUser(null)
        setLoading(false)
        return
      }

      setUser(currentUser)

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true })

      if (!mounted) return

      if (!error && data) setAppointments(data)
      setLoading(false)
    } catch (err) {
      console.error('Admin loadData error:', err)
      if (!mounted) return
      setUser(null)
      setLoading(false)
    }
  }

  loadData()

  const { data: listener } = supabase.auth.onAuthStateChange(() => {
    loadData()
  })

  return () => {
    mounted = false
    listener?.subscription?.unsubscribe()
  }
}, [])


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="text-softwhite/80">Loading admin dashboard...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-charcoal text-center px-4">
        <h1 className="text-3xl font-bold text-softwhite mb-4">Admin Access Required</h1>
        <p className="text-softwhite/70 mb-6">You do not have permission to view this page.</p>
        <Link href="/login">
          <Button className="btn-mindspring-primary px-6 py-3">Login</Button>
        </Link>
      </div>
    )
  }

  const filteredAppointments =
    filter === 'all'
      ? appointments
      : appointments.filter((a) => a.status === filter)

  return (
    <div className="min-h-screen bg-charcoal px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-softwhite mb-8">Admin — All Appointments</h1>

        <div className="flex gap-3 mb-6">
          {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              className={filter === f ? 'btn-mindspring-primary' : 'btn-mindspring-outline'}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredAppointments.map((appt) => (
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
                <strong>User:</strong> {appt.full_name} ({appt.email})
              </p>
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

              <div className="mt-4 flex gap-3">
                {appt.status !== 'confirmed' && appt.status !== 'cancelled' && (
                  <Button
                    className="btn-mindspring-primary"
                    onClick={async () => {
                      const { error } = await supabase
                        .from('appointments')
                        .update({ status: 'confirmed', updated_at: new Date().toISOString() })
                        .eq('id', appt.id)

                      if (error) return alert('Could not confirm appointment.')

                      setAppointments((prev) =>
                        prev.map((a) => (a.id === appt.id ? { ...a, status: 'confirmed' } : a))
                      )
                    }}
                  >
                    Confirm
                  </Button>
                )}

                {appt.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    className="btn-mindspring-outline"
                    onClick={async () => {
                      const ok = confirm('Cancel this appointment?')
                      if (!ok) return

                      const { error } = await supabase
                        .from('appointments')
                        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
                        .eq('id', appt.id)

                      if (error) return alert('Could not cancel appointment.')

                      setAppointments((prev) =>
                        prev.map((a) => (a.id === appt.id ? { ...a, status: 'cancelled' } : a))
                      )
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <Button className="btn-mindspring-primary" onClick={() => setReschedule(appt)}>
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
        </div>

        <SystemPanel />
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
