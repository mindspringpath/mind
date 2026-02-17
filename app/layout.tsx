import './globals.css'
import { Inter } from 'next/font/google'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'
export const revalidate = 0

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