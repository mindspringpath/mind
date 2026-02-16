export default function Footer() {
  return (
    <footer className="bg-charcoal text-softwhite/60 py-10 text-center border-t border-graphite">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MindSpring Path. All rights reserved.
      </p>
    </footer>
  )
}