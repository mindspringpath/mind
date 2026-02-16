import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — MindSpring Path',
  description: 'Privacy Policy for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Learn how we collect, use, and protect your personal information in accordance with Australian Privacy Principles.',
  keywords: 'privacy policy, data protection, MindSpring Path, coaching privacy, Australian Privacy Principles',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mindspring-card p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              📘 Privacy Policy — MindSpring Path
            </h1>
            <p className="text-softwhite/70 mb-8">
              <strong>Effective Date: 01 February 2026</strong>
            </p>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-softwhite/80 mb-6">
                MindSpring Path ("we", "our", "us") is committed to protecting your privacy in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                This policy explains how we collect, use, store, and protect your personal information.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Information We Collect</h2>
              <p className="text-softwhite/80 mb-4">We may collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Booking details</li>
                <li>Session notes (non-clinical)</li>
                <li>Website usage data</li>
                <li>Payment confirmation details (processed by secure third-party providers)</li>
              </ul>
              <p className="text-softwhite/80 mb-6">
                <strong>We do not store credit card numbers.</strong>
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">How We Collect Information</h2>
              <p className="text-softwhite/80 mb-4">We collect information when you:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Book a session</li>
                <li>Register an account</li>
                <li>Complete forms on our website</li>
                <li>Communicate with us</li>
                <li>Use our website</li>
              </ul>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-softwhite/80 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Provide coaching services</li>
                <li>Manage bookings and reminders</li>
                <li>Communicate with you</li>
                <li>Improve our services</li>
                <li>Maintain secure account access</li>
              </ul>
              <p className="text-softwhite/80 mb-6">
                <strong>We do not sell or share your information with third parties for marketing.</strong>
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Storage & Security</h2>
              <p className="text-softwhite/80 mb-6">
                Your data is stored securely using reputable third-party providers (e.g., Supabase, email services).
                We take reasonable steps to protect your information from misuse, loss, or unauthorised access.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Access & Correction</h2>
              <p className="text-softwhite/80 mb-6">
                You may request access to your personal information or request corrections by contacting:
              </p>
              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary mb-6">
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Contact Us</h2>
              <p className="text-softwhite/80 mb-4">For privacy enquiries:</p>
              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary">
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
