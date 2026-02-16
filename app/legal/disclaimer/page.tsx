import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching Disclaimer — MindSpring Path',
  description: 'Coaching Disclaimer for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Understanding that coaching is not therapy or clinical treatment.',
  keywords: 'coaching disclaimer, therapy disclaimer, MindSpring Path, coaching vs therapy, mental health disclaimer',
}

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mindspring-card p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              📘 Coaching Disclaimer — MindSpring Path
            </h1>
            <p className="text-softwhite/70 mb-8">
              <strong>Effective Date: 01 February 2026</strong>
            </p>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-softwhite/80 mb-6">
                MindSpring Path provides coaching, not therapy or clinical treatment.
              </p>

              <div className="mindspring-card p-6 bg-slate border-l-4 border-l-primary mb-8">
                <h2 className="text-xl font-bold text-softwhite mb-4">Important: Coaching is Not Therapy</h2>
                <p className="text-softwhite/80 mb-4">Coaching is not a substitute for:</p>
                <ul className="list-disc pl-6 space-y-2 text-softwhite/80">
                  <li>Psychological counselling</li>
                  <li>Psychiatric care</li>
                  <li>Medical treatment</li>
                  <li>Crisis intervention</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">When to Seek Clinical Support</h2>
              <p className="text-softwhite/80 mb-6">
                If you are experiencing significant distress, risk of harm, or require clinical support, please contact:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary">
                  <h3 className="font-semibold text-softwhite mb-2">Immediate Support</h3>
                  <ul className="space-y-2 text-softwhite/80">
                    <li><strong>Your GP</strong> - for medical concerns</li>
                    <li><strong>Emergency services (000)</strong> - for immediate danger</li>
                  </ul>
                </div>
                <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary">
                  <h3 className="font-semibold text-softwhite mb-2">Mental Health Support</h3>
                  <ul className="space-y-2 text-softwhite/80">
                    <li><strong>Lifeline (13 11 14)</strong> - 24/7 crisis support</li>
                    <li><strong>Beyond Blue (1300 224 636)</strong> - mental health support</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-softwhite mb-4 mt-8">Our Coaching Services</h2>
              <p className="text-softwhite/80 mb-6">
                MindSpring Path coaching focuses on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-softwhite/80 mb-6">
                <li>Evidence-based strategies for mental clarity</li>
                <li>Building focus and attention skills</li>
                <li>Values-aligned goal setting</li>
                <li>Practical tools for daily life</li>
                <li>Personal development and growth</li>
              </ul>

              <div className="mindspring-card p-4 bg-slate border-l-4 border-l-primary mt-8">
                <p className="text-softwhite font-medium mb-2">Questions About Our Services?</p>
                <p className="text-softwhite/80 mb-2">Contact us to discuss whether coaching is right for you:</p>
                <p className="text-softwhite font-medium">info@mindspringpath.com.au</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
