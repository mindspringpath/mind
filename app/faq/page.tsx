'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqData = [
  {
    question: "Are sessions online or in-person?",
    answer: "All sessions are conducted online. After booking, you'll receive an email with session details and joining instructions."
  },
  {
    question: "How do I book a session?",
    answer: "Go to the Booking page, select your preferred date and time, choose your session type, and confirm your booking. You'll receive a confirmation email immediately."
  },
  {
    question: "How do I reschedule a session?",
    answer: "Log in to your account, go to My Appointments, find your session, and click the Reschedule button. Follow the prompts to select a new time."
  },
  {
    question: "How do I cancel a session?",
    answer: "Log in to your account, go to My Appointments, find your session, and click the Cancel button. You'll receive a cancellation confirmation email."
  },
  {
    question: "Will I receive a booking confirmation?",
    answer: "Yes. A confirmation email is sent immediately after booking. If you don't see it within 5 minutes, check your spam folder."
  },
  {
    question: "How long are coaching sessions?",
    answer: "Session length depends on the service type you select. Most individual coaching sessions are 60 minutes, while program sessions may vary."
  },
  {
    question: "Is my information private and secure?",
    answer: "Yes. We respect your privacy and never share your personal information. All sessions are confidential. Please refer to our Privacy Policy for details."
  },
  {
    question: "What should I prepare before my session?",
    answer: "Ensure you have a quiet, private space and a stable internet connection. Have any relevant materials or questions ready. We recommend joining 5 minutes early."
  },
  {
    question: "How do I contact support?",
    answer: "Use the Contact page or email us at info@mindspringpath.com.au. We typically respond within 1-2 business days."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <main className="min-h-screen bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight text-center">
            Frequently Asked Questions
          </h1>

          <div className="space-y-4 mb-12">
            {faqData.map((item, index) => (
              <div key={index} className="bg-slate/20 border border-graphite rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-graphite/20 transition-colors"
                >
                  <h3 className="text-lg font-medium text-softwhite pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-softwhite/60 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-softwhite/60 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-softwhite/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-slate/20 border border-graphite rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-softwhite mb-4">
              Ready to get started?
            </h2>
            <p className="text-softwhite/70 mb-6">
              Book your first coaching session or contact us with any additional questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button className="btn-mindspring-primary">
                  Book a Session
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="btn-mindspring-outline">
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/home" 
              className="text-softwhite/60 hover:text-softwhite text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
