import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProgramSection from '@/components/sections/ProgramSection'
import CTASection from '@/components/sections/CTASection'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-20">
      {/* What You'll Achieve Section - Moved to top */}
      <section className="py-20 bg-slate/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
              What You'll <span className="text-white">Achieve</span>
            </h2>
            <p className="text-lg md:text-xl text-softwhite/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Evidence-based coaching designed to help you cut through mental noise, build clarity, 
              and take confident action in moments that matter most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <button className="mindspring-button text-lg px-8 py-4">
                  Book a Session
                </button>
              </Link>
              <Link href="/program">
                <button className="mindspring-button-outline text-lg px-8 py-4">
                  View Program
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section - Renamed from Services */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
              What We <span className="text-primary">Offer</span>
            </h2>
          </div>
          <ServicesSection />
        </div>
      </section>

      {/* 12-Week Program Section */}
      <ProgramSection />
      <CTASection />

      {/* Admin Login Link */}
      <div className="mt-16 mb-8 text-center">
        <Link
          href="/admin/login"
          className="text-softwhite/40 text-sm hover:text-softwhite/70 transition"
        >
          Admin Login
        </Link>
      </div>
    </main>
  )
}