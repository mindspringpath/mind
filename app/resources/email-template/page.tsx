import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Mail, Download, Copy, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Email Templates — MindSpring Path',
  description: 'Professional email templates and signatures for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Download booking confirmation templates.',
  keywords: 'email templates, professional email, MindSpring Path, email signature, booking confirmation',
}

export default function EmailTemplatePage() {
  const emailSignature = `Kind regards,
Miyu Pat  
MindSpring Path  
Evidence-Based Coaching for Clarity & Focus  

📧 info@mindspringpath.com.au  
🌐 mindspringpath.com.au  

—
MindSpring Path acknowledges the importance of mental wellbeing. 
Coaching services provided are non-clinical and do not replace psychological or medical care.`

  const bookingConfirmation = `Subject: Appointment Confirmation - MindSpring Path

Dear [Client Name],

Thank you for booking your coaching session with MindSpring Path. Your appointment has been confirmed.

APPOINTMENT DETAILS:
• Date: [Date]
• Time: [Time]
• Service: [Service Type]
• Duration: 50 minutes
• Location: [Location/Video Link]

WHAT TO EXPECT:
• Please arrive 10 minutes early for in-person sessions
• Bring any questions or goals you'd like to discuss
• Sessions are confidential and conducted in a supportive environment
• You'll receive a reminder 24 hours before your session

PREPARATION:
• Complete any pre-session forms sent to your email
• Think about your goals and what you'd like to achieve
• Ensure you have a quiet, private space for virtual sessions

CANCELLATION POLICY:
• Cancellations made 24+ hours before: no fee
• Cancellations within 24 hours: full session fee applies
• No-shows: full fee applies

CONTACT INFORMATION:
• Email: info@mindspringpath.com.au
• Website: mindspringpath.com.au
• For emergencies: Call 000 or Lifeline 13 11 14

We look forward to supporting your journey toward clarity and focus.

Best regards,
Miyu Pat
MindSpring Path
Evidence-Based Coaching for Clarity & Focus

---
MindSpring Path acknowledges the importance of mental wellbeing. 
Coaching services provided are non-clinical and do not replace psychological or medical care.`

  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mindspring-card p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-softwhite mb-4 tracking-tight">
              Email Templates
            </h1>
            <p className="text-lg md:text-xl text-softwhite/70 mb-8">
              Professional email templates and signatures for MindSpring Path
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Booking Confirmation Email</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-softwhite mb-3">Template Overview</h3>
                <p className="text-softwhite/80 mb-4">
                  Professional booking confirmation template that includes all necessary session details, preparation guidelines, and legal disclaimers.
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate border-l-4 border-l-primary rounded">
                    <h4 className="font-semibold text-softwhite mb-2">Key Features</h4>
                    <ul className="text-softwhite/80 space-y-1 text-sm">
                      <li>• Professional greeting and confirmation</li>
                      <li>• Complete appointment details</li>
                      <li>• Preparation guidelines</li>
                      <li>• Cancellation policy</li>
                      <li>• Contact information</li>
                      <li>• Legal disclaimer</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-slate border-l-4 border-l-primary rounded">
                    <h4 className="font-semibold text-softwhite mb-2">Customization</h4>
                    <ul className="text-softwhite/80 space-y-1 text-sm">
                      <li>• Personalized client information</li>
                      <li>• Service-specific details</li>
                      <li>• Location-based instructions</li>
                      <li>• Time zone considerations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button variant="mindspring-primary" size="lg" className="w-full">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Template
                </Button>
                
                <Button variant="outline" size="lg" className="w-full mt-2 border-graphite text-softwhite hover:bg-slate hover:text-softwhite">
                  <Copy className="w-5 h-5 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </div>

            <div className="mindspring-card p-8">
              <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Professional Email Signature</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-softwhite mb-3">Standard Signature</h3>
                <div className="p-6 bg-charcoal border border-graphite rounded-xl">
                  <pre className="text-sm text-softwhite/80 whitespace-pre-wrap font-mono">
{emailSignature}
                  </pre>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-softwhite mb-3">Signature Guidelines</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-softwhite">Professional Format</h4>
                      <p className="text-softwhite/70 text-sm">Clean, consistent formatting with proper spacing and hierarchy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-softwhite">Brand Consistency</h4>
                      <p className="text-softwhite/70 text-sm">Always use MindSpring Path branding and correct contact information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-softwhite">Legal Compliance</h4>
                      <p className="text-softwhite/70 text-sm">Include appropriate disclaimers about coaching vs therapy</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button variant="mindspring-primary" size="lg" className="w-full">
                  <Download className="w-5 h-5 mr-2" />
                  Download Signature Template
                </Button>
                
                <Button variant="outline" size="lg" className="w-full mt-2 border-graphite text-softwhite hover:bg-slate hover:text-softwhite">
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Signature
                </Button>
              </div>
            </div>
          </div>

          <div className="mindspring-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Additional Templates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Welcome Email</h3>
                <p className="text-softwhite/70 text-sm mb-3">Initial welcome for new clients with program overview</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Session Reminder</h3>
                <p className="text-softwhite/70 text-sm mb-3">24-hour reminder with preparation tips</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Follow-up Email</h3>
                <p className="text-softwhite/70 text-sm mb-3">Post-session follow-up with next steps</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Program Completion</h3>
                <p className="text-softwhite/70 text-sm mb-3">Certificate of completion and next steps</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Holiday Schedule</h3>
                <p className="text-softwhite/70 text-sm mb-3">Holiday hours and availability notice</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="mindspring-card p-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Best Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-softwhite mb-4">Email Etiquette</h3>
                <ul className="space-y-2 text-softwhite/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use professional, warm tone</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Be prompt with responses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Proofread before sending</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use BCC for privacy when needed</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-softwhite mb-4">Legal Compliance</h3>
                <ul className="space-y-2 text-softwhite/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Always include coaching disclaimer</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Include emergency contact information</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maintain privacy and confidentiality</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Follow Australian email marketing laws</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
