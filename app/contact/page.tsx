'use client'

import { useState } from 'react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setError('Message is taking longer than expected to send. Please try again.')
      setSubmitting(false)
    }, 15000) // 15 second timeout

    try {
      console.log('Contact form: Submitting message from:', formData.email)
      
      // Use API endpoint to avoid RLS recursion issues
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Contact form: API error:', errorData)
        
        if (response.status === 400) {
          setError(errorData.error || 'Please check all fields and try again.')
        } else {
          setError('Failed to send your message. Please try again.')
        }
        return
      }

      const result = await response.json()
      console.log('Contact form: Message sent successfully:', result.message)

      if (result.emailError) {
        console.warn('Contact form: Email notification failed:', result.emailError)
        setError('Message saved but email notification failed. We will still respond to your message.')
      } else {
        setSuccess('Thank you for your message! We will get back to you soon.')
      }
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      })

    } catch (err: any) {
      clearTimeout(timeoutId)
      console.error('Contact form: Submission error:', err?.message)
      
      if (err.message.includes('timeout') || err.message.includes('TIMEOUT')) {
        setError('Submission timed out. Please check your connection and try again.')
      } else if (err.message.includes('Network') || err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.')
      } else {
        setError('Failed to send your message. Please try again.')
      }
    } finally {
      clearTimeout(timeoutId)
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-charcoal rounded-xl shadow-xl border border-graphite p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-softwhite mb-4">Contact Us</h1>
            <p className="text-softwhite/70">
              Have questions about our coaching programs? We'd love to hear from you.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-slate border border-red-500/40 text-red-300 rounded-xl">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/40 text-green-300 rounded-xl">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-softwhite mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                className="mindspring-input w-full"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softwhite mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="mindspring-input w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softwhite mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+61 2 3456 7890"
                className="mindspring-input w-full"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softwhite mb-2">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your coaching needs..."
                className="mindspring-input w-full h-32"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 bg-softwhite rounded-full animate-pulse"></div>
                  <span className="text-softwhite text-sm">Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
