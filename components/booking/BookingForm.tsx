'use client'

import { useState, useEffect } from 'react'
import { supabase, getCurrentUser } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function BookingForm() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    date: '',
    time: '',
    sessionType: 'Initial Consultation'
  })

  // Load user + listen for login/logout/signup
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()

        if (currentUser) {
          setUser(currentUser)

          setFormData(prev => ({
            ...prev,
            fullName: prev.fullName || currentUser.user_metadata?.full_name || '',
            email: prev.email || currentUser.email || '',
            phone: prev.phone || '',
            notes: prev.notes || ''
          }))
        }
      } catch (err) {
        console.log('No user logged in')
      }

      setLoadingUser(false)
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const currentUser = await getCurrentUser()

      // 1) Check for existing booking at same date+time
      const { data: existing, error: existingError } = await supabase
        .from('appointments')
        .select('id')
        .eq('date', formData.date)
        .eq('time', formData.time)
        .neq('status', 'cancelled')

      if (existingError) throw existingError

      if (existing && existing.length > 0) {
        alert('This time slot is already booked. Please choose another time.')
        setSubmitting(false)
        return
      }

      // 2) Create appointment
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          user_id: currentUser?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes,
          date: formData.date,
          time: formData.time,
          session_type: formData.sessionType,
          status: 'pending'
        })

      if (error) throw error

      // ⭐⭐⭐ SEND BOOKING CONFIRMATION EMAIL ⭐⭐⭐
      await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    kind: 'booking_created',
    appointment: newAppointmentObject
  })
})


      // Redirect to success page
      router.push('/booking/success')

    } catch (err) {
      console.error('Booking error:', err)
      alert('Something went wrong while booking your session.')
    }

    setSubmitting(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-charcoal p-6 rounded-xl border border-graphite"
    >
      <h2 className="text-2xl font-bold text-softwhite mb-4">
        Book Your Session
      </h2>

      {/* Full Name */}
      <div>
        <label className="block text-softwhite/80 mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="input-mindspring"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-softwhite/80 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-mindspring"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-softwhite/80 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="input-mindspring"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-softwhite/80 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="input-mindspring"
        />
      </div>

      {/* Time */}
      <div>
        <label className="block text-softwhite/80 mb-1">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="input-mindspring"
        />
      </div>

      {/* Session Type */}
      <div>
        <label className="block text-softwhite/80 mb-1">Session Type</label>
        <select
          name="sessionType"
          value={formData.sessionType}
          onChange={handleChange}
          className="input-mindspring"
        >
          <option>Initial Consultation</option>
          <option>Follow-Up Session</option>
          <option>12-Week Program Session</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-softwhite/80 mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input-mindspring h-24"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="btn-mindspring-primary w-full py-3"
      >
        {submitting ? 'Booking...' : 'Confirm Booking'}
      </Button>
    </form>
  )
}