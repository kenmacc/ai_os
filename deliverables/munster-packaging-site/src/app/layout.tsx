import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Munster Packaging — Custom Packaging Solutions',
    template: '%s | Munster Packaging',
  },
  description: 'Munster Packaging — the one stop for all your packaging needs. Design and order custom boxes, partitions, foam fitments, pallet wrap and more.',
  metadataBase: new URL('https://munsterpkg.ie'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
