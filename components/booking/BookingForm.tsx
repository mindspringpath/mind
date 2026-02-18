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
  const [timeSlots, setTimeSlots] = useState<Array<{ id: string; time: string; is_available: boolean }>>([])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    date: '',
    time: '',
    sessionType: 'Initial Consultation'
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()

        if (currentUser) {
          setUser(currentUser)

          setFormData((prev) => ({
            ...prev,
            fullName: prev.fullName || currentUser.user_metadata?.full_name || '',
            email: prev.email || currentUser.email || '',
            phone: prev.phone || '',
            notes: prev.notes || ''
          }))
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date.toLocaleDateString('en-AU', { weekday: 'short' }))
    }
    return dates
  }

  const generateTimeSlots = (date: string) => {
    const slots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
    ]
    return slots
  }

  const fetchAvailabilitySlots = async (date: string) => {
    try {
      const { data: slots, error } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('date', date)
        .eq('is_available', true)

      if (error) throw error
      setTimeSlots(slots || [])
    } catch (error) {
      console.error('Error fetching availability:', error)
      setTimeSlots([])
    }
  }

  const checkExistingBooking = async () => {
    if (!formData.date || !formData.time) return

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
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Find available slot or create new one
      let targetSlot = timeSlots.find(slot => 
        slot.time === formData.time && slot.is_available
      )

      if (!targetSlot) {
        // Create new availability slot
        const { data: newSlot, error: slotError } = await supabase
          .from('availability_slots')
          .insert({
            coach_id: user?.id || '00000000-0000-0000-0000-0000-0000-0000-0001',
            date: formData.date,
            time: formData.time,
            is_available: false
          })
          .select()
          .single()

        if (slotError) throw slotError
        targetSlot = newSlot
      }

      // Insert appointment
      const { data: insertedAppointment, error: insertError } = await supabase
        .from('appointments')
        .insert({
          user_id: user?.id || null,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: targetSlot?.time || formData.time,
          session_type: formData.sessionType,
          status: 'pending',
          notes: formData.notes,
          updated_at: new Date().toISOString()
        })

      if (insertError) throw insertError

      // Send email notification
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kind: 'booking_created',
            appointment: {
              full_name: formData.fullName,
              email: formData.email,
              date: formData.date,
              time: targetSlot?.time || formData.time,
              session_type: formData.sessionType
            }
          })
        })
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError)
        // Don't fail the booking if email fails
      }

      router.push('/booking/success')
    } catch (err) {
      console.error('Booking error:', err)
      alert('Something went wrong while booking your session.')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    fetchAvailabilitySlots(formData.date)
  }, [formData.date])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form
      onSubmit={handleBooking}
      className="space-y-6 bg-charcoal p-6 rounded-xl border border-graphite"
    >
      <h2 className="text-2xl font-bold text-softwhite mb-4">Book Your Session</h2>

      {loadingUser && (
        <div className="text-softwhite/60 text-sm">
          Loading your details...
        </div>
      )}

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
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="input-mindspring"
        >
          {timeSlots.map(slot => (
            <option key={slot.id} value={slot.time} disabled={!slot.is_available}>
              {slot.time} {!slot.is_available ? '(Booked)' : ''}
            </option>
          ))}
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
