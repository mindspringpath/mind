'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signUp } from '@/lib/auth-helpers'

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    try {
      await signUp(formData.email, formData.password, formData.fullName)
      setSuccess(true)
    } catch (err: any) {
  setError(err.message || 'Signup failed. This email may already be registered.')
} finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (success) {
    return (
      <div className="text-center p-6">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-softwhite mb-2">
          Welcome to MindSpring Path!
        </h3>
        <p className="text-softwhite/70 mb-4">
          Your account has been created successfully. Check your email to verify your account.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-softwhite mb-8 tracking-tight">
          Create Your MindSpring Path Account
        </h2>
        <p className="text-softwhite/70">Start your transformation journey today</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-slate border border-graphite rounded-xl">
          <p className="text-softwhite/80 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-softwhite/80 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-softwhite/50 w-5 h-5" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mindspring-input pl-10 pr-4"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-softwhite/80 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-softwhite/50 w-5 h-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mindspring-input pl-10 pr-4"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-softwhite/80 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-softwhite/50 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="mindspring-input pl-10 pr-12"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-softwhite/50 hover:text-softwhite"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-softwhite/80 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-softwhite/50 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className="mindspring-input pl-10 pr-12"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-softwhite/50 hover:text-softwhite"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 border-graphite rounded accent-primary"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-softwhite/70">
            I agree to the{' '}
            <Link href="/legal/terms-of-service" className="text-softwhite hover:text-white">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy-policy" className="text-softwhite hover:text-white">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          variant="mindspring-primary"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-softwhite/70">
          Already have an account?{' '}
          <Link href="/login" className="text-softwhite hover:text-white font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}