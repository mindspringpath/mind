import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const benefits = [
    "Free 30-minute consultation",
    "Personalized focus assessment",
    "No obligation or commitment",
    "Immediate actionable insights"
  ]

  return (
    <section className="py-24 bg-slate">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Focus?
          </h2>
          <p className="text-lg md:text-xl text-softwhite/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards enhanced productivity and performance. 
            Schedule your free consultation today and discover what's possible.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-softwhite/90">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-softwhite/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/booking">
            <Button className="btn-mindspring-primary text-lg px-8 py-4 group">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-graphite">
            <p className="text-softwhite/60 text-sm">
              Join 500+ professionals who have already transformed their focus and productivity
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
