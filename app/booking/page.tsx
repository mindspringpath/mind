import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/booking/BookingForm'

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-4 tracking-tight">
              Book Your Session
            </h1>
            <p className="text-lg md:text-xl text-softwhite/70">
              Schedule your evidence-based coaching session
            </p>
          </div>
          <BookingForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
