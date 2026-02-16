import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — MindSpring Path',
  description: 'Terms of Service for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Understand our service terms, eligibility, and governing laws.',
  keywords: 'terms of service, legal terms, MindSpring Path, coaching terms, service agreement',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mindspring-card p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              📘 Terms of Service — MindSpring Path
            </h1>
            <p className="text-softwhite/70 mb-8">
              <strong>Effective Date: 01 February 2026</strong>
            </p>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-softwhite/80 mb-6">
                By using this website or booking a session, you agree to the following terms.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Nature of Services</h2>
              <p className="text-softwhite/80 mb-4">
                MindSpring Path provides non-clinical, evidence-based coaching.
              </p>
              <p className="text-softwhite/80 mb-4">We do not provide:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Psychological therapy</li>
                <li>Mental health diagnosis</li>
                <li>Crisis support</li>
                <li>Medical treatment</li>
              </ul>
              <p className="text-softwhite/80 mb-6">
                If clinical support is required, we will recommend appropriate services.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Eligibility</h2>
              <p className="text-softwhite/80 mb-4">You must be:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>18 years or older, or</li>
                <li>Have written consent from a parent/guardian</li>
              </ul>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Bookings</h2>
              <p className="text-softwhite/80 mb-6">
                Bookings are made through our online system.
                You agree to provide accurate information when booking.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Payments</h2>
              <p className="text-softwhite/80 mb-6">
                Payments are processed securely through third-party providers.
                We do not store credit card information.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Limitation of Liability</h2>
              <p className="text-softwhite/80 mb-4">
                To the extent permitted by Australian law, MindSpring Path is not liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Decisions you make based on coaching</li>
                <li>Outcomes of personal or professional choices</li>
                <li>Losses arising from website downtime or technical issues</li>
              </ul>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Governing Law</h2>
              <p className="text-softwhite/80 mb-6">
                These terms are governed by the laws of Western Australia.
              </p>

              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary mt-8">
                <p className="text-softwhite font-medium mb-2">Contact Us</p>
                <p className="text-softwhite/80">For questions about these terms:</p>
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
