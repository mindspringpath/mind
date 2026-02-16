import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServicesSection from '@/components/sections/ServicesSection'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <Header />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}
