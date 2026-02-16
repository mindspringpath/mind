import Link from 'next/link'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate/40 to-charcoal"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2.5 bg-slate/70 backdrop-blur-sm border border-graphite rounded-full text-sm font-semibold text-softwhite/90 mb-10 animate-fade-in">
            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
            Evidence-Based Coaching for Clarity & Focus
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-softwhite mb-6 animate-fade-in leading-tight tracking-tight">
            <span className="text-softwhite">Unlock Your Focus.</span>
            <br />
            <span className="text-softwhite">Strengthen Your Mind.</span>
            <br />
            <span className="text-softwhite">Move Forward With Purpose.</span>
          </h1>
          <p className="text-lg md:text-2xl text-softwhite/80 mb-10 max-w-4xl mx-auto animate-fade-in-up leading-relaxed">
            Evidence-based coaching designed to help you cut through mental noise, build clarity, and take confident action in the moments that matter most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up animation-delay-400">
            <Link href="/booking">
              <Button className="btn-mindspring-primary text-lg px-8 py-4">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/booking">
              <Button className="btn-mindspring-outline text-lg px-8 py-4">
                Free 15-Minute Focus Call
              </Button>
            </Link>
            <Link href="/program">
              <Button className="btn-mindspring-secondary text-lg px-8 py-4 group">
                <Play className="mr-2 h-5 w-5" />
                View 12-Week Program
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in animation-delay-600">
            <div className="mindspring-card-hover text-center p-6">
              <div className="text-4xl font-bold text-softwhite mb-2">500+</div>
              <div className="text-softwhite/70 font-medium">Professionals Coached</div>
            </div>
            <div className="mindspring-card-hover text-center p-6">
              <div className="text-4xl font-bold text-softwhite mb-2">95%</div>
              <div className="text-softwhite/70 font-medium">Success Rate</div>
            </div>
            <div className="mindspring-card-hover text-center p-6">
              <div className="text-4xl font-bold text-softwhite mb-2">12</div>
              <div className="text-softwhite/70 font-medium">Weeks to Transform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-12 border-2 border-softwhite/40 rounded-full flex justify-center">
          <div className="w-1 h-4 bg-primary rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
