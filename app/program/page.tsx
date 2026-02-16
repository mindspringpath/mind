import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProgramSection from '@/components/sections/ProgramSection'

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <Header />
      <main>
        <ProgramSection />
      </main>
      <Footer />
    </div>
  )
}
