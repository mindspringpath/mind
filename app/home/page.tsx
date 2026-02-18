import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProgramSection from '@/components/sections/ProgramSection'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ProgramSection />

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
