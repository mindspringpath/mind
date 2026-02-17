import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTopButton from '@/components/ScrollToTopButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MindSpring Path: Evidence-Based Coaching for Clarity & Focus',
  description: 'Transform your mental clarity and focus with evidence-based coaching programs designed for personal and professional growth.',
  keywords: 'evidence-based coaching, mental clarity, focus coaching, mindfulness coaching, ACT coaching, CBT coaching, Australia',
  authors: [{ name: 'MindSpring Path' }],
  icons: {
    icon: [{ url: '/logo-icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/logo-icon.svg'],
    apple: [{ url: '/logo-icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'MindSpring Path: Evidence-Based Coaching for Clarity & Focus',
    description: 'Evidence-based coaching to transform your mental clarity, focus, and purposeful action',
    type: 'website',
    locale: 'en_AU',
    url: 'https://mindspringpath.com.au',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  )
}
