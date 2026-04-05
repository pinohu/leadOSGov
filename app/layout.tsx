import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadOS Gov — Government Contract Intelligence',
  description: 'AI-powered government opportunity monitoring for federal contractors and vendors.',
  openGraph: {
    title: 'LeadOS Gov',
    description: 'Never miss a government contract opportunity.',
    url: 'https://sitbid.com',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  )
}
