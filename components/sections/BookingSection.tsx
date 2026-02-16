import { useState } from 'react'
import { Calendar, Clock, User, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BookingSection() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  })

  const services = [
    {
      id: 'initial',
      name: 'Initial Consultation',
      duration: '30 minutes',
      price: 'Free',
      description: 'Discover how our coaching can help you achieve your goals'
    },
    {
      id: 'focus',
      name: 'Focus Training Session',
      duration: '60 minutes',
      price: '$150',
      description: 'Personalized focus improvement techniques and strategies'
    },
    {
      id: 'productivity',
      name: 'Productivity Optimization',
      duration: '90 minutes',
      price: '$200',
      description: 'Comprehensive productivity assessment and planning'
    },
    {
      id: 'group',
      name: 'Group Workshop',
      duration: '2 hours',
      price: '$75',
      description: 'Interactive group sessions on focus and productivity'
    }
  ]

  const availableDates = [
    'Monday, Feb 19',
    'Tuesday, Feb 20',
    'Wednesday, Feb 21',
    'Thursday, Feb 22',
    'Friday, Feb 23'
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking logic with Supabase
    console.log('Booking attempt:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...formData
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-24 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
            Book Your <span className="text-white">Coaching Session</span>
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 max-w-3xl mx-auto leading-relaxed">
            Schedule a personalized coaching session and take the first step towards enhanced focus and productivity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Services */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
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
                    <div className="space-y-2">
                      {availableDates.map((date) => (
                        <div
                          key={date}
                          className={`p-3 border rounded-xl cursor-pointer transition-all ${
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
                          className={`p-2 border rounded-xl cursor-pointer text-center transition-all ${
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

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Please provide your contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-softwhite/80 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="mindspring-input"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-softwhite/80 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="mindspring-input"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-softwhite/80 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mindspring-input"
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

                    <Button
                      type="submit"
                      variant="mindspring-primary"
                      size="lg"
                      className="w-full"
                      disabled={!selectedService || !selectedDate || !selectedTime}
                    >
                      Book Session
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
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
                        <span className="text-sm text-softwhite/70">Personalized assessment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-softwhite/70">Actionable strategies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-softwhite/70">Follow-up resources</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-softwhite/70">Email confirmation</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
