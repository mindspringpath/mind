import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutSection from '@/components/sections/AboutSection'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
