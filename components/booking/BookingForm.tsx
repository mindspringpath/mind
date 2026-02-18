'use client'

import { useState, useEffect } from 'react'
import { supabase, getCurrentUser } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react'

interface TimeSlot {
  id: string
  time: string
  is_available: boolean
}

interface FormData {
  fullName: string
  email: string
  phone: string
  notes: string
  date: string
  time: string
  sessionType: string
}

export default function BookingForm() {
  const router = useRouter()
  
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState<FormData>({
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

  // Generate calendar dates (next 14 days)
  const generateCalendarDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) {
        continue
      }
      
      dates.push({
        date: date.toLocaleDateString('en-AU'),
        day: date.getDate(),
        month: date.toLocaleDateString('en-AU', { month: 'short' }),
        weekday: date.toLocaleDateString('en-AU', { weekday: 'short' }),
        fullDate: date
      })
    }
    
    return dates
  }

  // Fetch available time slots for selected date
  const fetchTimeSlots = async (date: string) => {
    if (!date) return
    
    setLoadingSlots(true)
    setError('')
    
    try {
      console.log('Booking form: Fetching time slots for date:', date)
      
      const { data: slots, error } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('date', date)
        .order('time', { ascending: true })

      if (error) {
        console.error('Booking form: Error fetching time slots:', error)
        throw error
      }

      console.log('Booking form: Time slots fetched:', slots?.length || 0)
      setTimeSlots(slots || [])
    } catch (error: any) {
      console.error('Booking form: Exception fetching time slots:', error)
      setError('Failed to load time slots. Please try again.')
      setTimeSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  // Check for existing bookings
  const checkExistingBooking = async () => {
    if (!formData.date || !formData.time) return false
    
    try {
      const { data: existing, error: existingError } = await supabase
        .from('appointments')
        .select('id')
        .eq('date', formData.date)
        .eq('time', formData.time)
        .neq('status', 'cancelled')
        .limit(1)

      if (existingError) {
        console.error('Booking form: Error checking existing booking:', existingError)
        return false
      }

      return existing && existing.length > 0
    } catch (error: any) {
      console.error('Booking form: Exception checking existing booking:', error)
      return false
    }
  }

  // Handle booking submission
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setError('Booking is taking longer than expected. Please try again.')
      setSubmitting(false)
    }, 20000) // 20 second timeout

    try {
      console.log('Booking form: Starting booking process for:', formData.email)

      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.date || !formData.time) {
        throw new Error('Please fill in all required fields.')
      }

      // Check if time slot is already booked
      const isAlreadyBooked = await checkExistingBooking()
      if (isAlreadyBooked) {
        throw new Error('This time slot is already booked. Please choose another time.')
      }

      // Find or create availability slot
      let targetSlot = timeSlots.find(slot => 
        slot.time === formData.time && slot.is_available
      )

      if (!targetSlot) {
        // Create new availability slot
        console.log('Booking form: Creating new availability slot')
        const { data: newSlot, error: slotError } = await supabase
          .from('availability_slots')
          .insert({
            coach_id: user?.id || '00000000-0000-0000-0000-0000-0000-0001',
            date: formData.date,
            time: formData.time,
            is_available: false
          })
          .select()
          .single()

        if (slotError) {
          throw new Error('Failed to create time slot. Please try again.')
        }
        
        targetSlot = newSlot
      }

      // Create appointment
      console.log('Booking form: Creating appointment')
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
        .select()
        .single()

      if (insertError) {
        throw new Error('Failed to create appointment. Please try again.')
      }

      // Send email notification
      console.log('Booking form: Sending email notification')
      try {
        const emailResponse = await fetch('/api/send-email', {
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

        if (!emailResponse.ok) {
          console.error('Booking form: Email notification failed:', await emailResponse.text())
          setError('Booking confirmed but email notification failed. We will still contact you.')
        } else {
          console.log('Booking form: Email notification sent successfully')
          setSuccess('Booking confirmed! Check your email for details.')
          
          // Clear form after successful booking
          setTimeout(() => {
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              notes: '',
              date: '',
              time: '',
              sessionType: 'Initial Consultation'
            })
            setTimeSlots([])
            router.push('/booking/success')
          }, 2000)
        }
      } catch (emailError) {
        console.error('Booking form: Email notification error:', emailError)
        // Don't fail the booking if email fails
        setSuccess('Booking confirmed! Check your email for details.')
        
        setTimeout(() => {
          router.push('/booking/success')
        }, 2000)
      }

    } catch (err: any) {
      clearTimeout(timeoutId)
      console.error('Booking form: Booking error:', err?.message)
      
      if (err.message.includes('already booked')) {
        setError('This time slot is already booked. Please choose another time.')
      } else if (err.message.includes('timeout') || err.message.includes('TIMEOUT')) {
        setError('Booking timed out. Please check your connection and try again.')
      } else if (err.message.includes('required fields')) {
        setError('Please fill in all required fields.')
      } else {
        setError(err.message || 'Failed to book your session. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setSubmitting(false)
    }
  }

  const calendarDates = generateCalendarDates()

  return (
    <div className="bg-charcoal p-6 rounded-xl border border-graphite">
      <h2 className="text-2xl font-bold text-softwhite mb-6">Book Your Session</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/40 text-green-300 rounded-xl">
          {success}
        </div>
      )}

      {loadingUser && (
        <div className="text-softwhite/60 text-sm mb-4">
          Loading your details...
        </div>
      )}

      <form onSubmit={handleBooking} className="space-y-6">
        {/* User Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-softwhite/80 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              className="mindspring-input w-full"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-softwhite/80 mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+61 2 3456 7890"
              className="mindspring-input w-full"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-softwhite/80 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            className="mindspring-input w-full"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        {/* Session Type */}
        <div>
          <label className="block text-softwhite/80 mb-2">Session Type</label>
          <select
            name="sessionType"
            value={formData.sessionType}
            onChange={(e) => setFormData(prev => ({ ...prev, sessionType: e.target.value }))}
            className="mindspring-input w-full"
          >
            <option>Initial Consultation</option>
            <option>Follow-Up Session</option>
            <option>12-Week Program Session</option>
          </select>
        </div>

        {/* Calendar Section */}
        <div>
          <label className="block text-softwhite/80 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Select Date
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
            {calendarDates.map((dateInfo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, date: dateInfo.date, time: '' }))
                  fetchTimeSlots(dateInfo.date)
                }}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  formData.date === dateInfo.date
                    ? 'bg-primary text-white border-primary'
                    : 'bg-slate/20 border-graphite text-softwhite hover:bg-slate/30'
                }`}
              >
                <div className="text-xs font-medium mb-1">{dateInfo.weekday}</div>
                <div className="text-lg font-bold">{dateInfo.day}</div>
                <div className="text-xs">{dateInfo.month}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {formData.date && (
          <div>
            <label className="block text-softwhite/80 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Available Time Slots
            </label>
            {loadingSlots ? (
              <div className="text-softwhite/60 text-sm">Loading available time slots...</div>
            ) : timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, time: slot.time }))}
                    disabled={!slot.is_available}
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      !slot.is_available
                        ? 'bg-slate/10 border-graphite/50 text-softwhite/40 cursor-not-allowed'
                        : formData.time === slot.time
                        ? 'bg-primary text-white border-primary'
                        : 'bg-slate/20 border-graphite text-softwhite hover:bg-slate/30'
                    }`}
                  >
                    <div className="font-medium">{slot.time}</div>
                    {!slot.is_available && (
                      <div className="text-xs mt-1">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-softwhite/60 text-sm">
                No time slots available for this date. Please select another date.
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-softwhite/80 mb-2 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Additional Notes (optional)
          </label>
          <textarea
            name="notes"
            placeholder="Any special requirements or questions..."
            className="mindspring-input w-full h-24"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={submitting || !formData.date || !formData.time}
          className="w-full bg-primary text-white py-3 font-medium"
        >
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
      </form>

      <div className="mt-4 text-xs text-softwhite/50">
        <p>• Time slots are managed through the Admin Dashboard</p>
        <p>• All sessions are conducted online</p>
      </div>
    </div>
  )
}
