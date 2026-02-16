import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          href="/home" 
          className="inline-flex items-center text-softwhite/70 hover:text-softwhite mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Auth Card */}
        <div className="mindspring-card p-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="text-xl font-bold text-softwhite tracking-tight">MindSpring Path</span>
          </div>

          {/* Form Content */}
          {children}
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6 text-sm text-softwhite/60">
          <p>
            By continuing, you agree to our{' '}
            <Link href="/legal/terms-of-service" className="text-softwhite hover:text-white transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy-policy" className="text-softwhite hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
