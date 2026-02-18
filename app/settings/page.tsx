import Link from 'next/link'

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-charcoal text-softwhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-softwhite mb-6 tracking-tight">
            Settings
          </h1>
          <div className="bg-slate border border-graphite rounded-xl p-8">
            <p className="text-lg text-softwhite/70 mb-6">
              Settings panel coming soon!
            </p>
            <p className="text-softwhite/60 mb-8">
              We're developing a comprehensive settings area where you'll be able to manage your account preferences, notification settings, privacy controls, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="btn-mindspring-primary">
                  Dashboard
                </button>
              </Link>
              <Link href="/profile">
                <button className="btn-mindspring-outline">
                  Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6">
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
