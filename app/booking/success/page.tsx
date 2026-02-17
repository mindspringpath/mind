'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BookingSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="bg-slate/20 border border-graphite rounded-2xl p-10 max-w-lg w-full text-center shadow-xl">

        <h1 className="text-3xl font-bold text-softwhite mb-4">
          Your Session is Booked
        </h1>

        <p className="text-softwhite/80 text-lg mb-8 leading-relaxed">
          Thank you for booking with MindSpring Path.  
          A confirmation email has been sent to you.
        </p>

        <div className="space-y-4">
          <Link href="/appointments">
            <Button className="btn-mindspring-primary w-full py-3">
              View My Appointments
            </Button>
          </Link>

          <Link href="/home">
            <Button className="btn-mindspring-outline w-full py-3">
              Return to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}