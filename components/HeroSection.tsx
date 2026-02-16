export default function HeroSection() {
  return (
    <section className="bg-charcoal text-white py-24 px-6 border-b border-graphite">
      <div className="max-w-6xl mx-auto">
        <p className="text-muted uppercase tracking-wide mb-4">
          Evidence-Based Coaching for Clarity & Focus
        </p>

        <h1 className="text-5xl font-bold leading-tight max-w-3xl">
          Unlock Your Focus. Strengthen Your Mind. Move Forward With Purpose.
        </h1>

        <p className="text-softwhite mt-6 max-w-2xl text-lg">
          Coaching designed to help you cut through mental noise, build clarity, 
          and take confident action in the moments that matter most.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <button className="
            bg-primary 
            hover:bg-[color:#8B0000]
            text-white 
            px-6 py-3 
            rounded-xl 
            font-semibold
            transition-all duration-300
          ">
            Book a Session
          </button>

          <button className="
            border border-primary 
            text-primary 
            hover:bg-primary/10
            px-6 py-3 
            rounded-xl 
            font-semibold
            transition-all duration-300
          ">
            Free 15-Minute Focus Call
          </button>

          <button className="
            text-softwhite 
            hover:text-white
            px-6 py-3 
            rounded-xl
            transition-colors
          ">
            View 12-Week Program
          </button>
        </div>

        <div className="flex gap-12 mt-16 text-muted">
          <div>
            <p className="text-3xl font-bold text-white">500+</p>
            <p>Professionals Coached</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">95%</p>
            <p>Success Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">12 Weeks</p>
            <p>To Transform</p>
          </div>
        </div>
      </div>
    </section>
  )
}