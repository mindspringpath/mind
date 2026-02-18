import './globals.css'
import { Inter } from 'next/font/google'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'   // ⭐ ADD THIS
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
        <div className="min-h-screen bg-background flex flex-col">
          
          {/* ⭐ HEADER ADDED */}
          <Header />

          {/* Main content */}
          <main className="flex-1 pt-2 md:pt-3 lg:pt-4">
            {children}
          </main>

          <Footer />
          <ScrollToTopButton />
        </div>
      </body>
    </html>
  )
}
