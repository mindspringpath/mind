import { redirect } from 'next/navigation'

export default function HomePage() {
  // Render a minimal shell so the layout + CSS load
  return (
    <main className="min-h-screen bg-background text-foreground">
      {redirect('/home')}
    </main>
  )
}