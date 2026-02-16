export default function ServicesSection() {
  return (
    <section className="bg-slate text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-graphite">
            <h3 className="text-xl font-semibold">1:1 Coaching</h3>
            <p className="text-muted mt-2">Deep clarity and accountability.</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-graphite">
            <h3 className="text-xl font-semibold">Focus Training</h3>
            <p className="text-muted mt-2">Tools to sharpen your mind.</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-graphite">
            <h3 className="text-xl font-semibold">12-Week Program</h3>
            <p className="text-muted mt-2">Transform your mental habits.</p>
          </div>
        </div>
      </div>
    </section>
  )
}