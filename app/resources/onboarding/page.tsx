import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Download, FileText, Users, Calendar, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Client Onboarding Guide — MindSpring Path',
  description: 'Complete client onboarding guide for MindSpring Path: Evidence-Based Coaching for Clarity & Focus. Download our comprehensive onboarding resources.',
  keywords: 'client onboarding, MindSpring Path, coaching guide, getting started, client resources',
}

export default function OnboardingGuide() {
  return (
    <div className="min-h-screen bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mindspring-card p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-softwhite mb-4 tracking-tight">
              Client Onboarding Guide
            </h1>
            <p className="text-lg md:text-xl text-softwhite/70 mb-8">
              Your complete guide to getting started with MindSpring Path coaching
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="mindspring-primary" size="lg" className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download PDF Guide
              </Button>
              <Button variant="outline" size="lg" className="flex items-center border-graphite text-softwhite hover:bg-slate hover:text-softwhite">
                <FileText className="w-5 h-5 mr-2" />
                View Online Version
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="mindspring-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-softwhite tracking-tight">Getting Started</h2>
              </div>
              <ul className="space-y-3 text-softwhite/80">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete initial consultation form</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Schedule your first session</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Review welcome materials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Set up your client portal</span>
                </li>
              </ul>
            </div>

            <div className="mindspring-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-softwhite tracking-tight">First Session</h2>
              </div>
              <ul className="space-y-3 text-softwhite/80">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Arrive 10 minutes early</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bring your goals and questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comfortable, quiet space</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Notebook and pen recommended</span>
                </li>
              </ul>
            </div>

            <div className="mindspring-card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-softwhite tracking-tight">Between Sessions</h2>
              </div>
              <ul className="space-y-3 text-softwhite/80">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete assigned exercises</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Practice mindfulness techniques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Track your progress</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Journal your insights</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mindspring-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">What to Expect</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-softwhite mb-4">Your First Month</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-softwhite">Initial Assessment</h4>
                      <p className="text-softwhite/70 text-sm">Comprehensive evaluation of your goals and current situation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-softwhite">Foundation Building</h4>
                      <p className="text-softwhite/70 text-sm">Introduction to core evidence-based techniques</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-softwhite">Skill Development</h4>
                      <p className="text-softwhite/70 text-sm">Practice and refine your new mental clarity skills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-softwhite">Integration</h4>
                      <p className="text-softwhite/70 text-sm">Apply techniques to daily life and work</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-softwhite mb-4">Session Structure</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-charcoal border border-graphite rounded-xl">
                    <h4 className="font-medium text-softwhite mb-2">50-Minute Sessions</h4>
                    <ul className="text-sm text-softwhite/70 space-y-1">
                      <li>• Check-in and goal review (10 min)</li>
                      <li>• Core coaching work (30 min)</li>
                      <li>• Action planning and homework (10 min)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-charcoal border border-graphite rounded-xl">
                    <h4 className="font-medium text-softwhite mb-2">Evidence-Based Methods</h4>
                    <ul className="text-sm text-softwhite/70 space-y-1">
                      <li>• Acceptance and Commitment Therapy (ACT)</li>
                      <li>• Cognitive Behavioral Techniques</li>
                      <li>• Mindfulness-Based Approaches</li>
                      <li>• Values Clarification Exercises</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mindspring-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Resources & Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Client Portal</h3>
                <p className="text-softwhite/70 text-sm mb-3">Access your session notes, homework, and progress tracking</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Mobile App</h3>
                <p className="text-softwhite/70 text-sm mb-3">Practice exercises and track progress on the go</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  Download App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="p-4 border border-graphite rounded-xl bg-slate">
                <h3 className="font-semibold text-softwhite mb-2">Resource Library</h3>
                <p className="text-softwhite/70 text-sm mb-3">Worksheets, guided meditations, and reading materials</p>
                <Button variant="outline" size="sm" className="w-full border-graphite text-softwhite hover:bg-charcoal hover:text-softwhite">
                  Browse Library
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mindspring-card p-8">
            <h2 className="text-2xl font-bold text-softwhite mb-6 tracking-tight">Support & Contact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-softwhite mb-4">Get Help</h3>
                <ul className="space-y-3 text-softwhite/80">
                  <li>
                    <strong>Email:</strong> info@mindspringpath.com.au
                  </li>
                  <li>
                    <strong>Phone:</strong> Available during business hours
                  </li>
                  <li>
                    <strong>Emergency:</strong> Call 000 or Lifeline 13 11 14
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-softwhite mb-4">Office Hours</h3>
                <ul className="space-y-2 text-softwhite/80">
                  <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                  <li><strong>Saturday:</strong> 10:00 AM - 2:00 PM</li>
                  <li><strong>Sunday:</strong> Closed</li>
                  <li><strong>After hours:</strong> Email support available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
