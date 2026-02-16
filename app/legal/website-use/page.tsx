import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Use Policy — MindSpring Path',
  description: 'Website Use Policy for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Guidelines for appropriate use of our website and services.',
  keywords: 'website use policy, acceptable use, MindSpring Path, website terms, online conduct',
}

export default function WebsiteUsePolicy() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mindspring-card p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              📘 Website Use Policy — MindSpring Path
            </h1>
            <p className="text-softwhite/70 mb-8">
              <strong>Effective Date: 01 February 2026</strong>
            </p>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-softwhite/80 mb-6">
                You agree not to:
              </p>

              <div className="mindspring-card p-6 bg-slate border-l-4 border-l-primary mb-8">
                <h2 className="text-xl font-bold text-softwhite mb-4">Prohibited Activities</h2>
                <ul className="list-disc pl-6 space-y-2 text-softwhite/80">
                  <li>Use this website for unlawful purposes</li>
                  <li>Attempt to access restricted areas without authorisation</li>
                  <li>Copy or distribute website content without permission</li>
                  <li>Interfere with website functionality</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Acceptable Use</h2>
              <p className="text-softwhite/80 mb-4">We encourage:</p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Respectful communication with our team</li>
                <li>Appropriate use of booking systems</li>
                <li>Genuine interest in coaching services</li>
                <li>Professional conduct in all interactions</li>
              </ul>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Content Rights</h2>
              <p className="text-softwhite/80 mb-6">
                All website content, including text, images, and materials, is protected by copyright and intellectual property laws.
                Unauthorized use or reproduction is prohibited.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Policy Updates</h2>
              <p className="text-softwhite/80 mb-6">
                We may update this policy at any time. Continued use of the website constitutes acceptance of any changes.
              </p>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Enforcement</h2>
              <p className="text-softwhite/80 mb-6">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Suspend or terminate access for policy violations</li>
                <li>Remove inappropriate content</li>
                <li>Report illegal activities to authorities</li>
                <li>Pursue legal remedies for damages</li>
              </ul>

              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary mt-8">
                <p className="text-softwhite font-medium mb-2">Questions About This Policy?</p>
                <p className="text-softwhite/80 mb-2">Contact us for clarification:</p>
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
