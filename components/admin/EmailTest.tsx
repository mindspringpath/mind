'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function EmailTest() {
  const [testEmail, setTestEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testHostingerEmail = async () => {
    if (!testEmail) {
      alert('Please enter a test email address')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/test-hostinger-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail })
      })

      const data = await response.json()
      setResult(data)

      if (data.ok) {
        console.log('Hostinger email test successful:', data.messageId)
      } else {
        console.error('Hostinger email test failed:', data.error)
      }
    } catch (error: any) {
      console.error('Email test error:', error)
      setResult({
        ok: false,
        error: 'Network error: ' + error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-charcoal p-6 rounded-xl border border-graphite">
      <h2 className="text-2xl font-bold text-softwhite mb-6 flex items-center">
        <Mail className="w-6 h-6 mr-2" />
        Hostinger Email Test
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-softwhite/80 mb-2">Test Email Address</label>
          <input
            type="email"
            placeholder="your-email@example.com"
            className="mindspring-input w-full"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={testHostingerEmail}
          disabled={loading || !testEmail}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            'Send Test Email'
          )}
        </Button>

        {result && (
          <div className={`p-4 rounded-lg border ${
            result.ok 
              ? 'bg-green-500/20 border-green-500/40 text-green-300' 
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center mb-2">
              {result.ok ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <XCircle className="w-5 h-5 mr-2" />
              )}
              <h3 className="font-semibold">
                {result.ok ? 'Test Successful' : 'Test Failed'}
              </h3>
            </div>
            
            {result.ok ? (
              <div className="space-y-2 text-sm">
                <p>✓ Email sent successfully</p>
                <p>✓ Message ID: {result.messageId}</p>
                <p>✓ SMTP Host: {result.details?.smtpHost}</p>
                <p>✓ SMTP Port: {result.details?.smtpPort}</p>
                <p>✓ From: {result.details?.fromEmail}</p>
                <p>✓ To: {result.details?.sentTo}</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>✗ Error: {result.error}</p>
                {result.details && <p>✗ Details: {result.details}</p>}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-softwhite/50 space-y-1">
          <p>• This tests your Hostinger SMTP configuration</p>
          <p>• Make sure your .env.local has the correct SMTP settings</p>
          <p>• For Hostinger: smtp.hostinger.com : 465</p>
          <p>• Use your full Hostinger email and password</p>
        </div>
      </div>
    </div>
  )
}
