'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createAppointment, sendEmailConfirmation } from '@/lib/auth-helpers'
import { getCurrentUser } from '@/lib/auth-helpers'

interface Service {
  id: string
  name: string
  duration: string
  price: string
  description: string
}

const services: Service[] = [
  {
    id: 'coaching-session',
    name: 'Evidence-Based Coaching Session',
    duration: '60-75 minutes',
    price: '$150',
    description: 'Individual coaching session to build attention, emotional regulation, and cognitive flexibility'
  },
  {
    id: '12-week-program',
    name: '12-Week Mindful Momentum Program',
    duration: '12 weeks',
    price: '$1,200',
    description: 'Structured program to build mental clarity, navigate thoughts/emotions, and take values-aligned action'
  }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
]

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  })

  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      }))
    }
    return dates
  }

  const availableDates = generateAvailableDates()

  useEffect(() => {
    // Check if user is logged in and pre-fill form
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          setFormData(prev => ({
            ...prev,
            fullName: currentUser.user_metadata?.full_name || '',
            email: currentUser.email || ''
          }))
        }
      } catch (err) {
        console.log('No user logged in')
      }
    }
    checkUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Please select a service, date, and time')
      setIsLoading(false)
      return
    }

    if (!formData.fullName || !formData.email) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      const appointment = await createAppointment({
        user_id: user?.id || null,
        date: selectedDate,
        time: selectedTime,
        session_type: selectedService,
        status: 'pending'
      })

      // Send confirmation email
      await sendEmailConfirmation(appointment.id)
      
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking your appointment')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-graphite">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-softwhite mb-4 tracking-tight">Booking Confirmed!</h2>
        <div className="bg-slate border border-graphite rounded-xl p-6 max-w-md mx-auto mb-6">
          <h3 className="font-semibold text-softwhite mb-2">Appointment Details</h3>
          <div className="text-left space-y-2 text-sm text-softwhite/80">
            <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}</p>
            <p><strong>Date:</strong> {selectedDate}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Price:</strong> {services.find(s => s.id === selectedService)?.price}</p>
          </div>
        </div>
        <p className="text-softwhite/70 mb-6">
          A confirmation email has been sent to {formData.email}. 
          You'll receive a reminder 24 hours before your session from MindSpring Path.
        </p>
        <Button variant="mindspring-primary" onClick={() => window.location.href = '/dashboard'}>
          View My Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Select Service
              </CardTitle>
              <CardDescription>
                Choose the type of coaching session you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-graphite hover:border-primary/60'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-softwhite">{service.name}</h3>
                      <span className="text-primary font-bold">{service.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-softwhite/70 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <p className="text-sm text-softwhite/70">{service.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableDates.map((date, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedDate === date
                          ? 'border-primary bg-primary/10'
                          : 'border-graphite hover:border-primary/60'
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className={`p-2 border rounded-lg cursor-pointer text-center transition-all ${
                        selectedTime === time
                          ? 'border-primary bg-primary/10'
                          : 'border-graphite hover:border-primary/60'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                {user ? 'Your information is pre-filled' : 'Please provide your contact details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-softwhite/80 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={!!user}
                    className="mindspring-input disabled:opacity-60"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-softwhite/80 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={!!user}
                    className="mindspring-input disabled:opacity-60"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-softwhite/80 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mindspring-input"
                    placeholder="+61 2 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-softwhite/80 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="mindspring-input"
                    placeholder="Any specific goals or areas you'd like to focus on..."
                  />
                </div>

                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-slate border border-graphite rounded-xl flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-softwhite/80 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="mindspring-primary"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !selectedService || !selectedDate || !selectedTime}
                >
                  {isLoading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedService && (
                <div>
                  <h4 className="font-semibold text-softwhite mb-2">Selected Service</h4>
                  <div className="bg-charcoal border border-graphite p-3 rounded-xl">
                    <div className="font-medium text-softwhite">
                      {services.find(s => s.id === selectedService)?.name}
                    </div>
                    <div className="text-sm text-softwhite/70">
                      {services.find(s => s.id === selectedService)?.duration}
                    </div>
                    <div className="text-lg font-bold text-softwhite mt-1">
                      {services.find(s => s.id === selectedService)?.price}
                    </div>
                  </div>
                </div>
              )}

              {(selectedDate || selectedTime) && (
                <div>
                  <h4 className="font-semibold text-softwhite mb-2">Schedule</h4>
                  <div className="space-y-2">
                    {selectedDate && (
                      <div className="flex items-center text-softwhite/80">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {selectedDate}
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex items-center text-softwhite/80">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        {selectedTime}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t border-graphite pt-4">
                <h4 className="font-semibold text-softwhite mb-3">What to Expect</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-softwhite/70">Evidence-based coaching methods</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-softwhite/70">Personalized attention and guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-softwhite/70">Practical tools and strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-softwhite/70">Email confirmation and reminders</span>
                  </li>
                </ul>
              </div>

              {!user && (
                <div className="border-t border-graphite pt-4">
                  <p className="text-sm text-softwhite/70">
                    Have an account?{' '}
                    <a href="/auth/login" className="text-softwhite hover:text-white font-medium">
                      Sign in
                    </a>{' '}
                    for faster booking.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
