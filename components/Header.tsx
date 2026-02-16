export default function Header() {
  return (
    <header className="bg-charcoal text-softwhite px-6 py-5 border-b border-graphite">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">MindSpring Path</h1>

        <div className="flex items-center gap-4">
          <button className="text-softwhite/80 hover:text-softwhite transition-colors">
            Login
          </button>

          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[color:#8B0000]"
          >
            Free Consultation
          </button>
        </div>
      </div>
    </header>
  )
}