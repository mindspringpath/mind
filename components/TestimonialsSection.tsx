export default function TestimonialsSection() {
  return (
    <section className="bg-slate text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Testimonials</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg border border-graphite">
            <p className="text-softwhite">
              “MindSpring Path helped me regain clarity and direction.”
            </p>
            <p className="text-muted mt-4">— Client Name</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-graphite">
            <p className="text-softwhite">
              “The most transformative coaching experience I’ve had.”
            </p>
            <p className="text-muted mt-4">— Client Name</p>
          </div>
        </div>
      </div>
    </section>
  )
}