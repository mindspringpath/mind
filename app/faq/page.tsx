import Link from 'next/link'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight text-center">
            Frequently Asked Questions
          </h1>
          <div className="bg-slate border border-graphite rounded-xl p-8 text-center">
            <p className="text-lg text-softwhite/70 mb-6">
              FAQ section coming soon!
            </p>
            <p className="text-softwhite/60 mb-8">
              We're compiling answers to the most common questions about our evidence-based coaching programs, booking process, and what to expect from your sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <button className="btn-mindspring-primary">
                  About Us
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-mindspring-outline">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link 
              href="/home" 
              className="text-softwhite/60 hover:text-softwhite text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
