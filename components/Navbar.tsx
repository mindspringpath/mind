export function Navbar() {
  return (
    <nav className="bg-charcoal text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">MindSpring Path</h1>

        <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-md">
          Login
        </button>
      </div>
    </nav>
  )
}