import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy — MindSpring Path',
  description: 'Cancellation and Refund Policy for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Learn about our cancellation terms and refund conditions.',
  keywords: 'cancellation policy, refund policy, MindSpring Path, coaching cancellation, booking terms',
}

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mindspring-card p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              📘 Cancellation & Refund Policy — MindSpring Path
            </h1>
            <p className="text-softwhite/70 mb-8">
              <strong>Effective Date: 01 February 2026</strong>
            </p>

            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Cancellations</h2>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Cancellations made 24 hours or more before session: no fee</li>
                <li>Cancellations made within 24 hours: full session fee applies</li>
                <li>No-shows: full fee applies</li>
              </ul>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Rescheduling</h2>
              <p className="text-softwhite/80 mb-6">
                You may reschedule up to 24 hours before your appointment.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Refunds</h2>
              <p className="text-softwhite/80 mb-4">Refunds are only provided when:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>A session is cancelled by MindSpring Path</li>
                <li>A technical issue prevents the session from occurring</li>
              </ul>
              <p className="text-softwhite/80 mb-4">Refunds are not provided for:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Change of mind</li>
                <li>Late cancellations</li>
                <li>No-shows</li>
              </ul>

              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary mt-8">
                <p className="text-softwhite font-medium mb-2">Need to Cancel or Reschedule?</p>
                <p className="text-softwhite/80 mb-2">Contact us as soon as possible:</p>
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
